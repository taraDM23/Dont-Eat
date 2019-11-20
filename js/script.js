function initMap() {
  // Step 1
  var map = new google.maps.Map(
    document.getElementById("map"), {zoom: 8, center: {lat: 0, lng: 0}});



    var infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        new google.maps.Marker({position: pos , map: map});


        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

  
}
  // Step 2 
  // Get user location
  // Then center to user's location
  // $.ajax({

  // }).then(function(response) {
  //   const lat = response.lat; 
  //   const lng = response.lng;
    
  //   map.panTo({lat: lat, lng: lng});

  // })

  // let cuisineId = 3;

  // let searchURL = `https://developers.zomato.com/api/v2.1/search?lat=${lat}&lon=${lon}&cuisines=${cuisineId}&sort=rating&order=asc`;


  // // Step 2
  // $.ajax({
  //   url: searchURL,
  //   method: "GET",
  //   headers: {
  //     "Accept": "application/json",
  //     "user-key": "911458285a16e49504124550033c5a36"
  //   }
  // })
  // .then(function(response) {
  //   const restaurantArray = response.restaurants;
  //   console.log(restaurantArray);

  //   let latLonObj = {}
  //   for(let i = 0; i < restaurantArray.length; i++) {
  //     let lat = restaurantArray[i].restaurant.location.latitude;
  //     let lon = restaurantArray[i].restaurant.location.longitude;

  //     latLonObj[lat] = lon;
  //   }
  //   console.log(latLonObj);

  //   let resultsDiv = $("<div>");
  //   let restaurantLocation = [];
  //   for(let i = 0; i < restaurantArray.length; i++) {

  //     const restaurantData = restaurantArray[i].restaurant
  //     const restaurant = restaurantData.name;
  //     const address = restaurantData.location.address;
  //     const rating = restaurantData.user_rating.aggregate_rating;
  //     const ratingText = restaurantData.user_rating.rating_text;

  //     const {
  //       restaurant: {
  //         location: {
  //           latitude,
  //           longitude,
  //         }
  //       }
  //     } = restaurantArray[i];

  //     restaurantLocation.push(
  //       {
  //         name: restaurant,
  //         lat: latitude,
  //         lng: longitude
  //       }
  //     ); 
  //     // const photosArray = restaurantData.photos;
  //     // let photos = [];
      
  //     // if(photosArray) {
  //     //   for(let i = 0; i < photosArray.length; i++) {
  //     //     photos.push(photosArray[i].photo.thumb_url);
  //     //   };
  //     // } else {
  //     //   photos.push("https://via.placeholder.com/200");
  //     // }
  //     const photos = "https://via.placeholder.com/200";
      
  //     resultsDiv.append(restaurant);
  //     resultsDiv.append(address);
  //     resultsDiv.append(rating);
  //     resultsDiv.append(ratingText);
  //     let img = $("<img>").attr("src", photos);
  //     resultsDiv.append(img);
  //   };

  //   for (let i = 0; i < coordArr.length; i++) {
  //     const coord1 = coordArr[i];
  //     new google.maps.Marker({position: coord1, map: map});
  //     console.log("inside for so no issue")
  //   }
  // }) 
