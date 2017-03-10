var Category = require('../models/category');

exports.postCategories = function(req, res) {
    var category = new Category(req.body);
    category.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: "New category was created!", data: category });
    });
};

exports.getCategories = function(req, res) {
    Category.find(function(err, categories) {
        if (err) {
            res.send(err);
        }
        res.json(categories);
    });
};

exports.getCategory = function(req, res) {
    Category.findById(req.params.category_id, function(err, category) {
        if (err)
            res.send(err);
        res.json(category);
    });
};

exports.putCategory = function(req, res) {
    Category.update({ _id: req.params.category_id }, req.body,
        function(err, category) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Category updated!' });
        });
};

exports.deleteCategory = function(req, res) {
    Category.remove({
        _id: req.params.category_id
    }, function(err, category) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
};

exports.addFollower = function(req, res) {
    Category.findByIdAndUpdate(
        req.params.category_id, { $addToSet: { "followers": req.user._id } }, 
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
    Category.findByIdAndUpdate(
        req.params.category_id, { $pull: { "followers": req.user._id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Follower for post removed!' });
        }
    );
};

exports.addPostToCategory = function(req, res) {
    Category.findByIdAndUpdate(
        req.params.category_id, { $addToSet: { "posts": req.params.post_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Post for category added!' });
        }
    );
};

exports.removePostFromCategory = function(req, res) {
    Category.findByIdAndUpdate(
        req.params.category_id, { $pull: { "posts": req.params.post_id } }, 
        { safe: true, upsert: true },
        function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Post for category removed!' });
        }
    );
};
