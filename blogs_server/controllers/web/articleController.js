const articleModel = require('../../models/articleModel')
const articleController = {
    list: async (req, res) => {
        const result = req.params.id ? await articleModel.find({ _id: req.params.id }) : await articleModel.find({})
        res.send({
            ActionType: "OK",
            data: result
        })
    }
}
module.exports = articleController;