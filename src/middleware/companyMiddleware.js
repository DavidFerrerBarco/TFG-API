const send = require('../utils/response');
const companyService = require('../services/companyService');

async function existingCompany(req, res, next)
{
    try
    {
       const { name } = req.body; 

       return await companyService.getCompanyByName(name) == null
            ? next()
            : send.response400(res);
    }
    catch(error)
    {
        send.response500(res, error)
    }
    
};

module.exports = {
    existingCompany
}