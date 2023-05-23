const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/images'),
    mongo: {
        db: 'mongodb://localhost/homework-88',
        options: {useNewUrlParser: true},
    }
};