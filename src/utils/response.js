
// OK
function response200(response, data)
{
    customData = data

    if(!Array.isArray(data)) customData = [data]

    response.status(200).json({
        status: 'ok',
        data: customData,
    });
}

//CREATED
function response201(response, data) 
{
    response.status(201).json({
        status: 'ok',
        data: [data],
    });
}

//NOT FOUND
function response404(response)
{
    response.status(404).json({
        status: 'error',
        data: [{
            id: '404',
            name: 'Not found',
        }],
    });
}

//INTERNAL SERVER ERROR
function response500(response, data)
{
    response.status(500).json({
        data: [{
            id: '500',
            name: 'Internal Server Error',
            message: data.message
        }],
    });
}

module.exports = {
    response200,
    response201,
    response404,
    response500
}