const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exitHook = require('async-exit-hook');
const config = require('./config');

const users = require('./app/users');
const posts = require('./app/posts');
const comments = require('./app/comments');

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/users', users);
app.use('/posts', posts);
app.use('/comments', comments);

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
        console.log(`DB OK!`);
    });

    exitHook(() => {
        mongoose.disconnect();
        console.log('Mongoose disconnect');
    });
};

run().catch(e => console.error(e));