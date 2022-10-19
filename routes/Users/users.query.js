export default {
    insertUsers: (userInfo) => {
        const [uuid, userName, desc, id, password] = userInfo;

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
                '${uuid}',
                '${userName}',
                '${desc}',
                '${id}',
                '${password}',
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
        const { id, username } = userInfo;

        return `
            SELECT 
                    *
            FROM
                    t_user
            WHERE
                    user_login_id = '${id}' OR
                    user_nm = '${username}';
        `;
    },
    updateUser: (userInfo) => {
        const { username, desc, password } = userInfo;

        return `
            UPDATE t_users
            SET
                user_nm = '${username}',
                user_desc = '${desc}',
                password = '${password}'
            WHERE
                user_nm = '${username}';
        `;
    },
    deleteUser: (userInfo) => {
        const { username } = userInfo;

        return `
            DELETE 
            FROM t_users
            WHERE
                user_nm = '${username}';
        `;
    },
};
