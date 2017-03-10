var Post = require('../models/post');

exports.postPosts = function(req, res) {
    var post = new Post(req.body);

    post.userId = req.user._id;
    post.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: "New post was created!", data: post });
    });
};

exports.getPosts = function(req, res) {
    Post.find(function(err, posts) {
        if (err) {
            res.send(err);
        }
        res.json(posts);
    });
};

exports.getPost = function(req, res) {
    Post.findById(req.params.post_id, function(err, post) {
        if (err)
            res.send(err);
        res.json(post);
    });
};

exports.putPost = function(req, res) {
    Post.update({ _id: req.params.post_id }, req.body,
        function(err, post) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Post updated!' });
        });
};

exports.deletePost = function(req, res) {
    Post.remove({
        _id: req.params.post_id
    }, function(err, post) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
};


exports.addFollower = function(req, res) {
    Post.findByIdAndUpdate(
        req.params.post_id, { $addToSet: { "followers": req.user._id } }, { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Follower for post added!' });
        }
    );
};

exports.removeFollower = function(req, res) {
    Post.findByIdAndUpdate(
        req.params.post_id, { $pull: { "followers": req.user._id } }, { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Follower for post removed!' });
        }
    );
};

exports.addCommentToPost = function(req, res) {
    Post.findByIdAndUpdate(
        req.params.post_id, { $addToSet: { "comments": req.params.comment_id } }, { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Comment for post added!' });
        }
    );
};

exports.removeCommentFromPost = function(req, res) {
    Post.findByIdAndUpdate(
        req.params.post_id, { $pull: { "comments": req.params.comment_id } }, { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Comment for post removed!' });
        }
    );
};

exports.addTagToPost = function(req, res) {
    Post.findByIdAndUpdate(
        req.params.post_id, { $addToSet: { "tags": req.params.tag_id } }, { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Tag for post added!' });
        }
    );
};

exports.removeTagFromPost = function(req, res) {
    Post.findByIdAndUpdate(
        req.params.post_id, { $pull: { "tags": req.params.tag_id } }, { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Tag for post removed!' });
        }
    );
};

exports.getPostsFromCategory = function(req, res) {
    Post.find({ categoryId: req.params.category_id }, function(err, posts) {
        if (err) {
            res.send(err);
        }
        res.json(posts);
    });
};

exports.postPostsToCategory = function(req, res) {
    var post = new Post(req.body);
    post.categoryId = req.params.category_id;
    post.userId = req.user._id;

    post.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: "Post added to the category!", data: post });
    });
};

exports.getPostsByUser = function(req, res) {
    Post.find({ userId: req.params.user_id }, function(err, posts) {
        if (err) {
            res.send(err);
        }
        res.json(posts);
    });
};

exports.getPostsByMe = function(req, res) {
    Post.find({ userId: req.user._id }, function(err, posts) {
        if (err) {
            res.send(err);
        }
        res.json(posts);
    });
};

