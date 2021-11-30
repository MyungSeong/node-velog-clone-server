import express from 'express';

import logger from '../../config/Logger';
import redisClient from '../../db/RedisClient';

import UserService from './users.service';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const resultData = await UserService.getUserList();

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'Get User List Success',
        });
    } catch (error) {
        logger.error(error.message);

        res.status(400).send({
            status: 400,
            message: error.message,
        });
    }
});

router.get('/:username', async (req, res, next) => {
    try {
        const resultData = await UserService.getUserDetail(req.params);

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'Get User Deatil Success',
        });
    } catch (error) {
        logger.error(error.message);

        res.status(400).send({
            status: 400,
            message: error.message,
        });
    }
});

router.post('/', async (req, res, next) => {
    try {
        const resultData = await UserService.insertUsers(req.body);

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'User Insert Success',
        });
    } catch (error) {
        logger.error(error.message);

        res.status(400).send({
            status: 400,
            message: error.message,
        });
    }
});

router.put('/', async (req, res, next) => {
    try {
        const resultData = await UserService.updateUser(req.body);

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'User Update Success',
        });
    } catch (error) {
        logger.error(error.message);

        res.status(400).send({
            status: 400,
            message: error.message,
        });
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const resultData = await UserService.deleteUser(req.body);

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'Delete User Success',
        });
    } catch (error) {
        logger.error(error.message);

        res.status(400).send({
            status: 400,
            message: error.message,
        });
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const resultData = await UserService.loginUser(req.body);

        if (req.session.uuid) {
            return res.status(200).send({
                status: 200,
                message: 'Already Logged in',
            });
        } else {
            req.session.uuid = resultData.user_id;
        }

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

        logger.info(`POST /login @req: ${JSON.stringify(req.headers)}`);

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'Login Success',
        });
    } catch (error) {
        logger.error(error.message);

        res.status(400).send({
            status: 400,
            message: error.message,
        });
    }
});

router.post('/logout', async (req, res, next) => {
    try {
        req.session.destroy();

        return res.status(200).send({
            message: 'Logout Success',
        });
    } catch (error) {
        logger.error(error.message);

        res.status(400).send({
            status: 400,
            message: error.message,
        });
    }
});

export default router;
