const send = require('../utils/response');
const companyService = require('../services/companyService');

async function existingCompany(req, res, next)
{
    try
    {
       const { name } = req.body; 

       return await companyService.getCompanyByName(name) == null
            ? next()
            : send.response400(res, "La empresa ya existe");
    }
    catch(error)
    {
        return send.response500(res, error)
    }
    
};

async function notExistingCompany(req, res, next)
{
    try{
        const { name } = req.body;
        const { id } = req.params;
        const company = await companyService.getOne(id);
        if(company == null)
        {
            return send.response400(res, "no existe la id");

        }else{
            const anotherCompany = await companyService.getCompanyByName(name)
            if(anotherCompany == null || (anotherCompany != null  && company.name == anotherCompany.name))
            {
                return next();
            }
            else
            {
                return send.response400(res, "no se pudo cambiar el nombre de la empresa");
            }
        }
    }
    catch(error){
        return send.response500(res, error);
    }
}

module.exports = {
    existingCompany,
    notExistingCompany,
}