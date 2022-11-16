const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: { type:String, required:true}
});

const Message = mongoose.model('messages', MessageSchema);

module.exports = Message;