
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

What about cities iwht ' in the names or 

trim removes white spaces for two words two words???
create error if no comma
make state a drop-down menu?
what about change to caps/lowercase for api

STYLES:   Badges for UV or is that part of API?  ************************************ */


/****  VARIABLES    ******/
var userFormEl = document.querySelector("#city-search-form");
var cityNameInputEl = document.querySelector("#city-name");
var searchHistoryContainerEl = document.querySelector("#search-history-container");
var currentCityEl = document.querySelector("#current-date")


/*****    EVENT HANDLERS START *****/
let formSubmitHandler = function (event) {
  event.preventDefault();
  //get city name from input field el
  console.log(event);

  
let cityName = cityNameInputEl.value.replace(/\s/g, '');
  console.log(cityName);
  //check if state is caps; if not, convert
 let cityState = cityName.split(',')[1];
  console.log(cityState);

  let cityStateUp = cityState.toUpperCase();
  console.log(cityStateUp)



var getCityCoordinates = function () {

  var requestCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + ',USA&limit=1&appid=299ebedfe3926f8c9e100c54f9104d93';
  console.log(requestCoordinates);

  fetch(requestCoordinates)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
     for (var i = 0; i < data.length; i++) {
       console.log(data[i].lat);
       console.log(data[i].lon);
      }
    })

};
 getCityCoordinates();
}
//lines 105/106 gitit done?? 2 variables? save l& L with city name
var getWeatherData = function (lat, lon) {
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=imperial&appid=299ebedfe3926f8c9e100c54f9104d93';

  fetch(weatherUrl).then(function (response) {

    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    } else {
      alert('Server Error');
    };
  });
}


userFormEl.addEventListener("submit", formSubmitHandler);
