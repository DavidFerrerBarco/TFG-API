const requestSchema = require('../models/request');
const send = require('../utils/response');
const moment = require('moment');
const requestService = require('../services/requestService');
const employeeService = require('../services/employeeService');

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

async function getRequestsFromCompany(req, res){
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

    await requestService.getRequestsFromEmployeeList(dniList)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function getRequestByEmployee(req, res){
    const { employee } = req.params;

    await requestService.getRequestByEmployee(employee)
    .then((data) => send.response200(res, data))
    .catch((error) => send.response500(res, error));;
};

async function createRequest(req, res)
{
    let request
    try
    {
        request = requestSchema(req.body);
        request.date = moment().format('DD/MM/YYYY-HH:mm:ss').toString();
    }
    catch(error)
    {
        return send.response500(res, error);
    }

    await requestService.createOne(request)
        .then((data) => send.response201(res, data))
        .catch((error) => send.response500(res, error));
};

async function updateRequest(req, res)
{
    const { id } = req.params;
    const { body } = req;

    body.date = moment().format('DD/MM/YYYY-HH:mm:ss').toString();

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
    getRequestsFromCompany,
    getRequestByEmployee,
    createRequest,
    updateRequest,
    deleteRequest
}