// variables
let listCitiesDiv = document.getElementById("citySearch");

// arrays
let cities=[];


//functions:
function init() {
 // getItem()
     //pull saved city form local storage
     // fill array with it.
     let savedCities = JSON.parse(localStorage).getIten("cities");
     if (savedCities !== null) {
       cities = savedCities;
       console.log(cities);

       renderButtons()
     }
      // Fuction to store cities. Set local storage for the cities in the array.
      // will be refering to storeCities function in on click functions.
     function storeCities() {
       localStorage.setItem("cities", JSON.stringify(cities));
       console.log(localStorage);
     }

     // Fuction for rendering the search button and the the "button" to toggle between cities the user chooses.

    function renderButtons() {
      // render to the city div in the HTML file
      // Empty listCitiesDiv to store info.
      listCitiesDiv.innerHTML("");

      if(cities == null) {
        return;
      }
      // set() creates a new object(lets us store unique values of any type.).  
      // let uniqueArray = [...new Set([5,5,2,2,2,4,2])];
      // for loop
      
      let uniqueArray = [...new Set(cities)];
      for ( let i=0; i < uniqueArray.length; i++);
      let cityName = uniqueArray[i];
      console.log(uniqueArray);
      /*  two buttons one already located in the HTML will search for the city, 
      one to be created that will toggle between cities the user has chosen. 
      Need to :
            create, textContent, setAttribute, and append the button to the other button, 
             ListCitiesDiv. append.child(buttonEl);
      */
      let buttonEl = document.createElement("button");
      buttonEl.textContent = uniqueArray;
      buttonEl.setAttribute("class", newButton);

      






      


    }
    
     



}
 










     /* GIVEN a weather dashboard with form inputs
      WHEN I search for a city
       search container: 
        user input data for city search.
        (JSON)  local storage.

        .on('click') event to find-movie. This will trigger an ajax call

        prevent default 
        grab text from input box
        construct URL
        hit the queryURL with ajax
        display response data in city view div
        
        button to trigger our AJAX call, this 



    

    <!-- We'll be dumping our JSON contents in here -->


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript">
      // This .on("click") function will trigger the AJAX Call
      $("#find-movie").on("click", function(event) {

        // event.preventDefault() can be used to prevent an event's default behavior.
        // Here, it prevents the submit button from trying to submit a form when clicked
        event.preventDefault();

        // Here we grab the text from the input box
        var movie = $("#movie-input").val();

        // Here we construct our URL
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

        // Write code between the dashes below to hit the queryURL with $ajax, then take the response data
        // and display it in the div with an id of movie-view */









 