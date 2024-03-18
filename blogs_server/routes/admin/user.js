const userController = require('../../controllers/admin/userController')
const router = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: 'public/avatarUploads/' })

// 登录
router.post('/login', userController.login)
// 添加
router.post('/add', userController.add)
// 
router.post('/upload', upload.single('file'), userController.upload)
// 列表
router.get('/list', userController.list)
// 查询
router.post('/inquiry', userController.inquiry)
// 编辑回调
router.get('/list/:id', userController.list)
// 编辑
router.put('/edit/:id', userController.edit,)
// 删除
router.delete('/delete/:id', userController.delete)

module.exports = router