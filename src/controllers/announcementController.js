const announcementSchema = require('../models/announcement');
const send = require('../utils/response');
const moment = require('moment')
const announcementService = require('../services/announcementService');

async function getAnnouncements(req, res)
{
    await announcementService.getAll()
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function getOneAnnouncement(req, res)
{
    const { id } = req.params;
    await announcementService.getOne(id)
        .then((data) => {
            if(data == null)
                send.response404(res)
            else
                send.response200(res, data)
        })
        .catch((error) => send.response500(res, error));
};

async function createAnnouncement(req, res)
{
    let announcement
    try
    {
        announcement = announcementSchema(req.body);
        announcement.date = moment().format('DD/MM/YYYY-HH:mm:ss').toString()
    }
    catch(error)
    {
        send.response500(res, error);
    }
    
    await announcementService.createOne(announcement)
        .then((data) => send.response201(res, data))
        .catch((error) => send.response500(res, error));
};

async function updateAnnouncement(req, res)
{
    const { id } = req.params;
    const { body } = req;

    body.date = moment().format('DD/MM/YYYY-HH:mm:ss').toString()
    
    await announcementService.updateOne(id, body)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function deleteAnnouncement(req, res)
{
    const { id } = req.params;
    
    await announcementService.deleteOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
};

module.exports = {
    getAnnouncements,
    getOneAnnouncement,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
};