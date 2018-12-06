const express = require('express');
const morgan = require('morgan');

const app = express();

const blogPostRouter = require('./blogPostRouter');
 
// log the http layer
app.use(morgan('common'));

app.use(express.static('public'));

// when requests come into /blogpost, route
// them to express router instances.

app.use('/blogPostNameTBD', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});