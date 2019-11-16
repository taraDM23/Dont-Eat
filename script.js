//Api URL = http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
//Api key = b15f97422ba66d215ee17499ebc5b83b
//api.openweathermap.org/data/2.5/weather?q=London

var APIKEY = "AIzaSyC2oUjR2yrGCAnp3Hdor_NFVpNfCUyVUAE"; //google maps api

// var queryURL = "https:maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=" + APIKEY;

//this url is using my own address, you can change this is you want or not
var queryURL = "https:maps.googleapis.com/maps/api/geocode/json?address=17+avatar+way,+officer,+melbourne&key=" + APIKEY;



$.ajax({
    url: queryURL,
    method: "Get"
  })
  .then(function(response){
    console.log(queryURL);

    console.log(response);

    //this is the pathway to get to the lat and long
    console.log(response.results[0].geometry.location);
    
    initMap(response)
  });

  function initMap(response) {
    // The location of Uluru
    console.log(response)
   // var uluru = {lat: -25.344, lng: 131.036};
    var cor = (response.results[0].geometry.location);
   // var lat = (response.results[0].geometry.location.lat)
   // var lng = (response.results[0].geometry.location.lng) 

    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 6, center: cor});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: cor, map: map});
  }

//   // Initialize and add the map
// function initMap() {
//   // The location of Uluru
//   var uluru = {lat: -25.344, lng: 131.036};
//   // The map, centered at Uluru
//   var map = new google.maps.Map(
//       document.getElementById('map'), {zoom: 4, center: uluru});
//   // The marker, positioned at Uluru
//   var marker = new google.maps.Marker({position: uluru, map: map});
// }

  