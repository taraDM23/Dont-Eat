// ==================== global variables ====================
let cuisinesObj = {};
let cuisineId;

var cuisineInput;
var cuisineInputFormatted;

var cityInput = $("#input-city").val().trim();
let searchCity = "New York" // hard coded for now

var lat;
var lon;

var map;

// ==================== functions ====================
function RenderOutput() {
  cuisineInput = $("#input-cuisine").val().trim().toLowerCase();
  cuisineInputFormatted = cuisineInput.charAt(0).toUpperCase() + cuisineInput.slice(1);

  // ==================== Zomato city API ====================
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

    // ==================== Zomato cuisines API ====================
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
        var errorMsg = ("    \n   Oops! we cant find  " + cuisineInputFormatted + ". \n Please try again.     \n");
        noty({
        type: 'alert', 
        layout: 'topCenter',
        theme: 'relax', 
        text:(errorMsg),
        timeout: false,
        maxVisible: 1, 
        closeWith: ['click'],
        killer: false,
        })
        
        return;
      }

      cuisineId = parseInt(cuisinesObj[cuisineInputFormatted]);
      console.log({cuisineId});

      // ==================== Zomato search API ====================
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
    
        let restaurantLocation = [];
        for(let i = 0; i < restaurantArray.length; i++) {
    
          const restaurantData = restaurantArray[i].restaurant
          const restaurant = restaurantData.name;
          const address = restaurantData.location.address.substring(0, restaurantData.location.address.indexOf(',')+1);
          const addressCity = restaurantData.location.address.substring(restaurantData.location.address.indexOf(',')+1);
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
          // const photos = "https://via.placeholder.com/100";
          const photos = "http://lorempixel.com/100/100/food/";
            
          // ==================== display results ====================
          let textDiv = $("<div/>", {"class": "text"});

          let resultsDiv = $("<div>", {"class": "results-div"});

          let resDiv = $("<div/>", {"class": "restaurant details"}).append(restaurant);
          textDiv.append(resDiv);

          let addDiv = $("<div/>", {"class": "address details"}).append(address);
          textDiv.append(addDiv);

          let addCityDiv = $("<div/>", {"class": "address-city details"}).append(addressCity);
          textDiv.append(addCityDiv);

          let ratDiv = $("<div/>", {"class": "rating details"}).append(rating + " - " + ratingText);
          textDiv.append(ratDiv);
          
          let img = $("<img>").attr("src", photos);
          let imgDiv = $("<div/>", {"class": "img"}).append(img);
          resultsDiv.append(imgDiv);
        
          resultsDiv.append(textDiv);
          $("div.results-box").append(resultsDiv);
        };
    
        // =================== lat lon API here ===================

       // restaurantLocation
      for(i=0; i<restaurantLocation.length; i++){
        var pos1 = {
          lat: parseFloat(restaurantLocation[i].lat),
          lng: parseFloat(restaurantLocation[i].long)
        };
        new google.maps.Marker({position: pos1 , map: map});


      }
      var pos2 = {
        lat: lat,
        lng: lon
      }; 
        map.setCenter(pos2);

        // ===========================================================
    
      }) 
    
    })
    
  })

};
// ======================Keegans code =========================
function initMap() {
  // Step 1
  map = new google.maps.Map(
    document.querySelector(".map-box"), {zoom: 10, center: {lat: 0, lng: 0}});

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      new google.maps.Marker({position: pos , map: map});

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
  // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  };

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  };

  // RenderOutput();
};
// ==================== event listeners ====================
$("#button-search").on("click", RenderOutput);

// ==================== send to top ====================


var sendToTop = document.getElementById("Top");

window.onscroll = function() {scroll()};

function scroll() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 20) {
    sendToTop.style.display = "block";
  } else {
    sendToTop.style.display = "none";
  }
}

function send2Top() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
