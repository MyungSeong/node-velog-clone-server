module.exports = {
    insertUsers: (userInfo) => {
        const { username, password } = userInfo;

        return `
            INSERT INTO users
            (
                username,
                password
            )
            VALUES
            (
                '${username}',
                '${password}'
            );
        `;
    },
    getUserList: () => {
        return `
            SELECT 
                   * 
            FROM
                 users;
        `;
    },
    getUserDetail: (userInfo) => {
        const { username } = userInfo;

        return `
            SELECT 
                    *
            FROM
                    users
            WHERE
                    username = '${username}';
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
