
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

//BAD REQUEST
function response400(response, name)
{
    response.status(400).json({
        status: 'error',
        data: [{
            id: '400',
            name: name
        }],
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
    response400,
    response404,
    response500
}