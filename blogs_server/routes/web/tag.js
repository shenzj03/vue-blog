const tagController = require('../../controllers/web/tagController')

const router = require('express').Router()

// 列表
// router.get('/list', tagController.list)
// 回调
router.get('/list/:id', tagController.list)

module.exports = router