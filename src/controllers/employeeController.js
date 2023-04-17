const employeeSchema = require('../models/employee.js');
const send = require('../utils/response');
const employeeService = require('../services/employeeService');
const companyService = require('../services/companyService.js');

async function getEmployees(req, res)
{
    await employeeService.getAll()
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error))
};

async function getOneEmployee(req, res)
{
    const { id } = req.params;
    await employeeService.getOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
};

async function getEmployeesByCompany(req, res)
{
    const { id } = req.params;
    let name 
    await companyService.getOne(id)
        .then((data) => {
            name = data.name

            employeeService.getEmployeesByCompany(name)
                .then((data) => send.response200(res, data))
                .catch((error) => send.response500(res, error));

        })
        .catch(() => send.response404(res))
};

async function createEmployee(req, res)
{
    let employee
    try
    {
        employee = employeeSchema(req.body);
    }
    catch(error)
    {
        send.response500(res, error);
    }

    await employeeService.createOne(employee)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function updateEmployee(req, res)
{
    const { id } = req.params;
    const { body } = req;

    await employeeService.updateOne(id, body)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function deleteEmployee(req, res)
{
    const { id } = req.params;

    await employeeService.deleteOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
};


module.exports = {
    getEmployees,
    getOneEmployee,
    getEmployeesByCompany,
    createEmployee,
    updateEmployee,
    deleteEmployee
};