//variables
let APIKey = "";
// Arrays
let cities =[];

$(document).ready(function(){
    let savedCities = JSON.parse(localStorage.getItem('cities')) || [];
    $('#searchBtn').on('click',function(){
        let cityName = $('#searchBar').val().trim();
        $("#searchBar").val('');
        setCityStorage(cityName);
        console.log(savedCities);
    });

    function getWeather(cityName){

    }

    function getUV(long,lat){


    }

    function getForecast(cityName){


    }


    function setCityStorage(cityName){

        if(savedCities.indexOf(cityName) === -1){
            savedCities.push(cityName);
            localStorage.setItem('cities', JSON.stringify(savedCities));
            createNewCityListItem(cityName);
            
        }

        function createNewCityListItem(cityName) {
            let li = $('<li>').addClass('list-group-item list-group-item-action').text(cityName);
            $('#history').append(li);
        }

    }

    


});