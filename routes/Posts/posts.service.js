import pool from '../../config/DatabaseConfig';

import PostsQuery from './posts.query';

export default {
    insertPosts: async (postInfo) => {
        const con = await pool.getConnection();

        const { id, userId, title, content, thumbnail } = postInfo;

        const query = PostsQuery.insertPosts([
            id,
            userId,
            title,
            content,
            thumbnail,
        ]);

        const [{ affectedRows: result }] = await con.query(query);

        if (!result) throw new Error('이미 존재하는 데이터입니다.');

        con.release();

        return result;
    },
};
