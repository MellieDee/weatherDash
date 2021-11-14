/****     VARIABLES    ******/
var DateTime = luxon.DateTime;
var localTime = DateTime.local();
console.log(localTime.toString())


var userFormEl = document.querySelector("#city-search-form");
var cityNameInputEl = document.querySelector("#city-name");

// var searchHistoryContainerEl = document.querySelector("#search-history-container");
var previousCitiesListContainer = document.querySelector("#previous-cities-list-container");


/***   CREATE ELEMENTS ***/
/* Create Element Variables for City Forecast Result Divs */
var currentIconContainer = document.createElement("div");
var currentIcon = document.createElement("i");
var currentTemp = document.createElement("li");
var degreeF = document.createElement("span");
var currentWind = document.createElement("li");
var currentHumidity = document.createElement("li");
var currentUv = document.createElement("li");

/* Create Element Variables for City Forecast Result Divs */
var forecastIconLi = document.getElementById("#ficon");
var forecastIconDiv = document.createElement("div");
var forecastIcon = document.createElement("i");
var forecastTemp = document.createElement("li");
var fodegreeF = document.createElement("span");
var forecastWind = document.createElement("li");
var forecastHumidity = document.createElement("li");

// var previousCityTerm = document.querySelector("#previous-city");
var currentCityEl = document.querySelector("#current-city-details");
var lat = "";
var lon = "";
var savedCities = []


/*****    EVENT HANDLERS START *****/
let formSubmitHandler = function (event) {
  event.preventDefault();
  //confirm desired event
  // console.log(event);

  //clear contents of main weather card to get ready for new data
  currentTemp.textContent = "Temp: ";
  currentWind.textContent = "Wind: ";
  currentHumidity.textContent = "Humidity: ";
  currentUv.textContent = "UV Index: ";


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



// /**** STEP 1 - Get City Coordinates from 5-Day Forecast API Endpoint: ****/
var getCoord = function (cityName) {
  saveCities(cityName);

  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=299ebedfe3926f8c9e100c54f9104d93";
  // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=299ebedfe3926f8c9e100c54f9104d93";
  // console.log(apiUrl);

  //make request to URL 5-Day Forecast API Endpoint
  fetch(apiUrl)
    .then(function (response) {
      response.json()
        .then(function (data) {
          //console.log as check then display in main card
          console.log(data);
          console.log(data.city.name);
          console.log(data.city.country);
          //maybe incorporate if statement to check for US as countrycode?

          //pass coordinates through call for weather data
          oneCall(data.city.coord.lat, data.city.coord.lon, data.city.name)

        });
    });
}

var oneCall = function (lat, lon, name) {
  var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=299ebedfe3926f8c9e100c54f9104d93";
  console.log(oneCallUrl)

  fetch(oneCallUrl)
    .then(function (response) {
      response.json()
        .then(function (data) {
          //console.log as check then display in main card
          console.log(data);

          //*** DYNAMICALLY CREATE ELEMENTS for MAIN CARD  STARTS   ***
          var currentCityName = document.getElementById("current-city-name")

          var callTime = data.current.dt
          //convert to string from epoch seconds using Luxon
          var mainCityDate = DateTime.fromSeconds(callTime).toLocaleString();
          console.log(mainCityDate);
      
    
          //***  Assign Classes to Main Card Elements   ***
          // currentCityName.classList = "card-header main-header";
          currentIcon.classList = "weather-icon";
          currentIconContainer.setAttribute("id", "icon")
          // currentCityName.setAttribute("id", "current-city");
          //consolidate these later?
          currentTemp.classList = "list-group-item";
          currentWind.classList = "list-group-item";
          currentHumidity.classList = "list-group-item";
          currentUv.classList = "list-group-item";


          //***  Assign Content to Main Card Elements    ***
          // currentCityName.innerHTML = name + "   " + mainCityDate;
          for (var i = 0; i < data.current.weather.length; i++) {
            console.log(data.current.weather[0].icon)
          }
          var iconCode = data.current.weather[0].icon;

          currentIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconCode + "@2x.png' width = '40px'>";
          currentCityName.innerHTML = name + "   " + mainCityDate + "   " + currentIcon.innerHTML
          degreeF.innerHTML = "&#x2109";
          currentTemp.textContent = "Temp: " + data.current.temp + " " + degreeF.innerHTML;
          currentWind.textContent = "Wind: " + data.current.wind_speed + " MPH"
          currentHumidity.textContent = "Humidity: " + data.current.humidity + " %"
          currentUv.textContent = "UV Index: " + data.current.uvi;

          //***   APPEND to Containers (end of list/bottom child) for Main Card ***
          currentIconContainer.appendChild(currentIcon)
          // currentCityEl.appendChild(currentIconContainer);
          currentCityEl.appendChild(currentTemp);
          currentCityEl.appendChild(currentWind);
          currentCityEl.appendChild(currentHumidity);
          currentCityEl.appendChild(currentUv);
          /****     MAIN CARD ENDS      ******/


          /***   5-DAY FORECAST DYNAMIC SETUP BEGINS ***/

          for (var i = 1; i <= 5; i++) {
            // var forecastDate = data.daily[i].dt
            // var dateF = (forecastDate * 1000);
            // var foreacastDayAtI = dateF.textContent = (moment().format("MM/DD/YYYY"));


            /*   Assign Content to Forecast Cards   */
            // forecastDateText.innerHtml = foreacastDayAtI




            // forecastIconLi.appendChild(forecastIconDiv);
            // forecastIconDiv.appendChild(forecastIcon);

          }






















        });
    })

  //set up cards dynamically with for loop
}
/**** SET CITY NAMES TO LOCAL STORAGE   ***/
function saveCities(cityName) {
  savedCities.push(cityName)
  localStorage.setItem("city", JSON.stringify(savedCities))
}


function getSavedCities() {
  savedCities = localStorage.getItem("city");
  //getting KEY from local storage and Key has value of the ARRAY
  // var savedCities = JSON.parse(localStorage.getItem("city"));
  // console.log(savedCities);
}

//   //parse
//   savedCities
//   for (var i = 0; i < previousCities.length; i++) {
//     console.log(previousCities[i])

//     //   var previousCityEl = document.createElement("a");
//     //   previousCityEl.setAttribute("href", "#");
//     //   previousCityEl.classList =  "dropdown-item previous-city-list-item";

//     //   previousCityEl.textContent = previousCityArray[i];

//     //  previousCitiesListContainer.appendChild(previousCityEl);
//   }
// }
// getSavedCities();
userFormEl.addEventListener("submit", formSubmitHandler);
