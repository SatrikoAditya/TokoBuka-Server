const { Product } = require('../models/')
const e = require('express')

class ProductController {
    static create(req, res, next){
        let {name, image_url, price, stock} = req.body
        Product.create({
            name, image_url, price, stock
        })
        .then(data => {
            res.status(201).json({
                message: 'create new product success',
                data
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static findAll(req, res, next) {
        Product.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        .then(data => {
            res.status(200).json({data})
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next) {
        const { id } = req.params
        Product.findByPk(id)
        .then(data => {
            if(!data) {
                throw {name: 'DATA_NOT_FOUND'}
            } else {
                data.destroy()
                res.status(200).json({message: 'Product delete success'})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static update(req, res, next) {
        const { id } = req.params
        const { name, image_url, price, stock } = req.body
        Product.findByPk(id)
        .then(data => {
            if(!data) {
                throw {name: 'DATA_NOT_FOUND'}
            } else {
                return data.update({
                    name, image_url, price, stock
                }, {
                    validate: true
                })
            }
        })
        .then(result => {
            res.status(200).json({message: 'success edit data'})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ProductController