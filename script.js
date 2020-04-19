// Local Storage:
var lastSearch = JSON.parse(localStorage.getItem("cityName")) || [];
$(document).ready(function(){


moment().format('L');

searchCity(lastSearch[lastSearch.length -1]);
loadPage();
// Function for citySearch:
function searchCity(cityname) {

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";
    var queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);

        // If statement:
        if(lastSearch.indexOf(cityname) === -1){
            lastSearch.push(cityname);
            localStorage.setItem("cityName", JSON.stringify(lastSearch));
            loadPage();
        }

        // Current date:
        $("#current-weather").empty();
       var todayDate = moment().format('L');
 
        var cityNameEl = $("<h2>").text(response.name);
        var displayTodayDate = cityNameEl.append(" " + todayDate);
        var temperatureEL = $("<p>").text("Temperature: " + response.main.temp);
        var humidityEl = $("<p>").text("Humidity: " + response.main.humidity);
        var windSpeedEl = $("<p>").text("Wind Speed: " + response.wind.speed);
        var currentWeather = response.weather[0].main;

        if (currentWeather === "Clear") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
            currentIcon.attr("style", "height: 70px; width: 70px");

        } else if (currentWeather === "Clouds") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
            currentIcon.attr("style", "height: 70px; width: 70px");

        } else if (currentWeather === "Rain") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
            currentIcon.attr("style", "height: 70px; width: 70px");
        }
         else if (currentWeather === "Thunderstorm") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/11d.png");
            currentIcon.attr("style", "height: 70px; width: 70px");
        }
         else if (currentWeather === "Snow") {
            var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
            currentIcon.attr("style", "height: 70px; width: 70px");
        }
       // New Div for current weather
        var newDiv = $('<div>');
        newDiv.append(displayTodayDate, currentIcon, temperatureEL, humidityEl, windSpeedEl);
        $("#current-weather").html(newDiv);
        
// Function got UV Index:
var lat = response.coord.lat;
var lon = response.coord.lon;
var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=" + lat  + "&lon=" + lon;

        $.ajax({
            url: queryURLUV,
            method: 'GET'
        }).then(function (response) {
            $('#uvIndexDisplay').empty();
            var uvResults = response.value;
            //create HTML for new div
            var uvIndexEl = $("<button class='btn bg-success'>").text("UV Index: " + response.value);
      
            $('#uvIndexDisplay').html(uvIndexEl);
    
        });
    });

    // Function for 5 day forecast:

    $.ajax({
        url: queryURLforecast,
        method: 'GET'
    }).then(function (response) {
        var results = response.list;
        //empty 5day div:
        $("#5dayForecast").empty();
        //create HTML for 5day forcast: get from bootstrap
        for (var i = 0; i < results.length; i += 8) {
            // Creating a div: 
            var fiveDayForecastDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
            
            
            var date = results[i].dt_txt;
            var setDate = date.substr(0,10)
            var temp = results[i].main.temp;
            var hum = results[i].main.humidity;
   
            //creating tags 
            var h6date = $("<h6 class='card-title'>").text(setDate);
            var pTemp = $("<p class='card-text'>").text("Temp: " + temp);;
            var pHum = $("<p class='card-text'>").text("Humidity " + hum);;
            var weather = results[i].weather[0].main

            if (weather === "Clear") {
                var iconImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                iconImg.attr("style", "height: 30px; width: 30px");

            } else if (weather === "Clouds") {
                var iconImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                iconImg.attr("style", "height: 30px; width: 30px");
            } 
             else if (weather === "Rain") {
                var iconImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                iconImg.attr("style", "height: 30px; width: 30px");
            }
             else if (weather === "Thunderstorm") {
                var iconImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/11d.png");
                iconImg.attr("style", "height: 30px; width: 30px");
            }
             else if (weather === "Snow") {
                var iconImg = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                iconImg.attr("style", "height: 30px; width: 30px");
            }

            fiveDayForecastDiv.append(h6date);
            fiveDayForecastDiv.append(iconImg);
            fiveDayForecastDiv.append(pTemp);
            fiveDayForecastDiv.append(pHum);
            $("#5dayForecast").append(fiveDayForecastDiv);
        }
    });
}


$("#select-city").on("click", function (event) {

    event.preventDefault();
    
    var cityInput = $("#city-input").val().trim();
    $("#city-input").val("")
  if(cityInput){
    searchCity(cityInput);
   
  } else {
      alert("please enter city name!");
  }
});


function loadPage () {
    $("#searchHistory").empty();
   lastSearch.forEach(cityName => {
          var searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(cityName);
    var psearch = $("<div>");
    psearch.append(searchDiv)
    $("#searchHistory").append(psearch);
   })
 
}


$("#searchHistory").on('click', '.btn', function(event) {
event.preventDefault();
    console.log($(this).text());
    searchCity($(this).text());

});

});