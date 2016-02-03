// Simple http request in node
// Intructions if you check out this point:

// open cmd
// cd to project
// node task1
// example output: screenshots/SS1

var http = require( "http");

var api_host = "api.hotukdeals.com";
var api_port = "80";
var api_path = "/rest_api/v2/";
var api_path_options = "?key=120e5aac30f8e92a6b33d858fdbdeb66&merchant=argos&results_per_page=10&page=1&output=json";

var options = {
  host: api_host,
  port: 80,
  path: api_path + api_path_options
}

callback = function(res) {
  var str = ""; // Store all the chunks in here

  res.on('data', function(chunk) {
    // next chuck recieved
    str += chunk;
  });
  //the whole res has been recieved, so we just print it out here
  res.on('end', function() {
    // str now contains the entire response from HUKD
    // but it is a string, not a json obj
    var resJSON = JSON.parse(str);
    // for each item: Get the title of the item, and display it:
    for (var i=0;i<10;i++)
      console.log("deal " + (i+1) + "\t" + resJSON.deals.items[i].title);

    // all the details are in the JSONobj, so I can grab any piece of info, as needed
  });
}

// send a get request, with our options & callback
// callback could be anon - but, clarity... I guess
http.get(options, callback).end();
