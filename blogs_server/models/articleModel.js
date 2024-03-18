const mongoose = require('mongoose');
const ArticleSchema = new mongoose.Schema({
    title: { // 标题
        type: String,
    },
    author: { // 作者
        type: mongoose.Schema.Types.ObjectId,
    },
    category: { // 分类
        type: mongoose.Schema.Types.ObjectId,
    },
    tags: { // 标签
        type: [mongoose.Schema.Types.ObjectId],
    },
    cover: { // 封面
        type: String,
    },
    content: { // 内容
        type: String,
    },
    isPublish: { // 是否发布
        type: Boolean,
    },
    lastEditTime: { // 最后编辑时间
        type: Date,
    }
})

module.exports = mongoose.model('Article', ArticleSchema)