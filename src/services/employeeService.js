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

async function createOne(employee)
{
    return await employee.save();
};

async function updateOne(id, employee)
{
    if(await employeeSchema.findOne({_id: id}) == null) throw new Error()
    await employeeSchema.findByIdAndUpdate({_id: id}, employee)
};

async function deleteOne(id)
{
    if(await employeeSchema.findOne({_id: id}) == null) throw new Error()
    await employeeSchema.findByIdAndDelete({_id: id});
};

module.exports = {
    getAll,
    getOne,
    getEmployeesByCompany,
    createOne,
    updateOne,
    deleteOne
}