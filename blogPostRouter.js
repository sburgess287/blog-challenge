const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./model');

// Add Blog Posts here to get data
BlogPosts.create(
    'How to Paint a House', 
    ['Class aptent taciti sociosqu ad litora torquent'], 
    'Garfield Huxley', 
    '8/12/97'
);

BlogPosts.create(
    'How to Bake a Cake', 
    ['Mauris condimentum, purus vel euismod bibendum, ipsum arcu pellentesque nunc'], 
    'Juniper Jones', 
    '9/12/15'
);


// GET endpoint
router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});


// POST endpoint: remember to add content type/application/json 
// and also the raw json object in the Body
router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'publishDate'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(item);
});

// DELETE




// PUT






module.exports = router;