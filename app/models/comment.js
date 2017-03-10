var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User schema
var CommentSchema = Schema({
    userId: {
        type: String,
    },
    // attachment: {
    //     type: String,
    // },
    postId: {
        type: String
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
    created_time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
