// var forecastCardObj = {
//   date: forecastDate,
//   icon: iconCode,
//   temp: forecastTemp,
//   wind: forecastWind,
//   humidity: forecastHumidity,
// }

// createForecastCards(forecastCardObj);
// function createForecastCards(forecastCardObj) {


  createForecastCards();

function createForecastCards() {
  var forecastCard = document.createElement("div");
  forecastCard.classList = "card forecast-card";
  forecastCard.setAttribute("id", forecastDayCounter);
  forecastCardGroup.appendChild(forecastCard);

  var forecastCardBody = document.createElement("div");
  forecastCardBody.classList = "card-body forecast-body";
  forecastCard.appendChild(forecastCardBody);

  var forecastCardTitle = document.createElement("h3");
  forecastCardTitle.classList = "card-title forecast-title";
  forecastCardTitle.innerHTML = forecastDate
  forecastCardBody.appendChild(forecastCardTitle);

  var forecastCardUl = document.createElement("ul");
  forecastCardUl.classList = "list-group forecast-list";
  forecastCardBody.appendChild(forecastCardUl);

  var forecastIconLi = document.createElement("li");
  forecastIconLi.classList = "list-group-item forecast-item ficon"
  var iconCode = data.daily[i].weather[0].icon;
  console.log(iconCode);
  forecastCardUl.appendChild(forecastIconLi);

  forecastIconLi.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconCode + "@2x.png' width = '40px'>";

  var forecastTempLi = document.createElement("li");
  forecastTempLi.classList = "list-group-item forecast-item ftemp";
  degreeF.innerHTML = "&#x2109";
  forecastTempLi.textContent = "Temp: " + data.daily[i].temp.day + " " + degreeF.innerHTML
  forecastCardUl.appendChild(forecastTempLi);

  var forecastWindLi = document.createElement("li");
  forecastWindLi.classList = "list-group-item forecast-item fwind";
  forecastWindLi.textContent = "Wind: " + data.daily[i].wind_speed + " MPH"
  forecastCardUl.appendChild(forecastWindLi);

  var forecastHumidityLi = document.createElement("li");
  forecastHumidityLi.classList = "list-group-item forecast-item fhumidity"
  forecastHumidityLi.textContent = "Humidity: " + data.daily[i].humidity + " %"
  forecastCardUl.appendChild(forecastHumidityLi);



  console.log(forecastTempLi.textContent);
  console.log(forecastWindLi.textContent);
  console.log(forecastHumidityLi.textContent);

  // forecastCardObj.id = forecastDayCounter;

}





















// /***   5-DAY FORECAST DYNAMIC SETUP BEGINS ***/

          // //***  Assign Content to Forecast Card Elements    ***

        
          // for (var i = 1; i < 6; i++) {
          //   //   ***   Display Date on Forecast Cards   ***

          //   /* Create Elements */
          //   var forecastCard = document.createElement("div");
          //   var forecastCardBody = document.createElement("div");
          //   var forecastCardTitle = document.createElement("h3");
          //   var forecastCardUl = document.createElement("ul");
          //   var forecastIconLi = document.createElement("li");
          //   var forecastIconContainer = document.createElement("div");
          //   var forecastIcon = document.createElement("i");
          //   var forecastTitle = document.createElement("li");
          //   var forecastTempLi = document.createElement("li");
          //   var forecastWindLi = document.createElement("li");
          //   var forecastHumidityLi = document.createElement("li");


          //   //***  Assign identifiers to FORECAST Card Elements   ***
          //   forecastCard.classList = "card forecast-card"
          //   forecastCardBody.classList = "card-body forecast-body"

          //   forecastCardTitle.classList = "card-title forecast-title"
          //   forecastCardUl.classList = "list-group forecast-list"
          //   forecastIconLi.classList = "list-group-item forecast-item ficon"
          //   forecastIconContainer.setAttribute("id", "icon")
          //   forecastIcon.classList = "forecastIcon"
          //   forecastTitle.classList = "list-group-item forecast-item forecast-title"
          //   forecastTempLi.classList = "list-group-item forecast-item ftemp"
          //   // fdegreeF = document.createElement("span");
          //   forecastWindLi.classList = "list-group-item forecast-item fwind"
          //   forecastHumidityLi.classList = "list-group-item forecast-item fhumidity"


          //   var forecastTime = data.daily[i].dt
          //   //convert to string from epoch seconds using Luxon
          //   var forecastDate = DateTime.fromSeconds(forecastTime).toLocaleString();
          //   console.log(forecastDate);


          //   //   ***   set content    ****/
          //   forecastCardTitle.innerHTML = forecastDate

          //   var iconCode = data.daily[i].weather[0].icon;
          //   console.log(iconCode);


          //   forecastIcon.innerHTML = "<img src='http://openweathermap.org/img/wn/" + iconCode + "@2x.png' width = '40px'>";

          //   degreeF.innerHTML = "&#x2109";
          //   forecastTempLi.textContent = "Temp: " + data.daily[i].temp.day + " " + degreeF.innerHTML
          //   forecastWindLi.textContent = "Wind: " + data.daily[i].wind_speed + " MPH"
          //   forecastHumidityLi.textContent = "Humidity: " + data.daily[i].humidity + " %"
          //   console.log(forecastTempLi.textContent);
          //   console.log(forecastWindLi.textContent);
          //   console.log(forecastHumidityLi.textContent);


          //   // //***  Append to Containers for Forecast Cards    ****
          //   forecastIconContainer.appendChild(forecastIcon)
          //   forecastIconLi.appendChild(forecastIconContainer)
          //   forecastCardGroup.appendChild(forecastCard)
          //   forecastCard.appendChild(forecastCardBody)
          //   forecastCardBody.append(forecastCardTitle, forecastCardUl)
          //   forecastCardUl.append(forecastIconLi, forecastTempLi, forecastWindLi, forecastHumidityLi)

        //  }