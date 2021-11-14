/****     VARIABLES    ******/
/* set date */
var DateTime = luxon.DateTime;
var localTime = DateTime.local();
console.log(localTime.toString())

/* set userForm vriables */
var userFormEl = document.querySelector("#city-search-form");
var cityNameInputEl = document.querySelector("#city-name");


// var previousCitiesListContainer = document.querySelector("#previous-cities-list-container");

// /* set forecast variables */
var forecastCardGroup = document.querySelector(".forecast-group");
// // // var forecastCardGroup = "";
// // var forecastCard = "";
// // // var forecastIconLi = "";
// // // var forecastTempLi = "";
// // // var forecastWindLi = "";
// // // var forecastHumidityLi = "";
var forecastCard = document.createElement("div");
// forecastCard.classList = "card forecast-card";
// // forecastCard.setAttribute("id", forecastDayCounter);
forecastCardGroup.appendChild(forecastCard);


/* set current  variables */
var currentIconContainer = document.createElement("div");
var currentIcon = document.createElement("i");
var currentTemp = document.createElement("li");
var degreeF = document.createElement("span");
var currentWind = document.createElement("li");
var currentHumidity = document.createElement("li");
var currentUv = document.createElement("li");
var currentCityEl = document.querySelector("#current-city-details");

/* misc variables */
var lat = "";
var lon = "";
var savedCities = []


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
    // forecastCard.innerHTML = ""
  } else {
    //update to modal later
    alert("Please enter a valid US City name.");
  };
  console.log(cityName);
  return cityName;

}

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

//****    STEP 2: Get Weather data, Create & fill Main & Forecast Cards ***/
var oneCall = function (lat, lon, name) {
  var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=299ebedfe3926f8c9e100c54f9104d93";
  console.log(oneCallUrl)

  fetch(oneCallUrl)
    .then(function (response) {
      response.json()
        .then(function (data) {
          //console.log as check then display in main card


          //*** DYNAMICALLY CREATE ELEMENTS for MAIN CARD  STARTS   ***
          var currentCityName = document.getElementById("current-city-name")

          var callTime = data.current.dt
          //convert to string from epoch seconds using Luxon
          var mainCityDate = DateTime.fromSeconds(callTime).toLocaleString();
          console.log(mainCityDate);


          //***  Assign identifiers to Main Card Elements   ***
          currentIcon.classList = "weather-icon";
          currentIconContainer.setAttribute("id", "icon")
          currentTemp.classList = "list-group-item";
          currentWind.classList = "list-group-item";
          currentHumidity.classList = "list-group-item";
          currentUv.classList = "list-group-item";


          //***  Assign Content to Main Card Elements    ***
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

          console.log(data);

          clearForecastCards()

          function clearForecastCards() {
            while (forecastCardGroup.firstChild) {
              forecastCardGroup.removeChild(forecastCardGroup.firstChild);
            };
          } createForecastCards(data)
        })
    });
}


