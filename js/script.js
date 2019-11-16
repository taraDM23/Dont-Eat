//On click event that runs dashboard
$("#button-search").on("click", function RenderOutput(event) {

  event.preventDefault();

  //Zomato API key and URL
  var key = "911458285a16e49504124550033c5a36";

  //location and cuisine input
  var cuisineInput = $("#input-cuisine").val();
  //var location = $("#input-city").val();


  /* //Location key and URL
  var APIKey = "";
  var queryURL = """;
  //JS code that will get the current location
  $.ajax({
  url: queryURL,
  method: "GET"
  })
  .then(function(response) {
    console.log(response);
  //Get Lat and Lon for next query
  var lat = response.coord.lat;
  console.log(lat);
  var lon = response.coord.lon;
  console.log(lon); 
  */

  // static coord for now

  var lat = "-33.6";
  var lon = "150.75";
  var queryURL = "https://developers.zomato.com/api/v2.1/search?q=" + cuisineInput + "&count=30&lat=" + lat + "&lon=" + lon + "&radius=3&sort=rating&order=asc"

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      "Accept": "application/json",
      "user-key": "911458285a16e49504124550033c5a36"
    }
  })
  .then(function(response) {
    console.log(response);
    var resList = response.restaurants;
    console.log(resList)

    for (i = 0; 1 < resList.length; i++) {
      //Div to store results  
      var resultsDiv = $("<div>");
      resultsDiv.addClass("resultDisplay")

      // GET restaurant name
      var resName = resList[i].restaurant.name;
      console.log(resName)

      //creating element
      var Name = $("<h4>").text(resName);

      //display element
      resultsDiv.append(Name);

      // GET restaurant rating
      var resRate = resList[i].restaurant.user_rating.aggregate_rating;
      console.log(resRate)

      // GET restaurant vote
      var resVote = resList[i].restaurant.user_rating.votes;
      console.log(resVote)

      //creating element
      var Rating = $("<p>").text(resRate + " from " + resVote + " votes.");

      //display element
      resultsDiv.append(Rating);

      // GET restaurant address
      var resAddress = resList[i].restaurant.location.address;
      console.log(resAddress)

      //creating element
      var Address = $("<p>").text(resAddress);

      //display element
      resultsDiv.append(Address);

      $(".results-box").append(resultsDiv);
    }
  });
})