const router = require('express').Router()
const ProductController = require('../controller/ProductController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/customers', ProductController.findAll)

router.use(authentication)

router.post('/', authorization, ProductController.create)
router.get('/', authorization, ProductController.findAll)
router.delete('/:id', authorization, ProductController.delete)
router.put('/:id', authorization, ProductController.update)

module.exports = router