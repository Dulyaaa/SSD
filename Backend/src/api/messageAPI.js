const express = require('express');
const router = express.Router();
const controller = require('../controller/messageController');

module.exports = function(){
    router.post('/create', controller.createMessage);

    return router;
}