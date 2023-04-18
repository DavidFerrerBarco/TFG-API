const companySchema = require('../models/company');
const employeeService = require('./employeeService');
const announcementService = require('./announcementService');

async function getAll()
{
    return await companySchema.find();
};

async function getOne(id)
{
    return await companySchema.findById({_id: id});
};

async function getCompanyByName(name)
{
    return await companySchema.findOne({name: name});
};


async function createOne(company)
{
    return await company.save();
};

async function updateOne(id, company)
{
    if(await companySchema.findOne({_id: id}) == null) throw new Error()
    return await companySchema.findByIdAndUpdate({_id : id}, company)
};

async function deleteOne(id)
{
    const company = await companySchema.findOne({_id: id})

    if(company == null)
        throw new Error()

    const { name } = company
    
    await employeeService.deleteAllByCompany(name);
    await announcementService.deleteAllByCompany(name);

    return await companySchema.findByIdAndDelete({_id: id});
};

module.exports = {
    getAll,
    getOne,
    getCompanyByName,
    createOne,
    updateOne,
    deleteOne
}