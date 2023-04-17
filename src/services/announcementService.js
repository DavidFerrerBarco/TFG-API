const announcementSchema = require('../models/announcement');

async function getAll()
{
    return await announcementSchema.find();
};

async function getOne(id)
{
    return await announcementSchema.findById({_id: id});
};

async function createOne(announcement)
{
    return await announcement.save();
};

async function updateOne(id, announcement)
{
    if(await announcementSchema.findOne({_id: id}) == null) throw new Error()
    await announcementSchema.findByIdAndUpdate({_id: id}, announcement);
};

async function deleteOne(id)
{
    if(await announcementSchema.findOne({_id: id}) == null) throw new Error()
    await announcementSchema.findByIdAndDelete({_id: id});
};

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}