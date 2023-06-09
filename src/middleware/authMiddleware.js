const send = require('../utils/response');
const jwt = require('jsonwebtoken');

async function validateToken(req, res, next)
{
    if(!req.headers.authorization)
        return send.response401(res);

    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    try 
    {
        jwt.verify(token, process.env.JWT_SECRET);
        
        next();
    } 
    catch (error) 
    {
        return send.response401(res, error);
    }
};

module.exports = {
    validateToken
}