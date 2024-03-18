const categoryController = require('../../controllers/admin/categoryController')

const router = require('express').Router()

// 添加
router.post('/add', categoryController.add)
// 列表
router.get('/list', categoryController.list)
// 回调
router.get('/list/:id', categoryController.list)
// 编辑
router.put('/edit/:id', categoryController.edit)
// 删除
router.delete('/delete/:id', categoryController.delete)

module.exports = router