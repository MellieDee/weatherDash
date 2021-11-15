/****     VARIABLES    ******/
/* set date */
var DateTime = luxon.DateTime;
var localTime = DateTime.local();
console.log(localTime.toString())

/* set userForm vriables */
var userFormEl = document.querySelector("#city-search-form");
var cityNameInputEl = document.querySelector("#city-name");

// /* set forecast variables */
var forecastCardGroup = document.querySelector(".forecast-group");
var forecastCard = document.createElement("div");
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

/* set searched city variables DYNAMIC */
var savedCityCard = document.querySelector(".city-card");
var savedCityCardBody = document.createElement("div");
savedCityCard.appendChild(savedCityCardBody);

var savedCityCardTitle = document.createElement("h3");
savedCityCardTitle.classList = "card-title city-card-title";
savedCityCardTitle.innerHTML = "Searched Cities"
savedCityCardBody.appendChild(savedCityCardTitle);

var savedCityCardUl = document.createElement("ul");
savedCityCardUl.classList = "list-group city-list";
savedCityCardBody.appendChild(savedCityCardUl);


/* add to Searched Citites List */
var savedCityLi = $("<li>").addClass("list-group-item");


/* misc variables for API calls */
var lat = "";
var lon = "";
var savedCities = []



/*****    Input Form Handling*****/
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
//Possible Enhancement:  add function to check if country code is US 


// /**** STEP 1 - Get City Coordinates from 5-Day Forecast API Endpoint: ****/
var getCoord = function (cityName) {

  saveCities(cityName);
  getSavedCities();

  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=299ebedfe3926f8c9e100c54f9104d93";
  // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=299ebedfe3926f8c9e100c54f9104d93";
  // console.log(apiUrl);


  //make request to URL 5-Day Forecast API Endpoint
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
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

      } else {
        // (!response.ok)
        alert("Error: Please enter a real city name.");
        savedCities.pop(savedCities.length + 1);
      }
    })
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
          //   icon
          for (var i = 0; i < data.current.weather.length; i++) {
            console.log(data.current.weather[0].icon)
          }
          var iconCode = data.current.weather[0].icon;
          currentIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconCode + "@2x.png' width = '40px'>"

          var temp = (Math.round(data.current.temp * 10) / 10)
          var wind = (Math.round(data.current.wind_speed * 10) / 10)





          currentCityName.innerHTML = name + "   " + mainCityDate + "   " + currentIcon.innerHTML
          //main card info points
          degreeF.innerHTML = "&#x2109";
          currentTemp.textContent = "Temp: " + temp + " " + degreeF.innerHTML;
          currentWind.textContent = "Wind: " + wind + " MPH"
          currentHumidity.textContent = "Humidity: " + data.current.humidity + " %"
          currentUv.textContent = "UV Index: " + data.current.uvi;


          // create colors for UV Index
          var uvIndex = data.current.uvi

          if (uvIndex <= 2.99) {
            // currentUv.setAttribute("style", "background-color: green");
            currentUv.style.cssText = "color: #f5efc4; background-color: green";
          }
          else if (uvIndex >= 3 && uvIndex <= 5.99) {
            currentUv.style.backgroundColor = "orange";

          }
          else {
            (uvIndex >= 6)
            currentUv.style.cssText = "color: #f5efc4; background-color: #962129";
          }


          //***   APPEND to Containers (end of list/bottom child) for Main Card ***
          currentIconContainer.appendChild(currentIcon)
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
    var forecastTemp = (Math.round(data.daily[i].temp.day * 10) / 10);
    var forecastWind = (Math.round(data.daily[i].wind_speed * 10) / 10);
    var forecastHumidity = (Math.round(data.daily[i].humidity * 10) / 10)


    //Card
    var forecastCard = document.createElement("div");
    forecastCard.classList = "card forecast-card";
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
    forecastIconLi.style.backgroundColor = "#f0ad6e";
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
  if (savedCities.includes(cityName)) {
    // alert("true")
    let popped = savedCities.pop();
    console.log(popped);
  } else {
    // alert("false");
    savedCities.push(cityName)
    localStorage.setItem("city", JSON.stringify(savedCities))
    console.log(savedCities);
  }

/**  Replaces city names in search list so doesnt duplicate */
  clearCityList()
  function clearCityList() {
    while (savedCityCardUl.firstChild) {
      savedCityCardUl.removeChild(savedCityCardUl.firstChild);
    };
  }
}


function getSavedCities() {
  //getting KEY from local storage and Key has value of the ARRAY
  var savedCities = JSON.parse(localStorage.getItem("city"));
  console.log(savedCities);

  for (let i = 0; i < savedCities.length; i++) {
    var savedCityBtnName = savedCities[i]
    console.log(savedCityBtnName);

    //creating saved city Li
    var savedCityCardLi = document.createElement("li");
    savedCityCardLi.classList = "list-group-item city-item"
    savedCityCardUl.appendChild(savedCityCardLi)

    //creating savedCitiesButton & add to list
    var savedCityBtn = document.createElement("button");
    savedCityBtn.classList = "btn btn-block saved-city-btn";
    savedCityBtn.setAttribute("type", "button");
    savedCityBtn.textContent = savedCityBtnName
    savedCityCardLi.appendChild(savedCityBtn)
  }

  $(".city-card .saved-city-btn").click(function () {
    var cityName = $(this).text()
    // console.log(cityName)

    if (cityName) {
      //get weather data using cityName var in getWeather function
      getCoord(cityName);
      //clear input field
      cityNameInputEl.value = "";
      savedCityBtn.textContent = "";

    } else {
      //update to modal later
      alert("Please enter a valid US City name.");
    };
    return cityName;
  })
}


userFormEl.addEventListener("submit", formSubmitHandler);

/**  Components for delete btn enhancement */

// var clearCitiesBtn = document.createElement("button");
// clearCitiesBtn.classList = "clear-cities-btn  btn mx-auto my-2"
// clearCitiesBtn.setAttribute("type", "button")
// savedCityCard.appendChild(clearCitiesBtn)
//clearCitiesBtn.textContent = "Delete Saved Cities"



// function deleteCityList(forecastCardUl) {
//   localStorage.clear();
//   forecastCardUl.innerHTML = "none";
// }


/**   Event Listeners  ***/
// clearCitiesBtn.addEventListener("click", deleteCityList);
