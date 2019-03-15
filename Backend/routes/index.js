
const loginController = require('../controllers/loginController')
const Joi = require('joi');

//All the routes of the api will be defined here 
module.exports = [
    {
        method: 'POST',
        path: '/login',
        handler: loginController.authenticate,
        config: {
            description: 'Authenticate User',
            notes: 'Get jwt by providing email(jd@gmail.com) & password(test@123)',
            tags: ['api'],
            auth: false,        //No auth for this end point
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            validate: {
                payload: Joi.object({
                    email: Joi.string(),
                    password: Joi.string()
                })
            }
        }
    }
]
