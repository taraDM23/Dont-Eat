//On click event that runs dashboard
$("#button-search").on("click", function RenderOutput(event) {
  // prevent form default activity
  event.preventDefault();

  // get cuisine input from HTML
  var cuisineInput = $("#input-cuisine").val();
  console.log({cuisineInput});

  // define lat & long
  var lat = "40.742051";
  var lon = "-74.004821";

  // API query URL
  var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + cuisineInput + "&count=30&lat=" + lat + "&lon=" + lon + "&radius=3&sort=rating&order=asc"

  // API call to list cuisines
  let cuisineURL = `https://developers.zomato.com/api/v2.1/cuisines?lat=${lat}&lon=${lon}`
  
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
    console.log(cuisines);

    // convert cuisines array into object
    // object has cuisine_name and cuisine_id
    let cuisinesObj = {};
    for(let i = 0; i < cuisines.length; i++) {
      cuisinesObj[cuisines[i].cuisine.cuisine_name] = cuisines[i].cuisine.cuisine_id;
    };

    console.log({cuisinesObj});
  });






  // AJAX API call
  
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
});