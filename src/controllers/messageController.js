const messageSchema = require('../models/message');
const send = require('../utils/response');
const moment = require('moment');
const messageService = require('../services/messageService');
const employeeService = require('../services/employeeService');

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
    const { sender, receiver } = req.params;

    const employeeSender = await employeeService.getOne(sender);
    const employeeReceiver = await employeeService.getOne(receiver);

    const senderDNI = employeeSender.DNI;
    const receiverDNI = employeeReceiver.DNI;

    await messageService.getConversation(senderDNI, receiverDNI)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
};

async function createMessage(req, res)
{
    let message
    try
    {
        message = messageSchema(req.body);
        message.date = moment().format('DD/MM/YYYY-HH:mm:ss').toString();
    }
    catch(error)
    {
        return send.response500(res, error);
    }

    await messageService.createOne(message)
        .then((data) => send.response201(res, data))
        .catch((error) => send.response500(res, error));
};

async function updateMessage(req, res)
{
    const { id } = req.params;
    const { body } = req;

    body.date = moment().format('DD/MM/YYYY-HH:mm:ss').toString();

    await messageService.updateOne(id, body)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function deleteMessage(req, res)
{
    const { id } = req.params;

    await messageService.deleteOne(id)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
}

module.exports = {
    getMessages,
    getOneMessage,
    getConversation,
    createMessage,
    updateMessage,
    deleteMessage
};