//***  Function to Dynamically Create Forcast Cards */
function createForecastCards(data) {

  for (var i = 1; i < 6; i++) {
    var forecastTime = data.daily[i].dt
    //convert to string from epoch seconds using Luxon
    var forecastDate = DateTime.fromSeconds(forecastTime).toLocaleString();
    var iconCode = data.daily[i].weather[0].icon;
    var forecastTemp = data.daily[i].temp.day
    var forecastWind = data.daily[i].wind_speed
    var forecastHumidity = data.daily[i].humidity


    //Card
    var forecastCard = document.createElement("div");
    forecastCard.classList = "card forecast-card";
    // forecastCard.setAttribute("id", forecastDayCounter);
    forecastCardGroup.appendChild(forecastCard);

    //Card body
    var forecastCardBody = document.createElement("div");
    forecastCardBody.classList = "card-body forecast-body";
    forecastCard.appendChild(forecastCardBody);

    //Card title
    var forecastCardTitle = document.createElement("h3");
    forecastCardTitle.classList = "card-title forecast-title";
    forecastCardTitle.innerHTML = forecastDate
    forecastCardBody.appendChild(forecastCardTitle);

    //Card ul
    var forecastCardUl = document.createElement("ul");
    forecastCardUl.classList = "list-group forecast-list";
    forecastCardBody.appendChild(forecastCardUl);

    //Card li - icon
    var forecastIconLi = document.createElement("li");
    forecastIconLi.classList = "list-group-item forecast-item ficon"
    // var forecastIconContainer = document.createElement("div");
    // var iconCode = data.daily[i].weather[0].icon;
    // forecastIconLi = iconCode
    console.log(iconCode);
    forecastIconLi.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconCode + "@2x.png' width = '40px'>";
    forecastCardUl.appendChild(forecastIconLi);

    //Card li - temp
    var forecastTempLi = document.createElement("li");
    forecastTempLi.classList = "list-group-item forecast-item ftemp";
    degreeF.innerHTML = "&#x2109";
    forecastTempLi.textContent = "Temp: " + forecastTemp + " " + degreeF.innerHTML
    forecastCardUl.appendChild(forecastTempLi);

    //Card li - wind
    var forecastWindLi = document.createElement("li");
    forecastWindLi.classList = "list-group-item forecast-item fwind";
    forecastWindLi.textContent = "Wind: " + forecastWind + " MPH"
    forecastCardUl.appendChild(forecastWindLi);

    //Card li - humidity
    var forecastHumidityLi = document.createElement("li");
    forecastHumidityLi.classList = "list-group-item forecast-item fhumidity"
    forecastHumidityLi.textContent = "Humidity: " + forecastHumidity + " %"
    forecastCardUl.appendChild(forecastHumidityLi);
  }

}


/**** SET CITY NAMES TO LOCAL STORAGE   ***/
function saveCities(cityName) {
  savedCities.push(cityName)
  localStorage.setItem("city", JSON.stringify(savedCities))
  console.log(savedCities);
}

function getSavedCities() {
  //getting KEY from local storage and Key has value of the ARRAY
  var savedCities = JSON.parse(localStorage.getItem("city"));
  console.log(savedCities);

  var savedCityCard = document.querySelector(".city-card");
  var savedCityCardBody = document.createElement("div");
  savedCityCard.appendChild(savedCityCardBody);


  var savedCityCardTitle = document.createElement("h2");
  savedCityCardTitle.classList = "card-title p-2 city-card-title";
  savedCityCardTitle.innerHTML = "Searched Cities"
  savedCityCardBody.appendChild(savedCityCardTitle);

  for (let i = 0; i < savedCities.length; i++) {

    var savedCityBtnName = savedCities[i]
    console.log(savedCityBtnName);

    var savedCityCardUl = document.createElement("ul");
    savedCityCardUl.classList = "list-group city-list";
    savedCityCardBody.appendChild(savedCityCardUl);

    var savedCityCardLi = document.createElement("li");
    savedCityCardLi.classList = "list-group-item city-item"
    savedCityCardUl.appendChild(savedCityCardLi)

    var savedCityBtn = document.createElement("button");
    savedCityBtn.classList = "btn btn-block saved-city-btn";
    savedCityBtn.setAttribute("type", "button");
    savedCityBtn.textContent = savedCityBtnName;
    savedCityCardLi.appendChild(savedCityBtn);
  }

}

getSavedCities();
userFormEl.addEventListener("submit", formSubmitHandler);





//  for (let i = 0; i <  savedCities.length; i++) {
// var savedCitiesListContainerUl = document.querySelector("saved-citites-list-container")
// var savedCityListItem = document.createElement("li")
// var savedCityBtn = document.createElement("button")


// savedCityListItem.classList = "list-group-item saved-city"
// savedCityBtn.classList = "btn saved-city-btn"
// savedCityBtn.setAttribute

// savedCitiesListContainerUl.appendChild(savedCityListItem)
// savedCityListItem.appendChild(savedCityBtn)

/****jQUERY **** */

// let keys = Object.keys(localStorage)
// // let test = localStorage.getItem(cityName)
// console.log(keys)
// for (let i = 0; i < keys.length; i++) {
//     $(“.city-btns”).append(“<li><button class=‘btn-list-search’>“+keys[i]+“</button></li>“)
// }
// $(“.btn-list-search”).on(“click”, function(event) {
//     var cityName = $(this).text()
/****   jQuery  **** */
//  }
// }

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




