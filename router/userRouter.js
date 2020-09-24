const router = require('express').Router()
const UserController = require('../controller/UserController')

// FOR ADMIN
router.post('/login', UserController.login) 

// FOR CUSTOMER
router.post('/customers/register', UserController.registerCustomer)
router.post('/customers/login', UserController.loginCustomer)

module.exports = router