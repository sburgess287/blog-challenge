const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");

// Use expect style syntax 
const expect = chai.expect;

// Use chai HTTP requests
chai.use(chaiHttp);