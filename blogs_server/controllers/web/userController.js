const userModel = require("../../models/userModel")

const userController = {
    list: async (req, res) => {
        if (req.params.id) {
            const result = await userModel.find({ _id: req.params.id })
            res.send({
                ActionType: "OK",
                data: result[0].username
            })
        } else {
            const result = await userModel.find({})
            res.send({
                ActionType: "OK",
                data: result
            })
        }
    }
}

module.exports = userController