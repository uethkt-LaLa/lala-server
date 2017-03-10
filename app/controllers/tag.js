var Tag = require('../models/tag');
var Post = require('../models/post');

exports.postTags = function(req, res) {
    var tag = new Tag(req.body);
    tag.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: "New tag was created!", data: tag });
    });
};

exports.getTags = function(req, res) {
    Tag.find(function(err, tags) {
        if (err) {
            res.send(err);
        }
        res.json(tags);
    });
};

exports.getTag = function(req, res) {
    Tag.findById(req.params.tag_id, function(err, tag) {
        if (err)
            res.send(err);
        res.json(tag);
    });
};

exports.putTag = function(req, res) {
    Tag.update({ _id: req.params.tag_id }, req.body,
        function(err, tag) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Tag updated!' });
        });
};

exports.deleteTag = function(req, res) {
    Tag.remove({
        _id: req.params.tag_id
    }, function(err, tag) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted tag' });
    });
};

exports.addFollower = function(req, res) {
    Tag.findByIdAndUpdate(
        req.params.tag_id, { $addToSet: { "followers": req.user._id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Follower for post added!' });
        }
    );
};

exports.removeFollower = function(req, res) {
    Tag.findByIdAndUpdate(
        req.params.tag_id, { $pull: { "followers": req.user._id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Follower for post removed!' });
        }
    );
};

exports.addPostToTag = function(req, res) {
    Tag.findByIdAndUpdate(
        req.params.tag_id, { $addToSet: { "posts": req.params.post_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Post for tag added!' });
        }
    );
};

exports.removePostFromTag = function(req, res) {
    Tag.findByIdAndUpdate(
        req.params.tag_id, { $pull: { "posts": req.params.post_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Post for tag removed!' });
        }
    );
};

exports.getAllPosts = function (req, res) {
    Tag.findById(req.params.tag_id, function(err, tag) {
        if (err)
            res.send(err);
        Post.find({'_id': {'$in' : tag.posts}}, function (err, posts) {
            if (err)
                res.send(err);
            res.json(posts);
        });
    });
}