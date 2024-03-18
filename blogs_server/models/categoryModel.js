const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    category_article: {
        type: Number
    }
})

module.exports = mongoose.model('Category', categorySchema)