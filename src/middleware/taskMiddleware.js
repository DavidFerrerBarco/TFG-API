const send = require('../utils/response');
const employeeService = require('../services/employeeService');

async function existEmployeeDNI(req, res, next)
{
    try
    {
        const { employee } = req.body;

        if(employee == null || await employeeService.getEmployeeByDNI(employee) == null)
            return send.response400(res, "El empleado no existe")
        
        next()
    }
    catch(error)
    {
        return send.response500(res, error);
    }
}

module.exports = {
    existEmployeeDNI
}