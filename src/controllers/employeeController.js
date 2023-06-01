const employeeSchema = require('../models/employee.js');
const send = require('../utils/response');
const employeeService = require('../services/employeeService');
const companyService = require('../services/companyService.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    let { company } = req.params;
    company = company.replaceAll('-', ' ');
    employeeService.getEmployeesByCompany(company)
        .then((data) => {
            if(data.length == 0)
            {
                send.response404(res);
            }
            else
            {
                send.response200(res, data);
            }
            
        })
        .catch((error) => send.response500(res, error));

};

async function createEmployee(req, res)
{
    let employee
    try
    {
        employee = employeeSchema(req.body);
        employee.password = bcrypt.hashSync(employee.password, Number(process.env.SALT));
        employee.email = employee.name.replace( /\s/g, '').toLowerCase() + "@" + employee.company.replace( /\s/g, '').toLowerCase() + ".net";
    }
    catch(error)
    {
        return send.response500(res, error);
    }

    await employeeService.createOne(employee)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function loginEmployee(req, res)
{
    const { DNI } = req.body;

    const token = jwt.sign({ user: DNI }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN});
    let employee;
    await employeeService.getEmployeeByDNI(DNI)
        .then((data) => employee = data);

    return send.response200(res, {
        "_id": employee._id,
        "name": employee.name,
        "DNI": employee.DNI,
        "password": employee.password,
        "company": employee.company,
        "contract": employee.contract,
        "admin": employee.admin,
        "image": employee.image,
        "email": employee.email,
        "__v": employee.__v,
        "token": token
    });

};

async function updateEmployee(req, res)
{
    const { id } = req.params;
    const { body } = req;

    if(body.password)
        body.password = bcrypt.hashSync(body.password, Number(process.env.SALT));

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
    loginEmployee,
    updateEmployee,
    deleteEmployee
};