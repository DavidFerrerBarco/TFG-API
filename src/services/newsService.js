const newsSchema = require('../models/news');

async function getAll()
{
    return await newsSchema.find();
};

async function getOne(id)
{
    return await newsSchema.findById({_id: id});
};

async function createOne(news)
{
    return await news.save();
};

async function updateOne(id, news)
{
    if(await newsSchema.findOne({_id: id}) == null) throw new Error()
    return await newsSchema.findByIdAndUpdate({_id: id}, news);
};

async function deleteOne(id)
{
    if(await newsSchema.findOne({_id: id}) == null) throw new Error()
    return await newsSchema.findByIdAndDelete({_id: id});
};

module.exports = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}