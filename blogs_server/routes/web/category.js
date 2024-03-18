const categoryController = require('../../controllers/web/categoryController')

const router = require('express').Router()

// 列表
// router.get('/list', categoryController.list)
// 回调
router.get('/list/:id', categoryController.list)

module.exports = router