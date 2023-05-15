const announcementSchema = require('../models/announcement');

async function getAll()
{
    return await announcementSchema.find();
};

async function getOne(id)
{
    return await announcementSchema.findById({_id: id});
};

async function getByCompany(company)
{
    return await announcementSchema.where({company: company});
};

async function createOne(announcement)
{
    return await announcement.save();
};

async function updateOne(id, announcement)
{
    if(await announcementSchema.findOne({_id: id}) == null) throw new Error()
    return await announcementSchema.findByIdAndUpdate({_id: id}, announcement);
};

async function deleteOne(id)
{
    if(await announcementSchema.findOne({_id: id}) == null) throw new Error()
    return await announcementSchema.findByIdAndDelete({_id: id});
};

async function deleteAllByCompany(company)
{
    await announcementSchema.deleteMany({company: company});
};

module.exports = {
    getAll,
    getOne,
    getByCompany,
    createOne,
    updateOne,
    deleteOne,
    deleteAllByCompany
}