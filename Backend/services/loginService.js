const userService = require('./userService');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateJwtToken = (user) => {
    let expires = moment().utc().add({ days: 1 }).unix();
    let token = jwt.sign({
        exp: expires,    //expires in 24 hrs
        user: user
    }, "9DhvalMbCZ9srYWe9DTaJZ");
    return {
        token: token,
        expires: moment.unix(expires).format()
    }
}

module.exports = {
    async authentiate(req, res) {
        let token;
        let data = await userService.findUserByEmail(req, res);
        if (data.length > 0) {
            let user = data[0].dataValues;
            let flag = await bcrypt.compare(req.payload.password, user.password);
            if (flag) {
                let response = {
                    fullname: user.fullname,
                    email: user.email,
                    phone: user.phone,
                    roleid: user.roleid
                }
                token = generateJwtToken(response);
            } else {
                return res.response({ "error": "Invalid Credentials: Please check your email or password." }).code(401);
            }
        } else {
            return res.response({ "error": "Invalid Credentials: Please check your email or password." }).code(401);
        }
        return token;
    }
}

