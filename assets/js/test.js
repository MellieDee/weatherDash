/****     VARIABLES    ******/
var userFormEl = document.querySelector("#city-search-form");
var cityNameInputEl = document.querySelector("#city-name");

// var searchHistoryContainerEl = document.querySelector("#search-history-container");
var previousCitiesListContainer = document.querySelector("#previous-cities-list-container");
// var previousCityTerm = document.querySelector("#previous-city");
var currentCityEl = document.querySelector("#current-city-details");
var lat = "";
var lon = "";
var previousCities = []


/*****    EVENT HANDLERS START *****/
let formSubmitHandler = function (event) {
  event.preventDefault();
  //confirm desired event
  // console.log(event);


  //get city name from input field el
  // let cityName = cityNameInputEl.value.replace(/\s/g, '');
  let cityName = cityNameInputEl.value;

  //console cityName later will be displayed in main card
  // console.log(cityName);
  if (cityName) {
    //get weather data using cityName var in getWeather function
    getCoord(cityName);
    //clear input field
    cityNameInputEl.value = "";
  } else {
    //update to modal later
    alert("Please enter a valid US City name.");
  };
  console.log(cityName);
  return cityName;
};


// /**** STEP 1 - Get City Coordinates: ****/
//get coord from 5 day forecast - 
var getCoord = function (cityName) {
  // saveCities(cityName);
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=299ebedfe3926f8c9e100c54f9104d93";
  // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=299ebedfe3926f8c9e100c54f9104d93";
  console.log(apiUrl);

  //make request to URL
  fetch(apiUrl)
    .then(function (response) {
      response.json()
        .then(function (data) {
          //console.log as check then display in main card
          console.log(data);
   
      console.log(data.city.coord.lat);
      //pass coordinates through call for weather data
      oneCall(data.city.coord.lat, data.city.coord.lon)
    });
  });
}


userFormEl.addEventListener("submit", formSubmitHandler);


var oneCall = function (lat, lon) {
  var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=299ebedfe3926f8c9e100c54f9104d93";
  console.log(oneCallUrl)

  fetch(oneCallUrl)
    .then(function (response) {
      response.json()
        .then(function (data) {
          //console.log as check then display in main card
          console.log(data);
        })
    })

  //set up cards dynamically with for loop
}





