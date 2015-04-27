// dependencies
var express   = require('express');

// setup
var app = express();

// set port
app.set('port', process.env.PORT || 1337);

var server = app.listen(app.get('port'), function() {
  console.log('json2csv listening on port ' + server.address().port);
});