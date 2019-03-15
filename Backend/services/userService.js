"use strict"
const Users = require('../sequelize/models').Users;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports = {
    async createUser(req, res) {
        let user;
        let hash = await bcrypt.hash(req.payload.password, SALT_ROUNDS);
        user = await Users.create({
            fullname: req.payload.fullname,
            email: req.payload.email,
            phone: req.payload.phone,
            password: hash
        });
        return res.response(user).code(200);
    },

    async getAllUsers(req, res) {
        let result = await Users.all()
        return result;
    },

    async findUserById(req, res) {
        return Users.findOne({
            where: {
                id: req.params.id
            }
        })
    },
    async deleteUser(req, res) {
        return Users.destroy({
            where: {
                id: req.params.id
            }
        });
    },
    async updateUser(req, res) {
        req.payload = JSON.parse(JSON.stringify(req.payload)); //converting payload to json
        return await Users.update(
            {
                fullname: req.payload.fullname,
                email: req.payload.email,
                password: req.payload.password,
                phone: req.payload.phone
            },
            {
                where:
                    { id: req.params.id }
            }
        )
    },
    async findUserByEmail(req, res) {
        let result = await Users.findAll({
            where: {
                email: req.payload.email
            }
        })
        return result;
    }
};