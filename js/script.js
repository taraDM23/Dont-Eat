//On click event that runs dashboard
$("#button-search").on("click", function RenderOutput(event) {
  // prevent form default activity
  event.preventDefault();

  // get cuisine input from HTML
  var cuisineInput = $("#input-cuisine").val();

  // define lat & long global variables
  var lat;
  var lon;

  // API call to get city details
  let searchCity = "New York"
  let cityURL = `https://developers.zomato.com/api/v2.1/locations?query=${searchCity}`;

  $.ajax({
    url: cityURL,
    method: "GET",
    headers: {
      "Accept": "application/json",
      "user-key": "911458285a16e49504124550033c5a36"
    }
  })
  .then(function(response) {

    let cityName = response.location_suggestions[0].city_name;
    let cityCountry = response.location_suggestions[0].country_name;

    let city = (cityName + ", " + cityCountry);
    console.log({city}); 

    let lat = response.location_suggestions[0].latitude;
    let lon = response.location_suggestions[0].longitude;

    console.log(lat + " & " + lon);

  
  
    // API call to list cuisines
    let cuisineURL = `https://developers.zomato.com/api/v2.1/cuisines?lat=${lat}&lon=${lon}`;

    $.ajax({
      url: cuisineURL,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "user-key": "911458285a16e49504124550033c5a36"
      }
    })
    .then(function(response) {
      let cuisines = response.cuisines;

      // convert cuisines array into object
      // object has cuisine_name and cuisine_id
      let cuisinesObj = {};
      for(let i = 0; i < cuisines.length; i++) {
        cuisinesObj[cuisines[i].cuisine.cuisine_name] = cuisines[i].cuisine.cuisine_id;
      };

      //console.log({cuisinesObj});
    })

    // run main search API
    let cuisineId = 3;

    let searchURL = `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lon}&cuisines=${cuisineId}&sort=rating&order=asc`;
  
    

    $.ajax({
      url: searchURL,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "user-key": "911458285a16e49504124550033c5a36"
      }
    })
    .then(function(response) {
      const restaurantArray = response.restaurants;
      //console.log(restaurantArray);

      let latLonObj = {}
      for(let i = 0; i < restaurantArray.length; i++) {
        let lat = restaurantArray[i].restaurant.location.latitude;
        let lon = restaurantArray[i].restaurant.location.longitude;

        latLonObj[lat] = lon;
      }
      //console.log(latLonObj);

      let resultsDiv = $("<div>");
      let restaurantLocation = [];
      for(let i = 0; i < restaurantArray.length; i++) {

        const restaurantData = restaurantArray[i].restaurant
        const restaurant = restaurantData.name;
        const address = restaurantData.location.address;
        const rating = restaurantData.user_rating.aggregate_rating;
        const ratingText = restaurantData.user_rating.rating_text;

        const {
          restaurant: {
            location: {
              latitude,
              longitude,
            }
          }
        } = restaurantArray[i];

        restaurantLocation.push(
          {
            name: restaurant,
            lat: latitude,
            lng: longitude
          }
        );  
        

        const photos = "https://via.placeholder.com/200";
        
        resultsDiv.append(restaurant);
        resultsDiv.append(address);
        resultsDiv.append(rating);
        resultsDiv.append(ratingText);
        let img = $("<img>").attr("src", photos);
        resultsDiv.append(img);
      };
      console.log(restaurantLocation);

      

      $("div.results-box").append(resultsDiv);
        
      //here
    })
  })
  var APIKEY = "AIzaSyC2oUjR2yrGCAnp3Hdor_NFVpNfCUyVUAE"; //google maps api

  var queryURL = "https:maps.googleapis.com/maps/api/geocode/json?address=new+york&key=" + APIKEY;
  //console.log(restaurantLocation);


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


    function initMap(response){
      console.log(response);

      //Add for in loop to add all the 20 restuarants markers on map
      

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


});



