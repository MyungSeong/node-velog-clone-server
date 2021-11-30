import { v4 } from 'uuid';
import { hashSync, compareSync } from 'bcrypt';

import pool from '../../config/DatabaseConfig';
import UsersQuery from './users.query';

export default {
    insertUsers: async (userInfo) => {
        const con = await pool.getConnection();

        const { userName, desc, id, password } = userInfo;

        const query = UsersQuery.insertUsers([
            v4(),
            userName,
            desc,
            id,
            hashSync(password, 10),
        ]);

        const [{ affectedRows: result }] = await con.query(query);

        if (!result) throw new Error('이미 존재하는 데이터입니다.');

        con.release();

        return result;
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

        return result;
    },
    updateUser: async (userInfo) => {
        const con = await pool.getConnection();
        const query = UsersQuery.updateUser(userInfo);

        const [{ affectedRows: result }] = await con.query(query);

        if (!result) throw new Error('이미 존재하는 데이터입니다.');

        con.release();

        return result;
    },
    deleteUser: async (userInfo) => {
        const con = await pool.getConnection();
        const query = UsersQuery.deleteUser(userInfo);

        const [{ affectedRows: result }] = await con.query(query);

        if (!result) throw new Error('이미 존재하는 데이터입니다.');

        con.release();

        return result;
    },
    loginUser: async (userInfo) => {
        const con = await pool.getConnection();
        const query = UsersQuery.getUserDetail(userInfo);

        const [[result]] = await con.query(query);

        const match = compareSync(userInfo.password, result.user_login_pw);

        con.release();

        if (!result?.user_id) throw new Error('유저 정보를 찾을 수 없습니다');

        if (match) {
            return result;
        } else {
            throw new Error('아이디 혹은 비밀번호를 확인해주세요');
        }
    },
    logoutUser: () => {},
};
