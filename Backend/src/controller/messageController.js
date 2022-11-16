const Message = require('../model/message.model');


const createMessage = async(req,res) => {
    if(req.body){
        const message = new Message(req.body);
        await message.save()
        .then(data => {
            res.status(200).send({data:data});
        })
        .catch(error => {
            res.status(500).send({error:error.message});
        });
    }
}

module.exports = {
    createMessage,
};