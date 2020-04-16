//variables
let APIKey = "";
// Arrays
let cities =[];

$(document).ready(function(){
    let savedCities = JSON.parse(localStorage).getItem('cities') || [];
    $('#searchBtn').on('click',function(){
        let cityName = $('#searchBar').val().trim();
        $("searchBar").val('');
        setCityStorage(cityName);
        console.log(savedCities);
    });

    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" 
    + cities + "&appid=74b07b805bb83652f9a7a5e6d787f7f7";

    //get weather
    function getWeater(cityName){
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            console.log(queryURL);
            console.log(response);
        })
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
