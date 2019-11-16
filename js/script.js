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
      console.log(response);
      
    })
  






  // AJAX API call
  // API query URL
  // var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + cuisineInput + "&count=30&lat=" + lat + "&lon=" + lon + "&radius=3&sort=rating&order=asc"

  // $.ajax({
  //   url: queryURL,
  //   method: "GET",
  //   headers: {
  //     "Accept": "application/json",
  //     "user-key": "911458285a16e49504124550033c5a36"
  //   }
  // })
  // .then(function(response) {
  //   console.log(response);
  //   var resList = response.restaurants;
  //   console.log(resList)

  //   for (i = 0; 1 < resList.length; i++) {
  //     //Div to store results  
  //     var resultsDiv = $("<div>");
  //     resultsDiv.addClass("resultDisplay")

  //     // GET restaurant name
  //     var resName = resList[i].restaurant.name;
  //     console.log(resName)

  //     //creating element
  //     var Name = $("<h4>").text(resName);

  //     //display element
  //     resultsDiv.append(Name);

  //     // GET restaurant rating
  //     var resRate = resList[i].restaurant.user_rating.aggregate_rating;
  //     console.log(resRate)

  //     // GET restaurant vote
  //     var resVote = resList[i].restaurant.user_rating.votes;
  //     console.log(resVote)

  //     //creating element
  //     var Rating = $("<p>").text(resRate + " from " + resVote + " votes.");

  //     //display element
  //     resultsDiv.append(Rating);

  //     // GET restaurant address
  //     var resAddress = resList[i].restaurant.location.address;
  //     console.log(resAddress)

  //     //creating element
  //     var Address = $("<p>").text(resAddress);

  //     //display element
  //     resultsDiv.append(Address);

  //     $(".results-box").append(resultsDiv);
  //   }
  // });
  })
});