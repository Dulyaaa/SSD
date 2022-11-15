const express = require('express');
const router = express.Router();
const controller = require('./messageController');

module.exports = function(){
    router.post('/create', controller.createMessage);

    return router;
}