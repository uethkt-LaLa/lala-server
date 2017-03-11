var Comment = require('../models/comment');

exports.postCommentsToPost = function(req, res) {
    var comment = new Comment(req.body);

    comment.userId = req.user._id;
    comment.postId = req.params.post_id;
    comment.userName = req.user.display_name;
    comment.userAvatar = req.user.image_url;
    comment.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: "New comment was created!", data: comment });
    });
};

exports.getCommentsFromPost = function(req, res) {
    Comment.find({ postId: req.params.post_id }, 
        null, {sort: {created_time: 1}}, 
        function (err, comments) {
            if (err) {
                res.send(err);
            }
            res.json(comments);
    });
};

exports.getAllComments = function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
};

exports.getCommentsByMe = function(req, res) {
    Comment.find({ userId: req.user._id }, function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
};



exports.getComment = function(req, res) {
    Comment.findById(req.params.comment_id, function(err, comment) {
        if (err)
            res.send(err);
        res.json(comment);
    });
};


exports.putComment = function(req, res) {
    Comment.update({ _id: req.params.comment_id }, req.body,
        function(err, comment) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Comment updated!' });
        });
};

exports.likeComment = function(req, res) {
    Comment.findByIdAndUpdate(
        req.params.comment_id, { $addToSet: { "likes": req.user._id } }, { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Liker for comment added!' });
        }
    );
};

exports.unlikeComment = function(req, res) {
    Comment.findByIdAndUpdate(
        req.params.comment_id, { $pull: { "likes": req.user._id } }, { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Liker for comment removed!' });
        }
    );
};

exports.dislikeComment = function(req, res) {
    Comment.findByIdAndUpdate(
        req.params.comment_id, { $addToSet: { "dislikes": req.user._id } }, { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Disliker for comment added!' });
        }
    );
};

exports.undislikeComment = function(req, res) {
    Comment.findByIdAndUpdate(
        req.params.comment_id, { $pull: { "dislikes": req.user._id } }, { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Disliker for comment removed!' });
        }
    );
};

exports.deleteComment = function(req, res) {
    Comment.remove({
        _id: req.params.comment_id
    }, function(err, comment) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
};

