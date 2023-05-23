const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Comment = require("../models/Comment");

router.get('/', async(req, res) => {
    const { post } = req.query;

    try {
        const comments = post ? await Comment.find({ post }) : await Comment.find();
        res.send(comments);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/', auth,async (req, res) => {
    try{
        const commentsData = {
            user: req.user._id,
            description: req.body.description,
            post: req.body.post
        };

        if (!req.body.description) {
            return res.status(400).send({error: 'Data not valid'});
        }

        const comments = new Comment(commentsData);
        await comments.save();
        res.send(comments);
    } catch(error) {
        res.status(500).send({error: error.message});
    }
});

module.exports = router;