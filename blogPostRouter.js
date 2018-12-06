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


// GET
router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});



// POST

// DELETE

// PUT






module.exports = router;