// Create web server

var express = require('express');
var router = express.Router();

// Get all comments
router.get('/', function(req, res) {
    var db = req.db;
    db.collection('comments').find().toArray(function (err, items) {
        res.json(items);
    });
});

// Get a specific comment
router.get('/:id', function(req, res) {
    var db = req.db;
    var commentToGet = req.params.id;
    db.collection('comments').findOne({ '_id' : commentToGet }, function (err, item) {
        res.json(item);
    });
});

// Add a new comment
router.post('/', function(req, res) {
    var db = req.db;
    db.collection('comments').insert(req.body, function(err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

// Update a comment
router.put('/:id', function(req, res) {
    var db = req.db;
    var commentToUpdate = req.params.id;
    db.collection('comments').update({ '_id' : commentToUpdate }, req.body, function(err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

// Delete a comment
router.delete('/:id', function(req, res) {
    var db = req.db;
    var commentToDelete = req.params.id;
    db.collection('comments').remove({ '_id' : commentToDelete }, function(err, result) {
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
