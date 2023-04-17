const messageSchema = require('../models/message');
const send = require('../utils/response');
const messageService = require('../services/messageService');

async function getMessages(req, res)
{
    await messageService.getAll()
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function getOneMessage(req, res)
{
    const { id } = req.params;
    await messageService.getOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
};

async function getConversation(req, res)
{
    const { sender } = req.params.sender;
    const { receiver } = req.params.receiver;

    await messageService.getConversation(sender, receiver)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
};

async function createMessage(req, res)
{
    let message
    try
    {
        message = messageSchema(req.body);
    }
    catch(error)
    {
        send.response500(res, error);
    }

    await messageService.createOne(message)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function updateMessage(req, res)
{
    const { id } = req.params;
    const { body } = req;

    await messageService.updateOne(id, body)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function deleteMessage(req, res)
{
    const { id } = req.params;

    await messageService.deleteOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
}

module.exports = {
    getMessages,
    getOneMessage,
    getConversation,
    createMessage,
    updateMessage,
    deleteMessage
};

