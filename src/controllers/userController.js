const userSchema = require("../models/user");
const send = require("../utils/response");

async function getUsers(req, res)
{
    await userSchema.find()
        .then((data) => send.response200(res, data))
        .catch((error) => send.response500(res, error));
};

async function getUser(req, res)
{    
    const { id } = req.params;
    await userSchema.findById({_id : id})
        .then((data) => {
            data == null 
                ? send.response404(res)
                : send.response200(res, data);
        })
        .catch((error) => send.response500(res, error));
};

async function createUser(req, res)
{
    const user = userSchema(req.body);
    await user.save()
        .then((data) => send.response201(res, data))
        .catch((error) => send.response500(res, error))
};

async function updateUser(req, res)
{
    const { id } = req.params;
    const { body } = req;
    
    await userSchema.findByIdAndUpdate({_id : id}, body)
        .then((data) => {
            data == null 
                ? send.response404(res)
                : send.response200(res, data);
        })
        .catch((error) => send.response500(res, error));
}

async function deleteUser(req, res)
{
    const { id } = req.params;

    await userSchema.findOneAndDelete({ _id: id})
        .then((data) => {
            data == null 
                ? send.response404(res)
                : send.response200(res, data);
        })
        .catch((error) => send.response500(res, error));
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser, 
    deleteUser
};