var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// User schema
var UserSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    display_name: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fb_id: {
        type: String,
        default: ""
    },
    token: {
        type: String
    },
    phone_number: {
        type: String
    },
    gender: {
        type: Boolean,
    },
    bio: {
        type: String,
    },
    hometown: {
        type: String
    },
    interested_in: {
        type: String
    },
    education: {
        type: String
    },
    work: {
        type: String
    },
    followings: [{
        type: String,
        unique: true
    }],
    following_posts: [{
        type: String,
        unique: true
    }],
    following_tags: [{
        type: String,
        unique: true
    }],
    following_categories: [{
        type: String,
        unique: true
    }],
    followers: [{
        type: String,
        unique: true
    }],
    join_date: {
        type: Date,
        default: Date.now
    },
    popular: {
        type: Number,
        default: 0
    },
    image_url: {
        type: String
    },
    plain_pass: {
        type: String,
        default: ""
    }
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
