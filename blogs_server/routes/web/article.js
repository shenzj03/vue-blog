const articleController = require('../../controllers/web/articleController')

const router = require('express').Router()

router.get("/list", articleController.list)

router.get("/list/:id", articleController.list)

module.exports = router