const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    description:{
        type: String,
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    }
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;