var User = require('../models/user');
var Tag = require('../models/tag');
var Post = require('../models/post');

exports.postUsers = function(req, res) {
    var user = new User(req.body);

    user.username = req.body.fb_id;
    user.display_name = req.body.display_name;
    user.password = req.body.password;
    user.plain_pass = req.body.password;
    user.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: "New user was created!", data: user });
    });
};

exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};

exports.getPopularUsers = function (req, res) {
    User.find({}, null, {sort: {popular: -1}}, function (err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
}


exports.getTagsUserFollow = function (req, res) {
    Tag.find({'_id': {'$in' : req.user.following_tags}}, function (err, tags) {
        if (err)
            res.send(err);
        res.json(tags);
    });
}


exports.getUser = function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.getUserByFBId = function(req, res) {
    User.find({ fb_id: req.params.fb_id }, function(err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
};

exports.putUser = function(req, res) {
    User.update({ "_id": req.user._id }, req.body,
        function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User updated!' });
        });
};

exports.deleteUser = function(req, res) {
    User.remove({
        _id: req.user._id
    }, function(err, user) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
};

exports.getCurrentUser = function(req, res) {
    User.findById(req.user._id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.followUser = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $addToSet: { "followings": req.params.following_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following added!' });
        }
    );
};

exports.unfollowUser = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $pull: { "followings": req.params.following_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following removed!' });
        }
    );
};


exports.addFollower = function(req, res) {
    User.findByIdAndUpdate(
        req.params.user_id, { $addToSet: { "followers": req.user._id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Follower added!' });
        }
    );
};

exports.removeFollower = function(req, res) {
    User.findByIdAndUpdate(
        req.params.user_id, { $pull: { "followers": req.user._id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Follower removed!' });
        }
    );
};

exports.followPost = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $addToSet: { "following_posts": req.params.post_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following post added!' });
        }
    );
};

exports.unfollowPost = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $pull: { "following_posts": req.params.post_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following post removed!' });
        }
    );
};

exports.followCategory = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $addToSet: { "following_categories": req.params.category_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following post added!' });
        }
    );
};

exports.unfollowCategory = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $pull: { "following_categories": req.params.category_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following post removed!' });
        }
    );
};

exports.followTag = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $addToSet: { "following_tags": req.params.tag_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following post added!' });
        }
    );
};

exports.unfollowTag = function(req, res) {
    User.findByIdAndUpdate(
        req.user._id, { $pull: { "following_tags": req.params.tag_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Following post removed!' });
        }
    );
};

exports.getPostsUserFollow = function(req, res) {
    Post.find({'_id': {'$in' : req.user.following_posts}}, null, {sort: {created_time: 1}},
        function (err, posts) {
            if (err) {
                res.send(err);
            }
            res.json(posts);
        });
};

exports.getNewFeeds = function(req, res) {
    var results = new Set();
    var following_posts = req.user.following_posts;
    for (var i = 0; i < following_posts.length; ++i) {
        results.add(following_posts[i]);
    }

    Tag.find({'_id': {'$in' : req.user.following_tags}}, function (err, tags) {
        if (err)
            res.send(err);

        for (var i = 0; i < tags.length; ++i) {
            for (var j = 0; j < tags[i].posts.length; ++j) {
                results.add(tags[i].posts[j]);
                console.log('Posts to add' + tags[i].posts[j]);
            }
        }
        Post.find({'_id': {'$in' : Array.from(results)}}, null, {sort: {created_time: 1}},
            function (err, posts) {
                if (err) {
                    res.send(err);
                }
                res.json(posts);
            });
    });
    
};



