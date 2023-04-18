const employeeSchema = require('../models/employee');
const taskService = require('./taskService');
const scheduleService = require('./scheduleService');
const requestService = require('./requestService');

async function getAll()
{
    return await employeeSchema.find();
};

async function getOne(id)
{
    return await employeeSchema.findById({_id: id});
};

async function getEmployeesByCompany(name)
{
    return await employeeSchema.findOne({company: name});
}

async function getEmployeeByDNI(DNI)
{
    return await employeeSchema.findOne({DNI: DNI});
};

async function getEmployeeByEmail(email)
{
    return await employeeSchema.findOne({email: email});
};

async function createOne(employee)
{
    return await employee.save();
};

async function updateOne(id, employee)
{
    if(await employeeSchema.findOne({_id: id}) == null) throw new Error()
    return await employeeSchema.findByIdAndUpdate({_id: id}, employee)
};

async function deleteOne(id)
{
    const employee = await employeeSchema.findOne({_id: id})
    if(employee == null) throw new Error()

    const { DNI } = employee
    await deleteTaskScheduleRequest(DNI);
    
    return await employeeSchema.findByIdAndDelete({_id: id});
};

async function deleteTaskScheduleRequest(DNI)
{
    await taskService.deleteAllByEmployee(DNI);
    await scheduleService.deleteAllByEmployee(DNI);
    await requestService.deleteAllByEmployee(DNI);
};

async function deleteAllByCompany(company)
{

    const employees = await employeeSchema.find({company: company})

    employees.forEach(async employee => {
        const { DNI } = employee
        await deleteTaskScheduleRequest(DNI);
    })
    await employeeSchema.deleteMany({company: company});
};

module.exports = {
    getAll,
    getOne,
    getEmployeesByCompany,
    getEmployeeByDNI,
    getEmployeeByEmail,
    createOne,
    updateOne,
    deleteOne,
    deleteAllByCompany
}