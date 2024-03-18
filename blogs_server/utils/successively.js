const categoryModel = require('../models/categoryModel')
const tagModel = require('../models/tagModel')
async function increase(category, tagIds) {
    categoryModel.updateOne({ _id: category }, { $inc: { category_article: 1 } })
    for (const tagId of tagIds) {
        tagModel.updateOne({ _id: tagId }, { $inc: { tag_article: 1 } })
    }
}
async function decrease(category, tagIds) {
    await categoryModel.updateOne({ _id: category }, { $inc: { category_article: -1 } })
    for (const tagId of tagIds) {
        await tagModel.updateOne({ _id: tagId }, { $inc: { tag_article: -1 } })
    }
}
module.exports = {
    increase, decrease
}