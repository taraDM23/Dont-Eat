//Api URL = http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
//Api key = b15f97422ba66d215ee17499ebc5b83b
//api.openweathermap.org/data/2.5/weather?q=London

var APIKEY = "AIzaSyC2oUjR2yrGCAnp3Hdor_NFVpNfCUyVUAE"; //google maps api

// var queryURL = "https:maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=" + APIKEY;

var queryURL = "https:maps.googleapis.com/maps/api/geocode/json?address=17+avatar+way,+officer,+melbourne&key=" + APIKEY;



$.ajax({
    url: queryURL,
    method: "Get"
  })
  .then(function(response){
    console.log(queryURL);

    console.log(response);

    console.log(response.results[0].geometry.location);
  

  });

  