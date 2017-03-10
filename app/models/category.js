var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
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
    }]
});

module.exports = mongoose.model('Category', CategorySchema);
