const Joi = require('joi');
const userController = require('../controllers/userController');

module.exports = [
    {
        method: 'POST',
        path: '/user',
        handler: userController.createUser,
        config: {
            tags: ['api', 'user'],
            description: 'Add User',
            notes: ['Add User to database'],
            auth: false,
            validate: {
                payload: {
                    fullname: Joi.string()
                        .required(),
                    email: Joi.string()
                        .required(),
                    phone: Joi.string(),
                    password: Joi.string()
                        .required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/user',
        handler: userController.getAllUsers,
        config: {
            tags: ['api', 'user'],
            description: 'Get Users',
            notes: ['Get Users from database'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).options({ allowUnknown: true }),
            }
        }
    },
    {
        method: 'GET',
        path: '/user/{id}',
        handler: userController.findUserById,
        config: {
            tags: ['api', 'user'],
            description: 'Get User By ID',
            notes: ['Get User By ID'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).options({ allowUnknown: true }),
                params: {
                    id: Joi.string()
                        .required()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/user/{id}',
        config: {
            tags: ['api', 'user'],
            description: 'Remove User',
            notes: ['Deletes User from database'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).options({ allowUnknown: true }),
                params: {
                    id: Joi.string()
                        .required()
                }
            }
        },
        handler: userController.deleteUser
    },
    {
        method: 'PUT',
        path: '/user/{id}',
        config: {
            tags: ['api', 'user'],
            description: 'Update User',
            notes: ['Update User in the database'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).options({ allowUnknown: true }),
                params: {
                    id: Joi.string()
                        .required()
                },
                payload: {
                    fullname: Joi.string()
                        .required(),
                    email: Joi.string()
                        .required(),
                    phone: Joi.string(),
                    password: Joi.string()
                        .required()
                }
            }
        },
        handler: userController.updateUser
    }
]