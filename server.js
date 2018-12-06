const express = require('express');

const app = express();

const blogPostRouter = require('./blogPostRouter');

app.use(express.static('public'));

// when requests come into /blogpost, route
// them to express router instances.

app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});