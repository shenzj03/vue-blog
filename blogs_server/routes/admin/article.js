const articleController = require('../../controllers/admin/articleController')
const router = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: 'public/articleUploads/' })

// 添加
router.post('/add', upload.single('file'), articleController.add)
// 列表
router.get('/list', articleController.list)
// 查询
router.post('/inquiry', articleController.inquiry)
// 是否发布
router.put('/publish',articleController.publish)
// 编辑回调
router.get('/list/:id', articleController.list)
// 编辑
router.post('/edit', upload.single('file'), articleController.edit)
// 删除
router.delete('/delete/:id', articleController.delete)

module.exports = router