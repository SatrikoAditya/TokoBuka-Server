const { Cart, Product } = require('../models/');

class CartController {
    static addCart(req, res, next) {
        const userId = req.loginUser.id
        const productId = Number(req.params.productId)
        let total = 1;
        Cart.findOne({
            where: {
                userId,
                productId,
                status:'onCart'
            },
            include: ['Product']
        })
        .then(data => {
            if(data) {
                total = data.total
            }
            if(!data) {
                return Cart.create({
                    userId, productId, total:1, status:'onCart'
                })
            } else if(total < data.Product.stock) {
                return data.update({
                    total: total + 1
                }, {
                    where: {
                        userId,
                        productId
                    },
                })
            } 
            else {
                throw {name: 'CANT_ADD_MORE_THAN_STOCK'}
            }
        })
        .then(addResult => {
            console.log(addResult)
            res.status(201).json({addResult})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static plusOne(req, res, next) {
        const userId = req.loginUser.id
        const productId = Number(req.params.productId)
        let total;
        Cart.findOne({
            where: {
                userId,
                productId,
                status:'onCart'
            },
            include: ['Product']
        })
        .then(data => {
            if (data) {
                total = data.total
            }
            if(!data) {
                throw {name: 'DATA_NOT_FOUND'}
            } else if (total < data.Product.stock) {
                return data.update({
                    total: total + 1
                }, {
                    where: {
                        userId,
                        productId
                    }
                })
            } else {
                throw {name: 'CANT_ADD_MORE_THAN_STOCK'}
            }
        })
        .then(result => {
            res.status(200).json({result})
        })
        .catch(err => {
            next(err)
        })
    }

    static minONe(req, res, next) {
        const userId = req.loginUser.id
        const productId = Number(req.params.productId)
        let total;
        Cart.findOne({
            where: {
                userId,
                productId,
                status:'onCart'
            },
            include: ['Product']
        })
        .then(data => {
            if(data) {
                total = data.total
            }
            if(!data) {
                throw {name: 'DATA_NOT_FOUND'} 
            } else if(total > 1) {
                return data.update({
                    total: total - 1
                }, {
                    where: {
                        userId,
                        productId
                    }
                })
            } else {
                throw {name: 'TOTAL_CANT_LESS_THAN_ONE'}
            }
        })
        .then(result => {
            res.status(200).json({result})
        })
        .catch(err => {
            next(err)
        })
    }

    static findAll(req, res, next) {
        const userId = req.loginUser.id
        Cart.findAll({
            where: {
                userId,
                status:'onCart'
            },
            include: ['Product']
        })
        .then(product => {
            let totalPrice = 0;
            for(let i = 0; i < product.length; i++) {
                totalPrice += product[i].total * product[i].Product.price
            }
            res.status(200).json({product, totalPrice})
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        const userId = req.loginUser.id
        const {productId} = req.params
        Cart.destroy({
            where : {
                userId,
                productId,
                status:'onCart'
            }
        })
        .then(data => {
            res.status(200).json({message: 'Success remove product from cart!'})
        })
        .catch(err => {
            next(err)
        })
    }

    static history (req, res, next) {
        const userId = req.loginUser.id
        Cart.findAll({
            where: {
                userId,
                status: 'checkout'
            },
            order: [
                ['createdAt', 'DESC']
            ],
            include: ['Product']
        })
        .then(data => {
            res.status(200).json({data})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static clearHistory (req, res, next) {
        const userId = req.loginUser.id
        Cart.destroy({
            where: {
                userId,
                status: 'checkout'
            }
        })
        .then(data => {
            res.status(200).json({message: 'Success Clear History'})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    // static async checkout (req, res, next) {
    //     try {
    //         const userId = req.loginUser.id
    //         let dataProduct;
    //         const dataCart = await Cart.findAll({
    //             where: {
    //                 userId,
    //                 status:'onCart'
    //             },
    //             include: ['Product']
    //         })
    //         if(!dataCart) {
    //             throw {name: 'DATA_NOT_FOUND'}
    //         } else {
    //             for(let i = 0; i < dataCart.length; i++) {
    //                 const updateCart = await dataCart[i].update({
    //                     status: 'checkout'
    //                 })
    //             }
    //             dataProduct = dataCart
    //             let stock;
    //             for(let j = 0; j < dataProduct.length; j++) {
    //                 const product = await Product.findOne({
    //                     where: {
    //                         id: dataProduct[j].productId
    //                     }
    //                 })
    //                 stock = product.stock
    //                 const productUpdate = await Product.update({
    //                     stock: stock - dataProduct[j].total
    //                 }, {
    //                     where: {
    //                         id: dataProduct[j].productId
    //                     }
    //                 })
    //             }
    //             res.status(200).json({message: 'Checkout Success!'})
    //         }
    //     } catch (err) {
    //         console.log(err)
    //         next(err)
    //     }
    // }

    static checkout(req, res, next) {
        const userId = req.loginUser.id
        let checkoutCart;
        Cart.findAll({
            where: {
                userId,
                status:'onCart'
            },
            include: ['Product']
        })
        .then(data => {
            checkoutCart = data
            let promiseUpdateCart = []
            data.forEach(element => {
                promiseUpdateCart.push(Cart.update({
                    status: 'checkout'
                }, {
                    where: {
                        userId
                    }
                })) 
            });
            return Promise.all(promiseUpdateCart)
        })
        .then(result => {
            let promiseDecrementProduct = []
            checkoutCart.forEach(element => {
                promiseDecrementProduct.push(Product.decrement('stock', {
                    by: element.total,
                    where: {
                        id: element.productId
                    }
                }))
            });
            return Promise.all(promiseDecrementProduct)
        })
        .then(end => {
            res.status(200).json({message: 'Checkout Success!'})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
}

module.exports = CartController