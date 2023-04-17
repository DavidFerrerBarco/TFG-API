const requestSchema = require('../models/request');
const send = require('../utils/response');
const requestService = require('../services/requestService');

async function getRequests(req, res)
{
    await requestService.getAll()
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function getOneRequest(req, res)
{
    const { id } = req.params;
    await requestService.getOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
};

async function createRequest(req, res)
{
    let request
    try
    {
        request = requestSchema(req.body);
    }
    catch(error)
    {
        send.response500(res, error);
    }

    await requestService.createOne(request)
        .then((data) => send.response201(res, data))
        .catch((error) => send.response500(res, error));
};

async function updateRequest(req, res)
{
    const { id } = req.params;
    const { body } = req;

    await requestService.updateOne(id, body)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function deleteRequest(req, res)
{
    const { id } = req.params;

    await requestService.deleteOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
}

module.exports = {
    getRequests,
    getOneRequest,
    createRequest,
    updateRequest,
    deleteRequest
}