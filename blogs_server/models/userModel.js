const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    account: String, // 账号
    username: String, // 用户名
    password: String, // 密码
    avatar: String, // 头像
    role: Number, // 角色 0 管理; 1 编辑;2 普通用户;
})

module.exports = mongoose.model('User', userSchema)