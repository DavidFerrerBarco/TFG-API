const send = require('../utils/response');
const companyService = require('../services/companyService');

async function existingCompany(req, res, next)
{
    try
    {
       const { company } = req.body; 

       return await companyService.getCompanyByName(company) == null
            ? send.response400(res)
            : next();
    }
    catch(error)
    {
        send.response500(res, error)
    }
    
};

module.exports = {
    existingCompany
}