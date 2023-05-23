const taskSchema = require('../models/task');

async function getAll()
{
    return await taskSchema.find();
};

async function getOne(id)
{
    return await taskSchema.findById({_id: id});
};

async function getTasksFromEmployee(employee)
{
    return await taskSchema.find({employee: employee});
};

async function createOne(task)
{
    return await task.save();
};

async function updateOne(id, task)
{
    if(await taskSchema.findOne({_id: id}) == null) throw new Error()
    return await taskSchema.findByIdAndUpdate({_id: id}, task);
};

async function deleteOne(id)
{
    if(await taskSchema.findOne({_id: id}) == null) throw new Error()
    return await taskSchema.findByIdAndDelete({_id: id});
};

async function deleteAllByEmployee(employee)
{
    await taskSchema.deleteMany({employee: employee});
};
module.exports = {
    getAll,
    getOne,
    getTasksFromEmployee,
    createOne,
    updateOne,
    deleteOne,
    deleteAllByEmployee
}