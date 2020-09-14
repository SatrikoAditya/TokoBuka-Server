const request = require('supertest')
const app = require('../app')

describe('Login / Success case', () => {
    test('Should send object with keys: message & token', (done) => {
        request(app)
            .post('/login')
            .send({
                email: 'admin@mail.com',
                password: '1234',
            })
            .end((err, res) => {
                if(err) throw err
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('message', 'login success')
                expect(res.body).toHaveProperty('token', expect.any(String))
                done()
            })
    })
})

describe('Login / Error case', () => {
    test('Failed because wrong email', (done) => {
        request(app)
            .post('/login')
            .send({
                email: 'admi@mail.com',
                password: '1234',
            })
            .end((err, res) => {
                const errors = ['invalid email or password']
                if(err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })
    test('Failed because wrong password', (done) => {
        request(app)
            .post('/login')
            .send({
                email: 'admin@mail.com',
                password: 'password yang salah',
            })
            .end((err, res) => {
                const errors = ['invalid email or password']
                if(err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })
    test('Failed because email and password is empty', (done) => {
        request(app)
            .post('/login')
            .send({
                email: '',
                password: '',
            })
            .end((err, res) => {
                const errors = ['invalid email or password']
                if(err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })
    test('Failed because email and password is null', (done) => {
        request(app)
            .post('/login')
            .send()
            .end((err, res) => {
                const errors = ['invalid email or password']
                if(err) throw err
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
            })
    })
})