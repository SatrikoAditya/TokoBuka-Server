const request = require('supertest')
const app = require('../app')
const { User, Product } = require('../models/')
const { generateToken } = require('../helpers/jwt')

let product_data = {
    name: 'sepatu super',
    image_url: 'https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4',
    price: 10000,
    stock: 15
}

let edit_product_data = {
    name: 'sepatu biasa',
    image_url: 'https://cf.shopee.co.id/file/a782a5b475f99b995245eb4b1a6a11f4',
    price: 50000,
    stock: 100
}

let initial_token = ''
let not_admin_token = ''

let user_data = {
    email: 'admin@email.com',
    password: '12345',
    role: 'Admin'
}

let user_not_admin = {
    email: 'user@mail.com',
    password: '12345',
    role: 'User'
}

let productId;

beforeAll((done) => {
    User.create(user_data)
    .then(user => {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        initial_token = generateToken(payload)
        done()
    })
    .catch(err => {
        done(err)
    })

    User.create(user_not_admin)
    .then(user => {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        not_admin_token = generateToken(payload)
        done()
    })
    .catch(err => {
        done(err)
    })
})


afterAll((done) => {
    if(process.env.NODE_ENV === 'test') {
        Product.destroy({
            where: {
                name: product_data.name
            }
        })
        .then(_ => {
            done()
        })
        .catch(err => done(err))

        User.destroy({
            where: {
                email: user_data.email
            }
        })
        .then(_ => {
            done()
        })
        .catch(err => done(err))

        User.destroy({
            where: {
                email: user_not_admin.email
            }
        })
        .then(_ => {
            done()
        })
        .catch(err => done(err))
    }
})

describe('Product create / Success case', () => {
    test('should send object with keys message, name, image_url, price & stock', (done) => {
        request(app)
            .post('/product')
            .set('token', initial_token)
            .send(product_data)
            .end((err, res) => {
                if(err) throw err
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty('message', 'create new product success')
                expect(res.body.data).toHaveProperty('id', expect.any(Number))
                expect(res.body.data).toHaveProperty('name', product_data.name)
                expect(res.body.data).toHaveProperty('image_url', product_data.image_url)
                expect(res.body.data).toHaveProperty('price', product_data.price)
                expect(res.body.data).toHaveProperty('stock', product_data.stock)
                expect(res.body.data).toHaveProperty('updatedAt', expect.any(String))
                expect(res.body.data).toHaveProperty('createdAt', expect.any(String))
                productId = res.body.data.id
                done()
            })  
    })
})

