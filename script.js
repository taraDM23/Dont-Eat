var APIKEY = "AIzaSyC2oUjR2yrGCAnp3Hdor_NFVpNfCUyVUAE"; //google maps api

//this url is using my own address, you can change this is you want or not
var queryURL = "https:maps.googleapis.com/maps/api/geocode/json?address=new+york&key=" + APIKEY;

//var queryURL = "https:maps.googleapis.com/maps/api/geocode/json?address=17+avatar+way,+officer,+melbourne&key=" + APIKEY;


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
   //var cord = {lat: 40.7803833333, lng: -73.9530416667} //new york
    var cord = {lat:40.7055210000 , lng:-74.0069060000 }
    var cord2 = {lat:40.7355210000 , lng:-74.1069060000 }

    //var cor = (response.results[0].geometry.location);

    // The map, will be centered around the lat and lng
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 6, center: cord});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: cord, map: map});
    var marker2 = new google.maps.Marker({position: cord2, map: map});
  }


  