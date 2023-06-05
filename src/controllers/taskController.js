const taskSchema = require('../models/task');
const send = require('../utils/response');
const moment = require('moment');
const taskService = require('../services/taskService');
const employeeService = require('../services/employeeService');

async function getTasks(req, res)
{
    await taskService.getAll()
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function getOneTask(req, res)
{
    const { id } = req.params;

    await taskService.getOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
};

async function getTasksFromEmployee(req, res)
{
    const { employee } = req.params;
    const dniEmployee = await employeeService.getOne(employee)
    if(dniEmployee == null) send.response400(res, "No existe el id");
    else
    {
        const { DNI } = dniEmployee

        await taskService.getTasksFromEmployee(DNI)
            .then((data) => send.response200(res, data))
            .catch(() => send.response404(res));
    }
};

async function getTasksFromCompany(req, res){
    let { company } = req.params;
    company = company.replaceAll('-', ' ');

    let listEmployees;

    await employeeService.getEmployeesByCompany(company)
        .then((data) => {
            listEmployees = data
        })
        .catch((error) => send.response500(res, error));
    
    let dniList = [];

    listEmployees.forEach(employee => {
        dniList.push(employee.DNI);
    });

    await taskService.getTasksFromEmployeeList(dniList)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function createTask(req, res)
{
    let task
    try
    {
        task = taskSchema(req.body);
        task.date = moment().format('DD/MM/YYYY-HH:mm:ss').toString();
    }
    catch(error)
    {
        send.response500(res, error);
    }

    await taskService.createOne(task)
        .then((data) => send.response201(res, data))
        .catch((error) => send.response500(res, error));
};

async function updateTask(req, res)
{
    const { id } = req.params;
    const { body } = req;

    body.date = moment().format('DD/MM/YYYY-HH:mm:ss').toString();

    await taskService.updateOne(id, body)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function deleteTask(req, res)
{
    const { id } = req.params;

    await taskService.deleteOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
};

module.exports = {
    getTasks,
    getOneTask,
    getTasksFromEmployee,
    getTasksFromCompany,
    createTask,
    updateTask,
    deleteTask
}