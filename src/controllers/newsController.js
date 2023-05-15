const newsSchema = require('../models/news');
const send = require('../utils/response');
const moment = require('moment');
const newsService = require('../services/newsService');

async function getNews(req, res)
{
    await newsService.getAll()
        .then((data) =>  send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function getOneNew(req, res)
{
    const { id } = req.params;
    await newsService.getOne(id)
        .then((data) => {
            if(data == null)
                send.response404(res)
            else
                send.response200(res, data)
        })
        .catch((error) => send.response500(res, error));
};

async function createNews(req, res)
{
    let news
    try
    {
        news = newsSchema(req.body);
        news.date = moment().format('DD/MM/YYYY-HH:mm:ss').toString()
    }
    catch(error)
    {
        return send.response500(res, error);
    }

    await newsService.createOne(news)
        .then((data) => send.response201(res, data))
        .catch((error) => send.response500(res, error));
};

async function updateNews(req, res)
{
    const { id } = req.params;
    const { body } = req;

    body.date = moment().format('DD/MM/YYYY-HH:mm:ss').toString()

    await newsService.updateOne(id, body)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function deleteNews(req, res)
{
    const { id } = req.params;

    await newsService.deleteOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
};

module.exports = {
    getNews,
    getOneNew,
    createNews,
    updateNews,
    deleteNews
};