const { User } = require('../models/')
const { comparePass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static login(req, res, next) {
        let {email, password } = req.body
        if(!email || !password) {
            throw {name: 'LOGIN_FAILED'}
        } else {
            User.findOne({
                where: {
                    email
                }
            })
            .then(user => {
                if(!user) {
                    throw {name: 'LOGIN_FAILED'}
                } else {
                    let comparePassword = comparePass(password, user.password)
                    if(!comparePassword) {
                        throw {name: 'LOGIN_FAILED'}
                    } else {
                        let payload = {
                            id: user.id,
                            email: user.email,
                            role: user.role
                        }
                        let token = generateToken(payload)
                        res.status(200).json({
                            message: 'login success',
                            token
                        })
                    }
                }
            })
            .catch(err => {
                next(err)
            })
        }
        
    }
}
module.exports = UserController