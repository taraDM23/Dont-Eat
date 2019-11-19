// ==================== global variables ====================
let cuisinesObj = {};
let cuisineId;

var cuisineInput;
var cuisineInputFormatted;

var cityInput = $("#input-city").val().trim();
let searchCity = "New York" // hard coded for now

var lat;
var lon;

// ==================== functions ====================
function RenderOutput() {
  cuisineInput = $("#input-cuisine").val().trim().toLowerCase();
  cuisineInputFormatted = cuisineInput.charAt(0).toUpperCase() + cuisineInput.slice(1);

  // ==================== city API ====================
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

    lat = response.location_suggestions[0].latitude;
    lon = response.location_suggestions[0].longitude;

    console.log(lat + " & " + lon);

    // ==================== cuisines API ====================
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
      let {cuisines} = response;
      
      for(let i = 0; i < cuisines.length; i++) {
        cuisinesObj[cuisines[i].cuisine.cuisine_name] = cuisines[i].cuisine.cuisine_id;
      };

      console.log({cuisinesObj});

      if (!cuisinesObj[cuisineInputFormatted]) {
        alert("Sorry, " + cuisineInputFormatted + " food is not available in your area. Please search for something else");
        return;
      }

      cuisineId = parseInt(cuisinesObj[cuisineInputFormatted]);
      console.log({cuisineId});

      // ==================== search API ====================
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
          const photos = "https://via.placeholder.com/100";
            
          // ==================== display results ====================
            let resDiv = $("<div/>", {"class": "restaurant"}).append(restaurant);
            resultsDiv.append(resDiv);

            let addDiv = $("<div/>", {"class": "address"}).append(address);
            resultsDiv.append(addDiv);

            let ratDiv = $("<div/>", {"class": "rating"}).append(rating + " - " + ratingText);
            resultsDiv.append(ratDiv);
            
            
            let img = $("<img>").attr("src", photos);
            let imgDiv = $("<div/>", {"class": "img"}).append(img);
            resultsDiv.append(imgDiv);
          
        };
    
        $("div.results-box").append(resultsDiv);
    
      }) 
    
    })
    
  })

};

// ==================== event listeners ====================
$("#button-search").on("click", RenderOutput);