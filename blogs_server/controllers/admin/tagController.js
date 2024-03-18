const tagModel = require('../../models/tagModel')
const tagController = {
    list: async (req, res) => {
        const result = req.params.id ? await tagModel.find({ _id: req.params.id }) : await tagModel.find()
        res.send({
            ActionType: "OK",
            data: result
        })
    },
    add: async (req, res) => {
        const result = await tagModel.find({ tag: req.body.tag })
        if (result.length == 0) {
            await tagModel.create({ ...req.body })
            res.send({
                ActionType: "OK"
            })
        } else {
            res.send({
                code: "-1",
                error: "分类已存在"
            })
        }
    },
    edit: async (req, res) => {
        await tagModel.updateOne({ _id: req.params.id }, req.body)
        res.send({
            ActionType: "OK"
        })
    },
    delete: async (req, res) => {
        await tagModel.deleteOne({ _id: req.params.id })
        res.send({
            ActionType: "OK"
        })
    }
}

module.exports = tagController