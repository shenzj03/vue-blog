const mongoose = require('mongoose')
const articleModel = require('../../models/articleModel')
const userModel = require('../../models/userModel')
const categoryModel = require('../../models/categoryModel')
const tagModel = require('../../models/tagModel')
const { increase, decrease } = require('../../utils/successively')
const articleController = {
    list: async (req, res) => {
        const result = req.params.id ? await articleModel.find({ _id: req.params.id }) : await articleModel.find({})
        res.send({
            ActionType: "OK",
            data: result
        })
    },
    inquiry: async (req, res) => {

    },
    publish: async (req, res) => {
        const { _id, isPublish } = req.body
        await articleModel.updateOne({ _id }, { isPublish: Boolean(isPublish) })
        res.send({
            ActionType: "OK",
        })
    },
    add: async (req, res) => {
        const { title, author, category, tags, content, isPublish, lastEditTime } = req.body
        const cover = "/articleuploads/" + req.file.filename
        const result = await userModel.findOne({ username: author })
        const tagIds = tags.split(',')
        await articleModel.create({
            title, author: result._id, category, tags: tagIds, content, cover, isPublish: Boolean(isPublish), lastEditTime
        })
        increase(category, tagIds)
        res.send({
            ActionType: "OK",
        })
    },
    edit: async (req, res) => {
        const { title, author, category, tags, content, isPublish, lastEditTime, _id } = req.body
        const cover = req.file ? `/avatarUploads/${req.file.filename}` : ""
        const tagIds = tags.split(',')
        const originalArticle = await articleModel.findOne({ _id });
        await decrease(originalArticle.category, originalArticle.tags)
        if (cover === "") {
            await articleModel.updateOne({ _id: _id }, {
                title, author, category, tags: tagIds, content, isPublish: Boolean(isPublish), lastEditTime
            })
        } else {
            await articleModel.updateOne({ _id: _id }, {
                title, author, category, tags: tagIds, content, cover, isPublish: Boolean(isPublish), lastEditTime
            })
        }
        await increase(category, tagIds)
        res.send({
            ActionType: "OK",
        })
    },
    delete: async (req, res) => {
        const _id = req.params.id
        const { category, tags } = await articleModel.findOne({ _id })
        decrease(category, tags)
        await articleModel.deleteOne({ _id: _id })
        res.send({
            ActionType: "OK",
        })
    },

}

module.exports = articleController