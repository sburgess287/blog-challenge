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
    'How to Bake a Cake Today', 
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
    // verify all required fields are present in the request or return error
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

// DELETE: remember to do GET
// Then add ID to the endpoint
router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted Blog Post ${req.params.id}`);
    res.status(204).end();
});


// PUT endpoint: Get ID and put into request and endpoint url
router.put('/:id', jsonParser, (req, res) => {
    // verify all required fields are present in the request or return error
    const requiredFields = ["id","title", "content", "author", "publishDate"];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing ${field} in request body`;
            console.error(message);
            return res.status(400).send(message);
        }
    }
   // does this id exist within the blog posts?
    if (!(req.params.id))  {
        const message = `Request path id(${req.params.id}) is required`
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating blogPost ${req.params.id}`);
    BlogPosts.update({
        id: req.body.id,
        title: req.body.title, 
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    });
    res.status(204).end();
});





module.exports = router;