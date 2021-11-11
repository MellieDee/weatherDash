/***PSEUDO CODE FOR WEATHER APP ***

do I need to geocode first?? then enter that data intot he api weather call??
create input field/form in div close.
create button
add event listener to GamepadButtonsave data to lS?
enters data into and  intiates API Call
capture data from input field
set to var then enter in GEO API
Get lat/long from geoAPI:
search through all of the items i the array until find one where the city state match, (usual i=0)
creat var(s) for Lat/lon and pass through as string? to API call for weather
then need to get specific parts of/attributs of that weather data response:
city name
date
ico
tempF
wind MPH
Humidty%
UV In with color

(create color bg if else satement
put into HTML divs and cards
save each line or card? with sep id unique Key to local Storage
save also list and main summary to local storage
set button action to histrpy ist
ceate those dynamic HTML

What about cities with ' in the names or 

trim removes white spaces for two words two words???
create error if no comma
make state a drop-down menu?
what about change to caps/lowercase for api
 
if no commoaa then assume it is a  just a city


STYLES:   Badges for UV or is that part of API? 
go back fix:
 colors
 background images?


/************************************ */


/****  VARIABLES    ******/
var userFormEl = document.querySelector("#city-search-form");
var cityNameInputEl = document.querySelector("#city-name");
// var searchHistoryContainerEl = document.querySelector("#search-history-container");
// var currentCityEl = document.querySelector("#current-date")


/*****    EVENT HANDLERS START *****/
let formSubmitHandler = function (event) {
  event.preventDefault();
  //confirm desired event
  // console.log(event);

  //get city name from input field el
  let cityName = cityNameInputEl.value.replace(/\s/g, '');
  //console cityName later will be displayed in main card
  // console.log(cityName);
  if (cityName) {
    //get weather data using cityName var in getWeather function
    getWeather(cityName);
    //clear input field
    // cityNameInputEl.value = "";
  } else {
    //update to modal later
    alert("Please enter a valid US City name.");
  };
};

//possibly add funciton to account for state reference and comma
//convert state to Upper
// let cityState = cityName.split(',')[1];
// console.log(cityState);
// if (cityState.length > 2){
//   alert("Please use 2 character state abbreviation")
// } else {
//   let cityStateUp = cityState.toUpperCase();
//   console.log(cityStateUp)
// }
// };


/****  STEP 1: Get Weather Data  By City  *******/
var getWeather = function (cityName) {

  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=299ebedfe3926f8c9e100c54f9104d93";
  console.log(apiUrl);

  //make request to URL
  fetch(apiUrl)
    .then(function (response) {
      response.json()
        .then(function (data) {
          console.log(data);
          // for (var i = 0; i < data.length; i++) {
          //console.log(data[i].lat);
          //console.log as check then display in main card
          console.log(data.name)
          // for (var i = 0; i < data.length; i++) {
          console.log(data.weather[0].icon)
          // }
          console.log(data.main.temp);
          console.log(data.wind.speed);
          console.log(data.main.humidity);
          // console.log(data.UV??)
        //}
        })
    })
};
// getWeather();


// /**** STEP 1 - Get City Coordinates: ****/
// var getCityCoordinates = function () {

//   var requestCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',USA&limit=1&appid=299ebedfe3926f8c9e100c54f9104d93';
//   console.log(requestCoordinates);

//   fetch(requestCoordinates)
//     .then(function (response) {
//       return response.json();
//     })

//     .then(function (data) {
//       console.log(data);
//      for (var i = 0; i < data.length; i++) {
//        console.log(data[i].lat);
//        console.log(data[i].lon);
//       }
//     })

// };
//  getCityCoordinates();
// }
// //lines 105/106 gitit done?? 2 variables? save l& L with city name
// var getWeatherData = function (lat, lon) {
//   let latText = 
//   let
//   let  weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latText + '&lon=' + lonText + '&exclude=minutely,hourly&units=imperial&appid=299ebedfe3926f8c9e100c54f9104d93';

//   fetch(weatherUrl).then(function (response) {

//     if (response.ok) {
//       response.json().then(function (data) {
//         console.log(data);
//       });
//     } else {
//       alert('Server Error');
//     };
//   });
// }


userFormEl.addEventListener("submit", formSubmitHandler);
