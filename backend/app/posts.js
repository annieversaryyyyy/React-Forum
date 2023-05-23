const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

const auth = require('../middleware/auth');
const image = require('../middleware/image');


router.post('/', [auth, image.single('image')], async (req, res) => {

    try {
        if (!req.body.description && !req.file) {
            return res.status(400).send({error: 'Data not valid!'});
        }
        const postData = {
            author: req.user._id,
            title: req.body.title,
            description: req.body.description || null,
            image: null,
            datetime: new Date().toISOString(),
        };
        if (req.file) {
            postData.image = '/images/' + req.file.filename;
        }

        const post = new Post(postData);
        await post.save();
        res.send(post);

    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/', async (req, res) => {
    try {

        const post = await Post
            .find()
            .populate('author','username')
            .sort({datetime: -1});

        res.send(post);

    } catch (e) {

        res.status(500).send(e);

    }
});

router.get('/:id', async (req, res) => {
    try{

        const post = await Post
            .findById(req.params.id)
            .populate('author','username');

        if (!post) {
            res.status(404).send({message: 'Post not found!'});
        }

        res.send(post);

    } catch (e) {

        res.sendStatus(500);
    }
});

module.exports = router;