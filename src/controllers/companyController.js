const companySchema = require('../models/company');
const send = require('../utils/response');
const companyService = require('../services/companyService');

async function getCompanies(req, res)
{
    await companyService.getAll()
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function getOneCompany(req, res)
{
    const { id } = req.params;
    await companyService.getOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
};

async function createCompany(req, res)
{
    let company
    try
    {
       company = companySchema(req.body);
    }
    catch(error)
    {
        send.response500(res, error);
    }

    await companyService.createOne(company)
        .then((data) => send.response201(res, data))
        .catch((error) => send.response500(res, error));
};

async function updateCompany(req, res)
{
    const { id } = req.params;
    const { body } = req;

    await companyService.updateOne(id, body)
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function deleteCompany(req, res)
{
    const { id } = req.params;

    await companyService.deleteOne(id)
        .then((data) => send.response200(res, data))
        .catch(() => send.response404(res));
}

module.exports = {
    getCompanies,
    getOneCompany,
    createCompany,
    updateCompany,
    deleteCompany
};