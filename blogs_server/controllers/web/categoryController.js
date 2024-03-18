const categoryModel = require('../../models/categoryModel')
const categoryController = {
    list: async (req, res) => {
        if (req.params.id) {
            const result = await categoryModel.find({ _id: req.params.id })
            res.send({
                ActionType: "OK",
                data: result[0].category
            })
        } else {
            const result = await categoryModel.find({})
            res.send({
                ActionType: "OK",
                data: result
            })
        }
    },
}

module.exports = categoryController