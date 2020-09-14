const { User } = require('../models/')

function authorization(req, res, next) {
    const role = req.loginUser.role
    if(role === 'Admin') {
        next()
    } else {
        const err = {
            name: 'AUTHORIZATION_FAILED'
        }
        next(err)
    }
}

module.exports = authorization