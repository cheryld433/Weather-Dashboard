// Variables
const APIKey = "&appid=74b07b805bb83652f9a7a5e6d787f7f7";


// Arrays
let cities = [];


$(document).ready(function(){
  let savedCities = JSON.parse(localStorage.getItem("cities")) || [];
     //on click function
    $('#searchBtn').on('click', function(){

    var cityName = $('#searchBar').val().trim();
    $('#searchBar').val('')

      setCityStorage(cityName);
      console.log(savedCities);
        
        
  });

    // Here we are building the URL we need to query the database
  const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" 
  + cities + "&appid=74b07b805bb83652f9a7a5e6d787f7f7";
    
    //getWeather
  function getWeather(cityName){
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
    console.log(queryURL);
    console.log(response);
    });
 




  //set storage
  function setCityStorage(cityName){

    if(savedCities.indexOf(cityName) === -1){
      savedCities.push(cityName);
      localStorage.setItem("cities", JSON.stringify(savedCities));
      createNewCityListItem(cityName);
    }
    
    function createNewCityListItem(cityName){
      var li = $("<li>").addClass("list-group-item list-group-item-action").text(cityName);
      $('#history').append(li);
    }
  }
  
}


