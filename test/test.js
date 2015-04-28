var chai = require('chai');
var expect = require("chai").expect;
var chaiHttp = require('chai-http');

var app = require("../app.js");
var json2csv = require("../lib/routes/json2csv.js");
var csv2json = require("../lib/routes/csv2json.js");

chai.use(chaiHttp);

describe("Converting JSON to CSV", function() {

  describe("/json2csv", function() {

    it("should give a 400 code for empty POST requests", function(done) {
      chai.request(app)
        .post('/api/v1/json2csv')
        .send({})
        .end(function(err, res) {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("should have a content type of text/csv & charset of utf-8", function(done) {
      chai.request(app)
        .post('/api/v1/json2csv')
        .send([{
          "name": "Adam",
          "lastName": "Smith",
          "gender": "male",
          "country": "Scotland"
        }, {
          "name": "George",
          "lastName": "Washington",
          "gender": "male",
          "country": "USA"
        }, {
          "name": "Marie",
          "lastName": "Curie",
          "gender": "female",
          "country": "France"
        }])
        .end(function(err, res) {
          expect(res).to.have.header('content-type', 'text/csv; charset=utf-8');
          done();
        });
    });

    it("should convert JSON to CSV", function(done) {
      chai.request(app)
        .post('/api/v1/json2csv')
        .send([{
          "name": "Adam",
          "lastName": "Smith",
          "gender": "male",
          "country": "Scotland"
        }, {
          "name": "George",
          "lastName": "Washington",
          "gender": "male",
          "country": "USA"
        }, {
          "name": "Marie",
          "lastName": "Curie",
          "gender": "female",
          "country": "France"
        }])
        .end(function(err, res) {
          // console.log(res);
          expect(res).to.have.status(200);
          var csv = 'name,lastName,gender,country\n' +
                    'Adam,Smith,male,Scotland\n' +
                    'George,Washington,male,USA\n' +
                    'Marie,Curie,female,France\n';
          expect(res.text).to.equal(csv);
          done();
        });
    });

  });

});

describe("Converting CSV to JSON", function() {

  describe("/csv2json", function() {

    it("should give a 400 code for empty POST requests", function(done) {
      chai.request(app)
        .post('/api/v1/csv2json')
        .send({})
        .end(function(err, res) {
          expect(res).to.have.status(400);
          done();
        });
    });

    it("should have a content type of appliation/json & charset of utf-8", function(done) {
      chai.request(app)
        .post('/api/v1/csv2json')
        .send(['name,lastName,gender,country\n' +
               'Adam,Smith,male,Scotland\n' +
               'George,Washington,male,USA\n' +
               'Marie,Curie,female,France\n'])
        .end(function(err, res) {
          expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
          done();
        });
    });

    it("should convert CSV to JSON", function(done) {
      chai.request(app)
        .post('/api/v1/csv2json')
        .send(['name,lastName,gender,country\n' +
                    'Adam,Smith,male,Scotland\n' +
                    'George,Washington,male,USA\n' +
                    'Marie,Curie,female,France\n'])
        .end(function(err, res) {
          // console.log(res);
          expect(res).to.have.status(200);
          var json = [{
            "name": "Adam",
            "lastName": "Smith",
            "gender": "male",
            "country": "Scotland"
          }, {
            "name": "George",
            "lastName": "Washington",
            "gender": "male",
            "country": "USA"
          }, {
            "name": "Marie",
            "lastName": "Curie",
            "gender": "female",
            "country": "France"
          }];
          // stringify for testing purposes
          expect(JSON.stringify(res.body)).to.equal(JSON.stringify(json));
          done();
        });
    });

  });

});
