const express = require('express')
const config = require('./config')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// 数据库
require('./models/connect')

// 后台
app.use('/adminapi', require('./routes/admin'))
// 前台
app.use('/webapi', require('./routes/web'))

app.listen(config.port, () => {
    console.log('服务器启动成功')
})