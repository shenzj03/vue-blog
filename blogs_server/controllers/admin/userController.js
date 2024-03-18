const userModel = require("../../models/userModel")
const { hashPassword, comparePassword } = require("../../utils/bcrypt")

const userController = {
    login: async (req, res) => {
        const { account, password } = req.body;
        const user = await userModel.findOne({ account: account });
        const isPasswordMatch = comparePassword(password, user.password);
        if (!user || !isPasswordMatch) {
            res.send({
                code: "-1",
                error: "账号或密码错误"
            });
            return;
        } else {
            res.send({
                ActionType: "OK",
                data: {
                    _id: user._id,
                    account: user.account,
                    username: user.username,
                    role: user.role,
                    avatar: user.avatar,
                }
            });
        }
    },
    list: async (req, res) => {
        const result = req.params.id ? await userModel.find({ _id: req.params.id }) : await userModel.find()
        const resultData = []
        for (const i in result) {
            resultData.push({
                _id: result[i]._id,
                account: result[i].account,
                username: result[i].username,
                role: result[i].role
            })
        }
        res.send({
            ActionType: "OK",
            data: resultData
        })
    },
    upload: async (req, res) => {
        const { account, username, role, _id } = req.body;
        const avatar = req.file ? `/avatarUploads/${req.file.filename}` : ""
        if (avatar === "") {
            await userModel.updateOne({ _id: _id }, { account, username, role: Number(role) })
            res.send({
                ActionType: "OK",
                data: {
                    _id, account, username, role: Number(role)
                }
            })
        } else {
            await userModel.updateOne({ _id: _id }, { account, username, role: Number(role), avatar })
            res.send({
                ActionType: "OK",
                data: {
                    _id, account, username, role: Number(role), avatar
                }
            })
        }
    },
    inquiry: async (req, res) => {
        const result = await userModel.findOne({ $or: [{ account: req.body._value }, { username: req.body._value }] })
        if (result === null) {
            res.send({
                code: "-1",
                error: "没有找到该用户"
            })
        } else {
            res.send({
                ActionType: "OK",
                data: {
                    _id: result._id,
                    account: result.account,
                    username: result.username,
                    role: result.role
                }
            })
        }
    },
    add: async (req, res) => {
        const { account, password, role } = req.body
        // 检查账号是否已存在
        const result = await userModel.findOne({ account: account })
        if (!result) {
            await userModel.create({
                account, password: hashPassword(password), role: Number(role), username: account
            })
            res.send({
                ActionType: "OK",
            })
        } else {
            res.send({
                code: "-1",
                error: "账号已存在"
            })
        }
    },
    edit: async (req, res) => {
        await userModel.updateOne({ _id: req.params.id }, { ...req.body })
        res.send({
            ActionType: "OK",
            data: {
                _id: req.params.id,
                ...req.body
            }
        })
    },
    delete: async (req, res) => {
        await userModel.deleteOne({ _id: req.params.id })
        res.send({
            ActionType: "OK",
        })
    }
}

module.exports = userController