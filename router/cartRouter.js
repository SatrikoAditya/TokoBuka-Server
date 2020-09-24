const router = require('express').Router()
const CartController = require('../controller/CartController')
const authentication = require('../middlewares/authentication')
const authorizationCustomer = require('../middlewares/authorizationCustomer')

router.use(authentication)

router.get('/', CartController.findAll)
router.get('/history', CartController.history)
router.post('/:productId', CartController.addCart)
router.patch('/plus/:productId', CartController.plusOne)
router.patch('/min/:productId', CartController.minONe)
router.delete('/history', CartController.clearHistory)
router.delete('/:productId', authorizationCustomer, CartController.delete)
router.patch('/checkout', CartController.checkout)

module.exports = router