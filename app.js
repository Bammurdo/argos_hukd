var express = require('express');
var app = express();
var request = require('request');

var port = 8080;

app.set('view engine', 'jade');
app.locals.pretty = true; // for pretty html ^-^
app.use(express.static(__dirname + '/public')); // allows js (jquery/api_caller) to be passed directly

// routes
app.get('/', function(req, res) {
  res.render('home.jade');
});
app.post('/', function(req, res) {
  // user wants the top ten!
  var api_host = "http://api.hotukdeals.com";
  var api_path = "/rest_api/v2/";
  var api_path_opt = "?key=120e5aac30f8e92a6b33d858fdbdeb66&merchant=argos&results_per_page=10&page=1&output=json";
  request(api_host + api_path + api_path_opt, function (err, api_res, body) {
    if (!err && api_res.statusCode == 200) {
      res.send(JSON.parse(body));
    }
  });
});

app.listen(port, function() {
  console.log('Server started on port: ' + port);
});
