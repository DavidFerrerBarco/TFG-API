const send = require('../utils/response');
const employeeService = require('../services/employeeService');

async function createMessageExistEmployees(req, res, next)
{
    try
    {
        const { sender, receiver } = req.body;

        if(sender == null || receiver == null)
            return send.response400(res, "Alguno de los empleados no está determinado");

        const existSender = await employeeService.getEmployeeByDNI(sender);

        if(existSender == null)
            return send.response400(res, "El emisor no existe");

        const existReceiver = await employeeService.getEmployeeByDNI(receiver);

        if(existReceiver == null)
            return send.response400(res, "El receptor no existe");

        next();
    }
    catch(error)
    {
        return send.response500(res, error);
    }
}

async function existEmployeesId(req, res, next)
{
    try
    {
        const { sender, receiver } = req.params;

        return await employeeService.getOne(sender) == null || employeeService.getOne(receiver) == null
            ? send.response400(res, "Alguno de los Id de los empleados es inválido")
            : next()
    }
    catch(error)
    {
        return send.response500(res, error);
    }
}

module.exports = {
    createMessageExistEmployees,
    existEmployeesId
}