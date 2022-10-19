export default {
    insertPosts: (postInfo) => {
        const [id, userId, title, content, thumbnail] = postInfo;

        return `
            INSERT INTO t_board
            (
                board_id,
                user_id,
                board_title,
                board_content,
                board_thumbnail,
                created_at,
                modified_at
            )
            VALUES
            (
                '${id}',
                '${userId}',
                '${title}',
                '${content}',
                '${thumbnail}',
                UNIX_TIMESTAMP(),
                UNIX_TIMESTAMP()
            );
        `;
    },
    getPostList: () => {
        return `
            SELECT 
                   * 
            FROM
                 t_board;
        `;
    },
    getPostDetail: (postInfo) => {
        const { id } = postInfo;

        return `
            SELECT 
                    *
            FROM
                    t_user
            WHERE
                    board_id = '${id}';
        `;
    },
    updatePost: (postInfo) => {
        const { id, userId, title, content, thumbnail } = postInfo;

        /* switch (postInfo) {
            case 'id':
                return;

            default:
                return;
        } */

        return `
            UPDATE t_board
            SET
                board_title = '${title}',
                board_content = '${content}'
                board_thumbnail = '${thumbnail}'
            WHERE
                board_id = '${id}';
        `;
    },
    deletePost: (postInfo) => {
        const { id } = postInfo;

        return `
            DELETE 
            FROM t_board
            WHERE
                board_id = '${id}';
        `;
    },
};
