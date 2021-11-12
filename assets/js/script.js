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

USE taskinator Pro to save all data mpoints??


STYLES:   Badges for UV or is that part of API? 
go back fix:
 colors
 background images?
 convert to function() { as opposed to  var XX = function}


/************************************ */


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
    getWeather(cityName);
    //clear input field
    cityNameInputEl.value = "";
  } else {
    //update to modal later
    alert("Please enter a valid US City name.");
  };
  console.log(cityName);
  return cityName;
};

//possibly add function to account for state reference and comma
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
  saveCities(cityName);
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=299ebedfe3926f8c9e100c54f9104d93";
  // console.log(apiUrl);

  //make request to URL
  fetch(apiUrl)
    .then(function (response) {
      response.json()
        .then(function (data) {
          //console.log as check then display in main card
          console.log(data);


          //*** DYNAMICALLY CREATE ELEMENTS for MAIN CARD   ***
          var currentCityName = document.getElementById("current-city-name")

          var today = data.dt
          var date = new Date(today * 1000);
          var dateCity = date.textContent = (moment().format("MM/DD/YYYY"));

          /** */
          var currentIconContainer = document.createElement("div");
          var currentIcon = document.createElement("i");
          var currentIconContainer = document.createElement("div");
          var currentTemp = document.createElement("li");
          var degreeF = document.createElement("span");
          var currentWind = document.createElement("li");
          var currentHumidity = document.createElement("li");
          // var currentUv = document.createElement("li");

          //***  Assign CLASSES & IDs to ELEMENTS    ***
          currentCityName.classList = "card-header main-header";
          currentIcon.classList = "weather-icon";
          currentIconContainer.setAttribute("id", "icon")
          // currentCityName.setAttribute("id", "current-city");
          //consolidate these later
          currentTemp.classList = "list-group-item";
          currentWind.classList = "list-group-item";
          currentHumidity.classList = "list-group-item";


          //***  Assign CONTENT to ELEMENTS    ***
          currentCityName.innerHTML = data.name + "   " + dateCity;
          for (var i = 0; i < data.length; i++) {
            console.log(data.weather[0].icon)
          }
          var iconCode = data.weather[0].icon;
          // currentIcon.innerHTML = '<img src="http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png">';

          currentIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconCode + "@2x.png'>";


          degreeF.innerHTML = "&#x2109";
          currentTemp.textContent = "Temp: " + data.main.temp + " " + degreeF.innerHTML;
          currentWind.textContent = "Wind: " + data.wind.speed + " MPH"
          currentHumidity.textContent = "Humidity: " + data.main.humidity + " %"
          // currentUv.textContent = "badge & coor tbd"



          //***   APPEND to Containers to end of list ie most bottom child***
          currentIconContainer.appendChild(currentIcon)
          currentCityEl.appendChild(currentIconContainer);
          currentCityEl.appendChild(currentTemp);
          currentCityEl.appendChild(currentWind);
          currentCityEl.appendChild(currentHumidity);
          // currentCityEl.appendChild(currentUv);
          // };


          oneCall(data.coord.lat, data.coord.lon)
        });
    })
}


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

/**** SET CITY NAMES TO LOCAL STORAGE   ***/
var saveCities = function (cityName) {
  previousCities.push(cityName)
  localStorage.setItem("city", JSON.stringify(previousCities))
}

var getPreviousCities = function () {
  //getting KEY from local storage and Key has value of the ARRAY
  var previousCityArray = JSON.parse(localStorage.getItem("city"));

  for (var i = 0; i < previousCityArray.length; i++) {

    var previousCityEl = document.createElement("button");
    previousCityEl.setAttribute("type", "button");
    previousCityEl.classList = "list-group-item btn previousCityBtn";
    previousCityEl.textContent = previousCityArray[i];

   previousCitiesListContainer.appendChild(previousCityEl);
  }

}
// function displaySearchHistory() {

  // if (cities.length === 0) {
  //   searchHistoryContainerEl.textContent = "Sorry - couldn't find weather for that city. Check spelling or add 2-letter state abbreviation?";
  //   return;
  // }
  // previousCityTerm.textContent = searchTerm

  //create container for each city
//   ;
//   cityEl.classList = "list-group-item btn peviousBtn";

//   cityEl.setAttribute("href", "https://api.openweathermap.org/data/2.5/weather?q=sacramento&units=imperial&appid=299ebedfe3926f8c9e100c54f9104d93");

//   //create spanEl to hold the city name
//   var previousCityTitle = document.createElement("span");
//   previousCityTitle.textContent = "need to pull from input - create button as new input and run get weather again??";

//   //append to containers
//   cityEl.appendChild(previousCityTitle);
//   searchHistoryContainerEl.appendChild(cityEl);
// };

//       console.log(data.name)
//       for (var i = 0; i < data.length; i++) {
// console.log(data.weather[0].icon)
//       // }
//       console.log(data.main.temp);
//       let currentTemp = (data.main.temp)
//       // console.log(data.wind.speed);
//       // console.log(data.main.humidity);
//       // console.log(data.UV??)

//       let weatherInfo = []
//       weatherInfo.push("currentTemp")
//       console.log(weatherInfo);





/****   STEP 2: Display Data  A) Current City Weather ******/

// function displayWeather() {
// //currentCityEl is Ul
// //create li T, W, H, uv ==> append each to ul
// //do I set in size so field is always there and then just at varText for main card?
// var currentTempEl = document.createElement("li");
// currentTempEl.classList = "list-group-item"
// currentTempEl.setAttribute("id", "temp");
// currentTempEl.textContent = data.main.temp;

// currentCityEl.appendChild(currentTempEl);
// }



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










/***SAVE FOR LATER USE MAYBE???**** */



/***CREATE BUTTONS INSTEAD for HISTORY?  ***/
// var  searchAgainBtnEl = document.createElement("button");
// searchAgainBtnEl.classList = "list-group-item searchAgainBtn btn";
// searchAgainBtnEl.setAttribute("type", "submit");
// searchAgainBtnEl.textContent = cityName;
// searchHistoryContainerEl.appendChild(searchAgainBtnEl)




// let currentDayEl = document.querySelector("#currentDay");
// currentDayEl.textContent = (moment().format("MM/DD/YYYY")

// console.log(moment().toDate());
