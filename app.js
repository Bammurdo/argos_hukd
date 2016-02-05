var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

var port = 8080;  // port for app

app.set('view engine', 'jade');
app.locals.pretty = true; // for pretty html ^-^
app.use(express.static(__dirname + '/public')); // allows js (jquery/api_caller) to be passed directly
// parse application/json
app.use(bodyParser.json());

// routes
app.get('/', function(req, res) {
  // when you just go to http://localhost:8080
  // we just need to render the webpage
  res.render('home.jade');
});
app.post('/', function(req, res) {
  // user has sent a post request, which we are just going to assume is for
  // the top 10 lastest deals at Argos

  // first, get deals from HUKDs
  callHUKDapi(function(hukd_deals){
    // pass the deals to the fake api to get some 'competition' prices
    callFakeApi(hukd_deals, function(fake_api_deals){
      // Get price difference between fake_api & argos

      var hukd_items = hukd_deals.deals.items;  // skip straight to the items array
      var fapi_items = fake_api_deals.items;
      for(var i=0;i<hukd_items.length;i++){
        var diff = 0;
        // Don't do maths with decimals in javascript ... especially when talking about money
        var hukPrice = hukd_items[i].price;  // HUKD price, as string
        if (!(isNaN(hukPrice) || hukPrice === null)){
          // if the hotukdeals is a valid price - find out the difference
          hukPrice = Math.floor(parseFloat(hukPrice) * 100);
          fpiPrice = Math.floor(parseFloat(fapi_items[i].ourPrice) * 100);
          diff = fpiPrice - hukPrice;
          var diff = fpiPrice - hukPrice;
        }
        hukd_items[i].diffInPrice = diff / 100;
      }
      // send all the deal information, along with the price differences to the website
      res.send(hukd_deals);
    });
  });

});

function callHUKDapi(callback){
  var api_host = "http://api.hotukdeals.com";
  var api_path = "/rest_api/v2/";
  var api_path_opt = "?key=120e5aac30f8e92a6b33d858fdbdeb66&merchant=argos&results_per_page=10&page=1&output=json";
  request(api_host + api_path + api_path_opt, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      // send JSON of deals to our callback
      callback(JSON.parse(body));
      // hukd returns an object in the form:
      // {'deals': items[{~deal information~}]}
    }
  });
}

function callFakeApi(hukd_deals, callback){
  // hukd_deals is a json obj that has a lot of information the fake api doesn't need
  var hukd_items = hukd_deals.deals.items;  // skip to the items array
  var fake_api_req = { "items":[]};
  // Lets build the request to our fake api
  // for each item in the deal list...
  for(var i=0;i<hukd_items.length;i++){
    fake_api_req.items[i] = {'product_name': hukd_items[i].title, 'price': hukd_items[i].price};
  }

  request({
    url: 'http://localhost:8181',
    method: 'POST',
    json: fake_api_req
  }, function (err, status, body) {
    if (!err && status.statusCode == 200) {
      callback(body);
    }
  });
}

app.listen(port, function() {
  console.log('Server started on port: ' + port);
});
