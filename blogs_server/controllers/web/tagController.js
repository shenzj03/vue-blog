const tagModel = require('../../models/tagModel')
const tagController = {
    list: async (req, res) => {
        if (req.params.id) {
            const result = await tagModel.find({ _id: req.params.id })
            res.send({
                ActionType: "OK",
                data: result[0].tag
            })
        } else {
            const result = await tagModel.find()
            res.send({
                ActionType: "OK",
                data: result
            })
        }
    },
}

module.exports = tagController