const userController = require('../../controllers/web/userController')
const router = require('express').Router()

router.get('/list/:id',userController.list)


module.exports = router