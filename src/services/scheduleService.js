const scheduleSchema = require('../models/schedule');

async function getAll()
{
    return await scheduleSchema.find();
};

async function getOne(id)
{
    return await scheduleSchema.findById({_id: id});
};

async function getScheduleFromEmployee(employee)
{
    return await scheduleSchema.find({employee: employee});
};
async function createOne(schedule)
{
    return await schedule.save();
};

async function updateOne(id, schedule)
{
    if(await scheduleSchema.findOne({_id: id}) == null) throw new Error()
    return await scheduleSchema.findByIdAndUpdate({_id: id});
};

async function deleteOne(id)
{
    if(await scheduleSchema.findOne({_id: id}) == null) throw new Error()
    return await scheduleSchema.findByIdAndDelete({_id: id});
};

async function deleteAllByEmployee(employee)
{
    await scheduleSchema.deleteMany({employee: employee});
};

module.exports = {
    getAll,
    getOne,
    getScheduleFromEmployee,
    createOne,
    updateOne,
    deleteOne,
    deleteAllByEmployee
}