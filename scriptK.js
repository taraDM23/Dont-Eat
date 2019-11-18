var APIKEY = "AIzaSyC2oUjR2yrGCAnp3Hdor_NFVpNfCUyVUAE"; //google maps api

var queryURL = "https:maps.googleapis.com/maps/api/geocode/json?address=new+york&key=" + APIKEY;


$.ajax({
    url: queryURL,
    method: "Get"
  })
  .then(function(response){
   // console.log(queryURL);

    console.log(response);

    //this is the pathway to get to the lat and long
    console.log(response.results[0].geometry.location);
    
    initMap(response)
  });


  function initMap(response) {
    console.log(response);
   //var cord = {lat: 40.7803833333, lng: -73.9530416667} //new york
    var coord = {lat:40.7055210000 , lng:-74.0069060000 }
    var coord2 = {lat:40.7355210000 , lng:-74.1069060000 }
    
    //use for in loop
    // var cordObj = { "40.7055210000": "-74.0069060000", 
    //               "40.7173833333": "-73.9943916667"}
    
    var coordArr = [
      coord,
      coord2
    ];
    
    //var cor = (response.results[0].geometry.location);

    // The map, will be centered around the lat and lng
    var map = new google.maps.Map(
        document.getElementById("map"), {zoom: 6, center: coord});
    for (let i = 0; i < coordArr.length; i++) {
      const coord = coordArr[i];
      new google.maps.Marker({position: coord, map: map});
      console.log("inside for so no issue")

    }
    //var marker2 = new google.maps.Marker({position: cord2, map: map});
  }


  