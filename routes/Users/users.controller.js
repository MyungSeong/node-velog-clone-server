import express from 'express';

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
        res.status(400).send({
            status: 400,
            message: error.toString(),
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
        res.status(400).send({
            status: 400,
            message: error.toString(),
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
        res.status(400).send({
            status: 400,
            message: error.toString(),
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
        res.status(400).send({
            status: 400,
            message: error.toString(),
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
        res.status(400).send({
            status: 400,
            message: error.toString(),
        });
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const resultData = await UserService.loginUser(req.body);

        return res.status(200).send({
            result: resultData,
            message: 'Login Success',
        });
    } catch (error) {
        res.status(400).send({
            status: 400,
            message: error.toString(),
        });
    }
});

export default router;
