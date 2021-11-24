var express = require('express');
var router = express.Router();
const UserService = require('./users.service');

router.get('/', async function (req, res, next) {
    try {
        const resultData = await UserService.getUserList();

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'Get User List Success'
        });
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err
        });
    }
});

router.get('/:username', async function (req, res, next) {
    try {
        const resultData = await UserService.getUserDetail(req.params);

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'Get User Deatil Success'
        });
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err
        });
    }
});

router.post('/', async function (req, res, next) {
    try {
        const resultData = await UserService.insertUsers(req.body);

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'User Insert Success'
        });
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err
        });
    }
});

router.put('/', async function (req, res, next) {
    try {
        const resultData = await UserService.updateUser(req.body);

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'User Update Success'
        });
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err
        });
    }
});

router.delete('/', async function (req, res, next) {
    try {
        const resultData = await UserService.deleteUser(req.body);

        return res.status(200).send({
            status: 200,
            result: resultData,
            message: 'Delete User Success'
        });
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err
        });
    }
});

module.exports = router;
