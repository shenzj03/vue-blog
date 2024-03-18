const categoryModel = require('../../models/categoryModel')
const categoryController = {
    list: async (req, res) => {
        const result = req.params.id ? await categoryModel.find({ _id: req.params.id }) : await categoryModel.find()
        res.send({
            ActionType: "OK",
            data: result
        })
    },
    add: async (req, res) => {
        const result = await categoryModel.find({ category: req.body.category })
        if (result.length == 0) {
            await categoryModel.create({ ...req.body })
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
        await categoryModel.updateOne({ _id: req.params.id }, req.body)
        res.send({
            ActionType: "OK"
        })
    },
    delete: async (req, res) => {
        await categoryModel.deleteOne({ _id: req.params.id })
        res.send({
            ActionType: "OK"
        })
    }
}

module.exports = categoryController