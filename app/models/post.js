var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User schema
var PostSchema = Schema({
    userId: {
        type: String,
    },
    // attachment: {
    //     type: String,
    // },
    categoryId: {
        type: String
    },
    tags: [{
        type: String,
        unique: true
    }],
    is_published: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: true
    },
    likes: [{
        type: String,
        unique: true
    }],
    dislikes: [{
        type: String,
        unique: true
    }],
    comments: [{
        type: String,
        unique: true
    }],
    followers: [{
        type: String,
        unique: true
    }],
    created_time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);
