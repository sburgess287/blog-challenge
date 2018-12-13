const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");

// Use expect style syntax 
const expect = chai.expect;

// Use chai HTTP requests
chai.use(chaiHttp);

describe("blogPosts", function() {
    // Run server to start server for tests
    // Return promise to ensure server is running before tests
    before(function() {
        return runServer();
    })

    // Close/Stop server after tests complete to avoid errors
    // if other tests are run
    after(function() {
        return closeServer();
    });

    // Test Strategy
    // 1. Make requests to '/blog-posts'
    // 2. Inspect response object for code and keys

    // Test GET endpoint
    it("should list blog post items on GET", function() {
        return chai
            .request(app)
            .get("/blog-posts")
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.a("array");

                // 2 blog posts return on app load
                expect(res.body.length).to.be.at.least(1);

                // Set expected keys
                const expectedKeys = ["id", "title", "content", "author", "publishDate"];

                // each item is object with key/value pairs
                res.body.forEach(function(item) {
                    expect(item).to.be.a("object");
                    expect(item).to.include.keys(expectedKeys);
                });
            });    
    });

    // Test POST endpoint
    // 1. Make Post request with data for new item
    // 2. Inspect response object and prove it has correct status and an id
    it("should add blog post item on POST", function() {
        const newItem = {
            "title": "Quantum Computing Made Easy", 
            "content": ["Excepteur sint occaecat cupidatat non proident"],
            "author": "Joe Smith",
            "publishDate": "8/17/18"
        };

        return chai
            .request(app)
            .post("/blog-posts")
            .send(newItem)
            .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.a("object");
                expect(res.body).to.include.keys("id", "title", "content", "author", "publishDate");
                expect(res.body.id).to.not.equal(null);
                // question on this same as on shopping list question
                expect(res.body).to.deep.equal(
                    Object.assign(newItem, { id: res.body.id })
                );
            });

    });

});