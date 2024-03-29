import { v4 } from 'uuid';
import { hashSync } from 'bcrypt';

import pool from '../../config/DatabaseConfig';

import UsersQuery from './users.query';

export default {
    insertUsers: async (userInfo) => {
        const con = await pool.getConnection();

        try {
            const { userName, desc, id, password } = userInfo;

            const query = UsersQuery.insertUsers([
                v4(),
                userName,
                desc,
                id,
                hashSync(password, 10),
            ]);

            const [{ affectedRows: result }] = await con.query(query);

            return result;
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('이미 존재하는 데이터입니다');
            } else {
                throw error;
            }
        } finally {
            con.release();
        }
    },
    getUserList: async () => {
        const con = await pool.getConnection();
        const query = UsersQuery.getUserList();

        const [result] = await con.query(query);

        con.release();

        return result;
    },
    getUserDetail: async (userInfo) => {
        const con = await pool.getConnection();
        const query = UsersQuery.getUserDetail(userInfo);

        const [[result]] = await con.query(query);

        con.release();

        return {
            uuid: result.user_id,
            id: result.user_login_id,
            name: result.user_nm,
            desc: result.user_desc,
            createdAt: result.created_at,
            modifiedAt: result.modified_at,
        };
    },
    updateUser: async (userInfo) => {
        const con = await pool.getConnection();
        const query = UsersQuery.updateUser(userInfo);

        const [{ affectedRows: result }] = await con.query(query);

        if (!result) throw new Error('이미 존재하는 데이터입니다');

        con.release();

        return result;
    },
    deleteUser: async (userInfo) => {
        const con = await pool.getConnection();
        const query = UsersQuery.deleteUser(userInfo);

        const [{ affectedRows: result }] = await con.query(query);

        if (!result) throw new Error('이미 존재하는 데이터입니다');

        con.release();

        return result;
    },
    loginUser: async (userInfo) => {
        const con = await pool.getConnection();

        try {
            const query = UsersQuery.getUserDetail(userInfo);

            const [[result]] = await con.query(query);

            return {
                uuid: result.user_id,
                id: result.user_login_id,
                password: result.user_login_pw,
            };
        } catch (error) {
            if (error.message.includes('undefined')) {
                throw new Error('유저 정보를 찾을 수 없습니다');
            } else {
                throw error;
            }
        } finally {
            con.release();
        }
    },
    logoutUser: async (userInfo) => {
        const con = await pool.getConnection();

        try {
            const query = UsersQuery.getUserDetail(userInfo);

            const [[result]] = await con.query(query);

            return {
                uuid: result.user_id,
                id: result.user_login_id,
            };
        } catch (error) {
            throw error;
        } finally {
            con.release();
        }
    },
};
