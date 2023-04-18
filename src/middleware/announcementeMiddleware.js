const send = require('../utils/response');
const companyService = require('../services/companyService');

async function existingCompany(req, res, next)
{
    try
    {
       const { company } = req.body; 

       return await companyService.getCompanyByName(company) == null
            ? send.response400(res, "La compañía no existe")
            : next();
    }
    catch(error)
    {
        return send.response500(res, error)
    }
    
};

module.exports = {
    existingCompany
}