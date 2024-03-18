const tagController = require('../../controllers/admin/tagController')

const router = require('express').Router()

// 添加
router.post('/add', tagController.add)
// 列表
router.get('/list', tagController.list)
// 回调
router.get('/list/:id', tagController.list)
// 编辑
router.put('/edit/:id', tagController.edit)
// 删除
router.delete('/delete/:id', tagController.delete)

module.exports = router