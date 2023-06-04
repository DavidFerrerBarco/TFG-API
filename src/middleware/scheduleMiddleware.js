const send = require('../utils/response');
const employeeService = require('../services/employeeService');
const scheduleService = require('../services/scheduleService');

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

async function validDate(req, res, next){
    const { day, employee } = req.body;

    try{
            if((await scheduleService.getScheduleFromEmployeeByDay(employee, day)).length > 0)
           return send.response400(res, "ya tiene horario para este día")
    
        next();
    }
    catch(error)
    {
        return send.response500(res, error);
    }
    
};

module.exports = {
    existEmployeeDNI,
    validDate,
}