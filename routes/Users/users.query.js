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
        const { id } = userInfo;

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
        const { id, username, password } = userInfo;

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
        const { username } = userInfo;

        return `
            DELETE 
            FROM users
            WHERE
                username = '${username}';
        `;
    },
};
