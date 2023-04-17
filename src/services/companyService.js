const companySchema = require('../models/company');

async function getAll()
{
    return await companySchema.find();
};

async function getOne(id)
{
    return await companySchema.findById({_id: id});
};

async function createOne(company)
{
    return await company.save();
};

async function updateOne(id, company)
{
    if(await companySchema.findOne({_id: id}) == null) throw new Error()
    await companySchema.findByIdAndUpdate({_id : id}, company)
};

async function deleteOne(id)
{
    if(await companySchema.findOne({_id: id}) == null) throw new Error()
    await companySchema.findByIdAndDelete({_id: id});
};

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}