const router = require('express').Router()

// 用户
router.use('/user', require('./admin/user'))
// 分类
router.use('/category', require('./admin/category'))
// 标签
router.use('/tag', require('./admin/tag'))
// 文章
router.use('/article', require('./admin/article'))

module.exports = router