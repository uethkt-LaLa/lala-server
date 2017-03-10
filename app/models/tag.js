var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = Schema({
    name: {
        type: String,
        required: true
    },
    posts: [{
        type: String,
        unique: true
    }],
    followers: [{
        type: String,
        unique: true
    }],
    image_url: {
        type: String
    }
});

module.exports = mongoose.model('Tag', TagSchema);
