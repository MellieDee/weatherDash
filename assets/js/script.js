


  /***PSEUDO CODE FOR WEATHER APP ***/

// do I need to geocode first?? then enter that data intot he api weather call??
// search through all of the items i teh array until fin one where the CountQueuingStrategy, stat matchMedia.apply
// so first need to capture data from input field set to varthen recall that var to see if matches returened data at i
// then need to get the lat & lon  
// then need to put those L &L into the main API call to get the weather data

// then need to get specific parts of/attributs of that data
// and put into HTML divs and cards

// need to save to local storage those tillfed cards so they come up when buttons are pushed

/************************************* */




// var requestWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={minutely,hourly}&units{imperial}&appid={299ebedfe3926f8c9e100c54f9104d93}';

// fetch(requestWeather)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log('Got the weather');
//   });


var requestCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=Sacramento,CA,USA&limit=1&appid=299ebedfe3926f8c9e100c54f9104d93';

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


