var Comment = require('../models/comment');

exports.postCommentsToPost = function(req, res) {
    var comment = new Comment(req.body);

    comment.userId = req.user._id;
    comment.postId = req.params.post_id;
    comment.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: "New comment was created!", data: comment });
    });
};

exports.getCommentsFromPost = function(req, res) {
    Comment.find({ postId: req.params.post_id }, function(err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
};

exports.getAllComments = function(req, res) {
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

exports.deleteComment = function(req, res) {
    Comment.remove({
        _id: req.params.comment_id
    }, function(err, comment) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
};

