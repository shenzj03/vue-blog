const mongoose = require('mongoose');
const tagSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true
    },
    tag_article: {
        type: Number
    }
})

module.exports = mongoose.model('Tag', tagSchema)