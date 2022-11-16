const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

module.exports = function () {
    router.post('/createUser', userController.createUser);
    router.get('/user/:email', userController.getUserByEmail);
    router.get('/', userController.getAll);
    router.post('/update/:userId', userController.updateUser);

    return router;
}