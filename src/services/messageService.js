const messageSchema = require('../models/message');

async function getAll()
{
    return await messageSchema.find();
};

async function getOne(id)
{
    return await messageSchema.findById({_id: id});
};

async function getConversation(sender, receiver)
{
    return await messageSchema.find({sender: [sender, receiver], receiver: [sender, receiver]});
};

async function createOne(message)
{
    return await message.save();
};

async function updateOne(id, message)
{
    if(await messageSchema.findOne({_id: id}) == null) throw new Error()
    await messageSchema.findByIdAndUpdate({_id: id}, message);
};

async function deleteOne(id)
{
    if(await messageSchema.findOne({_id: id} == null)) throw new Error()
    await messageSchema.findByIdAndDelete({_id: id});
};

module.exports = {
    getAll,
    getOne,
    getConversation,
    createOne,
    updateOne,
    deleteOne
}