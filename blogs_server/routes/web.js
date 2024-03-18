const router = require('express').Router()

router.use("/user", require("./web/user"))
router.use("/category", require("./web/category"))
router.use("/tag", require("./web/tag"))
router.use("/article", require("./web/article"))

module.exports = router