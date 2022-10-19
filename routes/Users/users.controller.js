import express from 'express';

import redisClient from '../../db/RedisClient';
import JWTAuthorization from '../../utils/JSONWebTokenAuthorization';

import UserService from './users.service';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const resultData = await UserService.getUserList();

        return res.status(200).json({
            status: 200,
            result: resultData,
            message: 'Get User List Success',
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const resultData = await UserService.getUserDetail(req.params);

        return res.status(200).json({
            status: 200,
            result: resultData,
            message: 'Get User Detail Success',
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
});

router.post('/', async (req, res, next) => {
    try {
        const resultData = await UserService.insertUsers(req.body);

        return res.status(201).json({
            status: 201,
            result: resultData,
            message: 'User Insert Success',
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
});

router.put('/', async (req, res, next) => {
    try {
        const resultData = await UserService.updateUser(req.body);

        return res.status(201).json({
            status: 201,
            result: resultData,
            message: 'User Update Success',
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const resultData = await UserService.deleteUser(req.body);

        return res.status(200).json({
            status: 200,
            result: resultData,
            message: 'Delete User Success',
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const resultData = await UserService.loginUser(req.body);

        /* if (req.session.uid) {
            return res.status(200).json({
                status: 200,
                message: 'Already Logged in',
            });
        } else {
            req.session.uid = resultData.user_id;

            console.log(req.session.uid);
            console.log(resultData);
        } */

        const isLoggedIn = await redisClient.hGet(
            'velog:session',
            resultData.uuid,
        );

        if (isLoggedIn) throw new Error('Already logged in');

        const token = JWTAuthorization.createToken(
            {
                uuid: resultData.uuid,
                id: resultData.id,
            },
            '30min',
        );

        const success = await redisClient.hSet(
            'velog:session',
            resultData.uuid,
            token,
        );

        if (success) {
            redisClient.expireAt(
                'velog:session',
                parseInt(+new Date() / 1000) + 30 * 60,
            );
        }

        return res.status(200).json({
            status: 200,
            result: resultData,
            message: 'Login Success',
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
});

router.delete('/logout', async (req, res, next) => {
    try {
        const resultData = await UserService.logoutUser(req.body);

        // req.session.destroy();
        const success = await redisClient.hDel(
            'velog:session',
            resultData.uuid,
        );

        if (!success) throw new Error('세션 데이터가 존재하지 않습니다');

        return res.status(200).json({
            status: 200,
            message: 'Logout Success',
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        });
    }
});

export default router;
