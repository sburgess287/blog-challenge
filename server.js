const express = require('express');
const morgan = require("morgan");

const app = express();
app.use(express.json());

const blogPostRouter = require('./blogPostRouter');

// log the http layer
app.use(morgan("common"));

app.use(express.static('public'));

// if I want to create, serve html file
// otherwise go to Heroku : fast-journey
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/views/index.html");
// });

// when requests come into /blogpost, route
// them to express router instances.
app.use('/blog-posts', blogPostRouter);

// Declare server to be used for runServer and closeServer.
let server;

// Start the server and return a promise.
function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
        server = app
            .listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve(server);
            })
            .on("error", err => {
                reject(err);
            });
    });
}

// Close server and return a promise.
function closeServer() {
    return new Promise((resolve, reject) => {
        console.log("Closing server");
        server.close(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

// If server.js is called directly, this block runs
if (require.main === module) {
    runServer().catch(err => console.error(err));
}


// app.listen(process.env.PORT || 8080, () => {
//     console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
// });

module.exports = { app, runServer, closeServer};