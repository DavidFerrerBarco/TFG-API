const requestSchema = require('../models/request');

async function getAll()
{
    return await requestSchema.find();
};

async function getOne(id)
{
    return await requestSchema.findById({_id: id});
};

async function createOne(request)
{
    return await request.save();
};

async function updateOne(id, request)
{
    if(await requestSchema.findOne({_id: id}) == null) throw new Error()
    await requestSchema.findByIdAndUpdate({_id: id}, request);
};

async function deleteOne(id)
{
    if(await requestSchema.findOne({_id: id}) == null) throw new Error()
    await requestSchema.findOneAndDelete({_id: id});
};

async function deleteAllByEmployee(employee)
{
    await requestSchema.deleteMany({employee: employee});
};

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    deleteAllByEmployee
}