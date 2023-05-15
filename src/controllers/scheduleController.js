const scheduleSchema = require('../models/schedule');
const send = require('../utils/response');
const scheduleService = require('../services/scheduleService');
const employeeService = require('../services/employeeService');

async function getSchedules(req, res)
{
    await scheduleService.getAll()
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function getOneSchedule(req, res)
{
    const { id } = req.params;
    await scheduleService.getOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
};

async function getScheduleFromEmployee(req, res)
{
    const { employee } = req.params;
    const dniEmployee = await employeeService.getOne(employee)
    const { DNI } = dniEmployee
    await scheduleService.getScheduleFromEmployee(DNI)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
};

async function createSchedule(req, res)
{
    let schedule
    try
    {
        schedule = scheduleSchema(req.body);
    }
    catch(error)
    {
        send.response500(res, error);
    }

    await scheduleService.createOne(schedule)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function updateSchedule(req, res)
{
    const { id } = req.params;
    const { body } = req;

    await scheduleService.updateOne(id, body)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function deleteSchedule(req, res)
{
    const { id } = req.params;
    
    await scheduleService.deleteOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
}

module.exports = {
    getSchedules,
    getOneSchedule,
    getScheduleFromEmployee,
    createSchedule,
    updateSchedule,
    deleteSchedule
};