const send = require('../utils/response');
const companyService = require('../services/companyService');
const employeeService = require('../services/employeeService');
const bcrypt = require('bcrypt');

async function existDNI(req, res, next)
{
    try
    {
        const { DNI } = req.body;

        const employeeExist = await employeeService.getEmployeeByDNI(DNI)
        
        if(employeeExist != null)
            return send.response400(res, "El empleado ya existe");

        next();
    }
    catch(error)
    {
        return send.response500(res, error);
    }
}

async function loginValidUser(req, res, next)
{
    try
    {
        const { DNI, password } = req.body;

        const employeeExist = await employeeService.getEmployeeByDNI(DNI)
        
        if(employeeExist == null)
            return send.response400(res, "El empleado no existe");

        const passwordHashed = employeeExist.password;
        
        if(!bcrypt.compareSync(password,passwordHashed))
            return send.response400(res, "Contraseña incorrecta");

        next();
    }
    catch(error)
    {
        return send.response500(res, error);
    }
};

async function isAdmin(req, res, next){
    try
    {
        const { DNI } = req.body;

        const employee = await employeeService.getEmployeeByDNI(DNI)
        if(employee.admin)
        {
            next();
        }
        else
        {
            return send.response400(res, "No es admin");
        }
    }catch(error)
    {
        return send.response500(res, error);
    }
};

async function validCompany(req, res, next)
{
    try
    {
        const { company, contract } = req.body;

        const existCompany = await companyService.getCompanyByName(company)

        if(existCompany == null)
            return send.response400(res, "La empresa no existe")

        const { contractTypes } = existCompany
                
        if(contract == null || contractTypes.indexOf(contract) == -1) 
            return send.response400(res, "No se ha definido un contrato admisible")

        next();
    }
    catch(error)
    {
        return send.response500(res, error);
    }
}

async function validDNI(req, res, next)
{
    const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

    try
    {
        const { DNI } = req.body;

        if(DNI.length != 9)
            return send.response400(res, "DNI fuera del tamaño establecido");
        
        const numbersDNI = DNI.substring(0, 8);
        const letterDNI = DNI.substring(DNI.length - 1, DNI.length);

        const mod = numbersDNI % 23;
        
        if(letras[mod] != letterDNI)
            return send.response400(res, "DNI no válido");
        
        next();
    }
    catch(error)
    {
        return send.response500(res, error);
    }
}

async function containsDNI(req, res, next){
    const { DNI } = req.body;

    if(DNI)
    {
        existDNI(req, res, next);
    }else{
        next();
    }
};

module.exports = {
    existDNI,
    loginValidUser,
    validCompany,
    validDNI,
    isAdmin,
    containsDNI,
}