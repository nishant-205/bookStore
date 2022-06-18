const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    rating : {
        type: Number,
    },
    comment : {
        type: String,
    },
    title : {
        type: String,
    },
    date : {
        type: Date,
        default: Date.now
    },
    userID : {
        type: mongoose.Types.ObjectId,
    },
    userName: {
        type: String,
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;