describe('Product create / Error case', () => {
    test('failed because token is null', (done) => {
        request(app)
            .post('/product')
            .send(product_data)
            .end((err, res) => {
                const errors = ['failed to authenticate!']
                if(err) throw err
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })  
    })
    test('failed because wrong token', (done) => {
        request(app)
            .post('/product')
            .set('token', 'tokenyangsalah')
            .send(product_data)
            .end((err, res) => {
                const errors = ['invalid token']
                if(err) throw err
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })  
    })
    test('failed because user role is not admin', (done) => {
        request(app)
            .post('/product')
            .set('token', not_admin_token)
            .send(product_data)
            .end((err, res) => {
                const errors = ['forbidden access']
                if(err) throw err
                expect(res.status).toBe(403)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })  
    })
    test('failed because required field is empty', (done) => {
        const empty_name = { ...product_data, name: ''}
        request(app)
            .post('/product')
            .set('token', initial_token)
            .send(empty_name)
            .end((err, res) => {
                const errors = ['name is required']
                if(err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })  
    })
    test('failed because required field is null', (done) => {
        const null_name = { ...product_data}
        delete null_name.name
        request(app)
            .post('/product')
            .set('token', initial_token)
            .send(null_name)
            .end((err, res) => {
                const errors = ['name is required']
                if(err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })  
    })
    test('failed because stock is minus', (done) => {
        const minus_stock = { ...product_data, stock: -5}
        request(app)
            .post('/product')
            .set('token', initial_token)
            .send(minus_stock)
            .end((err, res) => {
                const errors = ['must be a non-negative number']
                if(err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })  
    })
    test('failed because wrong data type', (done) => {
        const wrong_dataType = { ...product_data, stock: 'lima'}
        request(app)
            .post('/product')
            .set('token', initial_token)
            .send(wrong_dataType)
            .end((err, res) => {
                const errors = ['only allow number format']
                if(err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })  
    })
})

describe('Product find all / Success case', () => {
    test('should send array of object with key id, name, image_url, price, stock, createdAt, updatedAt', (done) => {
        request(app)
        .get('/product')
        .set('token', initial_token)
        .end((err, res) => {
            if(err) throw err
            expect(res.status).toBe(200)
            expect(res.body.data[0]).toHaveProperty('id', expect.any(Number))
            expect(res.body.data[0]).toHaveProperty('name', product_data.name)
            expect(res.body.data[0]).toHaveProperty('image_url', product_data.image_url)
            expect(res.body.data[0]).toHaveProperty('price', product_data.price)
            expect(res.body.data[0]).toHaveProperty('stock', product_data.stock)
            expect(res.body.data[0]).toHaveProperty('createdAt', expect.any(String))
            expect(res.body.data[0]).toHaveProperty('updatedAt', expect.any(String))
            done()
        })
    })
})

describe('Product find all / Error case', () => {
    test('failed because token is null', (done) => {
        request(app)
        .get('/product')
        .end((err, res) => {
            const errors = ['failed to authenticate!']
            if(err) throw err
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining(errors))
            done()
        })
    })
    test('failed because wrong token', (done) => {
        request(app)
        .get('/product')
        .set('token', 'tokenyangsalah')
        .end((err, res) => {
            const errors = ['invalid token']
            if(err) throw err
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining(errors))
            done()
        })
    })
    test('failed because user role is not admin', (done) => {
        request(app)
        .get('/product')
        .set('token', not_admin_token)
        .end((err, res) => {
            const errors = ['forbidden access']
            if(err) throw err
            expect(res.status).toBe(403)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining(errors))
            done()
        })
    })
})

describe('Product update / Success case', () => {
    test('should send object with message', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .set('token', initial_token)
        .send(edit_product_data)
        .end((err, res) => {
            if(err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message', 'success edit data')
            done()
        })
    })
})

describe('Product update / Error case', () => {
    test('failed because token is null', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .send(edit_product_data)
        .end((err, res) => {
            const errors = ['failed to authenticate!']
            if(err) throw err
            .expect(res.status).toBe(401)
            .expect(res.body).toHaveProperty('errors', expect.any(Array))
            .expect(res.body.errors).toEqual(expect.arrayContaining(errors))
            done()
        })
    })
    test('failed because wrong token', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .set('token', 'tokenyangsalah')
        .send(edit_product_data)
        .end((err, res) => {
            const errors = ['invalid token']
            if(err) throw err
            .expect(res.status).toBe(401)
            .expect(res.body).toHaveProperty('errors', expect.any(Array))
            .expect(res.body.errors).toEqual(expect.arrayContaining(errors))
            done()
        })
    })
    test('failed because data not found', (done) => {
        request(app)
        .put(`/product/1`)
        .set('token', initial_token)
        .send(edit_product_data)
        .end((err, res) => {
            const errors = ['data not found']
            if(err) throw err
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining(errors))
            done()
        })
    })
    test('failed because user role is not admin', (done) => {
        request(app)
        .put(`/product/${productId}`)
        .set('token', not_admin_token)
        .send(edit_product_data)
        .end((err, res) => {
            const errors = ['forbidden access']
            if(err) throw err
            .expect(res.status).toBe(403)
            .expect(res.body).toHaveProperty('errors', expect.any(Array))
            .expect(res.body.errors).toEqual(expect.arrayContaining(errors))
            done()
        })
    })
    // test('failed because required field is empty', (done) => {
    //     const empty_name = { ...edit_product_data, name: ''}
    //     request(app)
    //         .put(`product/${productId}`)
    //         .set('token', initial_token)
    //         .send(empty_name)
    //         .end((err, res) => {
    //             const errors = ['name is required']
    //             if(err) throw err
    //             expect(res.status).toBe(400)
    //             expect(res.body).toHaveProperty('errors', expect.any(Array))
    //             expect(res.body.errors).toEqual(expect.arrayContaining(errors))
    //             done()
    //         })  
    // })
    // test('failed because stock is minus', (done) => {
    //     const minus_stock_edit = {...edit_product_data, stock: -5}
    //     request(app)
    //     .put(`/product/${productId}`)
    //     .set('token', initial_token)
    //     .send(minus_stock_edit)
    //     .end((err, res) => {
    //         const errors = ['must be a non-negative number']
    //         if(err) throw err
    //         expect(res.status).toBe(400)
    //         expect(res.body).toHaveProperty('errors', expect.any(Array))
    //         expect(res.body.errors).toEqual(expect.arrayContaining(errors))
    //     })
    // })
})

describe('Product delete / Success case', () => {
    test('should send object with message', (done) => {
        request(app)
        .delete(`/product/${productId}`)
        .set('token', initial_token)
        .end((err, res) => {
            if(err) throw err
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message', 'Product delete success')
            done()
        })
    })
})

describe('Product delete / Error case', () => {
    test('failed because token is null', (done) => {
        request(app)
        .delete(`/product/${productId}`)
        .end((err, res) => {
            const errors = ['failed to authenticate!']
            if(err) throw err
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining(errors))
            done()
        })
    })
    test('failed because wrong token', (done) => {
        request(app)
        .delete(`/product/${productId}`)
        .set('token', 'tokenyangsalah')
        .end((err, res) => {
            const errors = ['invalid token']
            if(err) throw err
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining(errors))
            done()
        })
    })
    test('failed because user role is not admin', (done) => {
        request(app)
        .delete(`/product/${productId}`)
        .set('token', not_admin_token)
        .end((err, res) => {
            const errors = ['forbidden access']
            if(err) throw err
            expect(res.status).toBe(403)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining(errors))
            done()
        })
    })
    test('failed because data not found', (done) => {
        request(app)
        .delete(`/product/1`)
        .set('token', initial_token)
        .end((err, res) => {
            const errors = ['data not found']
            if(err) throw err
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toEqual(expect.arrayContaining(errors))
            done()
        })
    })
})

