// variables for html sections
var cityNameInput = document.querySelector(".cityGroup");
var cityNameForm = document.querySelector(".form-control");
var weathContainer = document.querySelector(".weather-container");
var currentBox = document.querySelector(".current-box");
var dayCard= document.getElementsByClassName('day-card');
var fivedayRow = document.querySelector('five-day-box');

// variables for appending the document once we have information
var cityDiv = document.createElement('div');
var cityInfoDiv = document.createElement('div');
var nameEl = document.createElement('div');
var tempEl = document.createElement('div');
var humidEl = document.createElement('div');
var windEl = document.createElement('div');
var uvBubble = document.createElement('div');
var uvIndex = document.createElement("h4");
var uvDisplay = document.createElement('div');



var cityButtons;
// variables for pulling API search
// var apiKey = "7aa46cc940f1317aa850cdc655c09d9e";
var searchBtn = $(".searchbutton");
var date = moment().format('ll');

// function for pulling API data
var weatherAsk = function (city) {
    if (!city) {
        return;
    };

    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=7aa46cc940f1317aa850cdc655c09d9e";

    fetch (weatherApi)
        .then(function (response) {
            if (!response || response.ok) {
                throw new Error('There was an error');
            };
            return response.json();
        
        })
        .then (function (response) {
            cityDiv.classlist = 'temp-div';
            weathContainer.appendChild(cityDiv);
        
            cityInfoDiv.classList = 'detail-div';
            weathContainer.appendChild(cityInfoDiv)


        }
}




// function for city search

var CitySubmitHandler = function (event) {
    event.preventDefault();

    var cityGroup = cityNameInput.value.trim().toUppercase();
    console.log(cityGroup);

    if (citygroup) {
    getCityInfo(cityGroup);
    createBtn(cityGroup);
    searchHist();
    
    } else {
        alert('Please enter a city name to see the current forcast.');
    }

};
// creating button for city searches
function createBtn(city) {
    cityAsk.textContent = city;
    cityAsk.classList = "butn btn-infor btn-block"
    cityAsk.setAttribute = ("data-city", city);
    cityAsk.setAttribute = ("type", submit);
    cityAsk.setAttribute = ("id", "city-" + city);

}


var buttonClickHandler = function (event) {
    var language = event.target.getAttribute('data-language');

}

cityNameInput.addEventListener('click', CitySubmitHandler)


