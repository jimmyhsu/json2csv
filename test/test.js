// var expect = require("chai").expect;
var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require("../app.js");
var json2csv = require("../lib/routes/json2csv.js");
var csv2json = require("../lib/routes/csv2json.js");

chai.use(chaiHttp);

describe("Converting JSON to CSV", function() {
  describe("/json2csv", function() {
    it("should give a 400 code for empty POST requests", function() {
      chai.request(app)
        .post('/user/me')
        .send({})
        .end(function (err, res) {
           expect(err).to.have.status(400);
        });
    });
    it("should convert JSON to CSV", function() {

    });
  });
});

describe("Converting CSV to JSON", function() {
  describe("/csv2json", function() {
    it("should convert CSV to JSON", function() {

    });
  });
});
