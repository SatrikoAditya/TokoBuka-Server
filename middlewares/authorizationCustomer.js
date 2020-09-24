const { Cart } = require('../models/')

function authorizationCustomer (req, res, next) {
    const userId = req.loginUser.id
    const {productId} = req.params
    Cart.findOne({
        where: {
            userId,
            productId
        }
    })
    .then(data => {
        if(!data) {
            throw {name: 'DATA_NOT_FOUND'}
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorizationCustomer