export default {
    insertUsers: (userInfo) => {
        console.log('🚀 ~ file: users.query.js ~ line 6 ~ userInfo', userInfo);

        return `
            INSERT INTO t_user
            (
                user_id,
                user_nm,
                user_desc,
                user_login_id,
                user_login_pw,
                created_at,
                modified_at
            )
            VALUES
            (
                ?,
                ?,
                ?,
                ?,
                ?,
                UNIX_TIMESTAMP(),
                UNIX_TIMESTAMP()
            );
        `;
    },
    getUserList: () => {
        return `
            SELECT 
                   * 
            FROM
                 t_user;
        `;
    },
    getUserDetail: (userInfo) => {
        console.log('🚀 ~ file: users.query.js ~ line 41 ~ userInfo', userInfo);
        const { id } = userInfo;
        console.log('🚀 ~ file: users.query.js ~ line 43 ~ userInfo', userInfo);

        return `
            SELECT 
                    *
            FROM
                    t_user
            WHERE
                    user_login_id = '${id}';
        `;
    },
    updateUser: (userInfo) => {
        console.log('🚀 ~ file: users.query.js ~ line 55 ~ userInfo', userInfo);
        const { id, username, password } = userInfo;
        console.log('🚀 ~ file: users.query.js ~ line 57 ~ userInfo', userInfo);

        return `
            UPDATE users
            SET
                username = '${username}',
                password = '${password}'
            WHERE
                id = '${id}';
        `;
    },
    deleteUser: (userInfo) => {
        console.log('🚀 ~ file: users.query.js ~ line 69 ~ userInfo', userInfo);
        const { username } = userInfo;
        console.log('🚀 ~ file: users.query.js ~ line 71 ~ userInfo', userInfo);

        return `
            DELETE 
            FROM users
            WHERE
                username = '${username}';
        `;
    },
};
