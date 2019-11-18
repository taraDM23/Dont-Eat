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

      console.log({cuisinesObj});
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
      console.log(restaurantArray);

      let latLonObj = {}
      for(let i = 0; i < restaurantArray.length; i++) {
        let lat = restaurantArray[i].restaurant.location.latitude;
        let lon = restaurantArray[i].restaurant.location.longitude;

        latLonObj[lat] = lon;
      }
      console.log(latLonObj);

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
            long: longitude
          }
        );  
        


        // const photosArray = restaurantData.photos;
        // let photos = [];
        
        // if(photosArray) {
        //   for(let i = 0; i < photosArray.length; i++) {
        //     photos.push(photosArray[i].photo.thumb_url);
        //   };
        // } else {
        //   photos.push("https://via.placeholder.com/200");
        // }
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
});

