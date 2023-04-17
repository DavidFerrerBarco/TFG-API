const employeeSchema = require('../models/employee');

async function getAll()
{
    return await employeeSchema.find();
};

async function getOne()
{
    return await employeeSchema.findById({_id: id});
};

async function getEmployeesByCompany(name)
{
    return await employeeSchema.find({company: name});
}

module.exports = {
    getAll,
    getOne,
    getEmployeesByCompany,
}