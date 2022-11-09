import express from 'express';

import logger from '../../config/Logger';
import redisClient from '../../db/RedisClient';

import PostService from './posts.service';

const router = express.Router();

router.post('/create-post', async (req, res, next) => {
    try {
        const resultData = await PostService.insertPosts(req.body);
        /* 
        if (req.session.uid) {
            return res.status(200).send({
                status: 200,
                message: 'Already Logged in',
            });
        } else {
            req.session.uid = resultData.user_id;
        } */

        /*await redisClient.get(`sess:${resultData.user_id}`, (err, data) => {
            if (err) throw new Error(err.message);

            if (data) {
                return res.status(200).send({
                    status: 200,
                    message: 'Already Logged in',
                });
            }
        });*/

        /*await redisClient.hSet(
            'velog:session',
            resultData.user_id,
            resultData.user_login_id,
        );*/

        logger.info(`POST /insertpost @req: ${JSON.stringify(req.headers)}`);

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'Insert Post Success',
        });
    } catch (error) {
        logger.error(error.message);

        return res.status(400).send({
            status: 400,
            message: error.message,
        });
    }
});

router.get('/', async (req, res, next) => {
    try {
        const resultData = await PostService.getPosts();

        logger.info(`GET / @req: ${JSON.stringify(req.headers)}`);

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'Get Post List Success',
        });
    } catch (error) {
        logger.error(error.message);

        return res.status(400).send({
            status: 400,
            message: error.message,
        });
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const resultData = await PostService.getPosts();

        logger.info(`GET /:id @req: ${JSON.stringify(req.headers)}`);

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'Get Post Detail Success',
        });
    } catch (error) {
        logger.error(error.message);

        return res.status(400).send({
            status: 400,
            message: error.message,
        });
    }
});

router.put('/:id', async (req, res, next) => {
    try {
    } catch (error) {}
});

export default router;
