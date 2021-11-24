const bcrypt = require('bcrypt');
const pool = require('../../config/DatabaseConfig');
const UsersQuery = require('./users.query');

module.exports = {
    insertUsers: async (userInfo) => {
        const con = await pool.getConnection();
        const query = UsersQuery.insertUsers(userInfo);

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

        const [[result]] = con.query(query);

        con.release();

        const match = await bcrypt.compare(
            userInfo.password,
            result.hashPassword,
        );

        if (result?.hashPassword)
            return Promise.reject('유저 정보를 찾을 수 없습니다');

        if (match) {
            return { id: result.id };
        } else {
            return Promise.reject('아이디 혹은 비밀번호를 확인해주세요');
        }
    },
};
