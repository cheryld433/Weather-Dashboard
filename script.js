moment().format('L');

// Function: Current City Weather
function searchCity(cityName){

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";
    var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=ecc0be5fd92206da3aa90cc41c13ca56";

    $ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        console.log(response);
        console.log(queryURL);

        // empty divs
        $('#current').empty();
        // Date displayed with current weather
        var todayDate = moment().format('L');

        // create HTML: City information( current city, temp, humidity, wind speed.)
        var cityNameEL =$('<h2>').text(response.name);
        var dipslayTodayDate = cityNameEL.append('' + todayDate);
        var temperatureEl = $('<p>').text('Temperature' + response.main.temp);
        var humidityEl = $('<p>').text('Humidity:' + response.main.humidity);
        var windSpeedEl = $('WindSpeed:' + response.wind.speed);
        var currentWeather= response.weather[0].main;

        // If/Else statements for weather icon displayed with current weather:
        if(currentWeather === 'Clear') {
            var currentIcon = $('<img>').attr('src',"http://openweathermap.org/img/wn/01d@2x.png");
            currentIcon.attr('style', 'height: 50px; width: 50px');   
        } else if(currentWeather === 'Rain') {
            var currentIcon = $('<img>').attr('src',"http://openweathermap.org/img/wn/10d@2x.png");
            currentIcon.attr('style', 'height: 50px; width: 50px');   
        } else if(currentWeather === "Snow") {
            var currentIcon = $('<img>').attr('src',"http://openweathermap.org/img/wn/13d@2x.png");
            currentIcon.attr('style', 'height: 50px; width: 50px');   
        } else if(currentWeather === 'Clouds') {
            var currentIcon = $('<img>').attr('src',"http://openweathermap.org/img/wn/03d@2x.png");
            currentIcon.attr('style', 'height: 50px; width: 50px');   
        } else if(currentWeather === 'Thunderstorm') {
            var currentIcon = $('<img>').attr('src',"http://openweathermap.org/img/wn/11d@2x.png");
            currentIcon.attr('style', 'height: 50px; width: 50px');   
        }

        var newDivToAppend = $('<div>');
        newDivToAppend.append(dipslayTodayDate, currentIcon, temperatureEl, humidityEl,windSpeedEl);

        $('#currentDiv').html(newDivToAppend);
        
        // Get UV information:

var lon = response.coord.lon;
var lat = response.coord.lat;
var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=ecc0be5fd92206da3aa90cc41c13ca56&lat=" + lat  + "&lon=" + lon;
        
        $.ajax({
            url: queryURLUV,
            method: 'GET'
        }).then(function(response){
            console.log(response);
            console.log(queryURLUV);


            $('#displayUV').empty();
            var uvResponse = response.value;

            //Div for button for the UV Index
            var a = $('<button>');
            a.addClass('btn bg-success');
            a.text('UV Index:' + response.value);
            $("#displayUV").append(a);
        });

    });

    // Five Day Forecast Section
    $.ajax({
        url: queryForecastURL, 
        method: 'GET'
    }).then(function(response){
        console.log(response);
        console.log(queryForecastURL);

        var fiveDayResults = response.list;
        $('5dayForecast').empty();

        // for loop for 5 day forecast:
        for( var i =0; i <fiveDayResults.length; i += 8) {
            // Create div for 5 day forecast
            var fiveDayForecastDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");

            // Store responses from date, temp and humidity:
            var date = fiveDayResults[i].dt_txt;
            var setDate = date.subtr(0,10);
            var temperature = fiveDayResults[i].main.temp;
            var humidity = fiveDayResults[i].main.humidity;

            // create tags
            var header5Day = $("<h5 class='card-title'>").text(setDate);
            var pTemperature = $("<p class='card-text'>").text('Temp:' + temperature);
            var PHumididty = $("<p class='card-text'>").text('Humidity:' + humidity);

            var weather = fiveDayResults[i].weather[0].main;
            


        }
    })
}
