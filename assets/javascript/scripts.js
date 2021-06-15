var cityNameInput = document.querySelector(".cityGroup");
var cityNameForm = document.querySelector(".form-control");
var weathContainer = document.querySelector(".weather-container");
var currentBox = document.querySelector(".current-box");
var dayCard= document.getElementsByClassName('day-card');
var fivedayRow = document.querySelector('five-day-box');


var uvIndex;
var cityButtons;

var apiKey = "7aa46cc940f1317aa850cdc655c09d9e";
var searchBtn = $(".searchbutton");





var CitySubmitHandler = function (event) {
    event.preventDefault();

    var cityGroup = cityNameInput.nodeValue.trim();
    console.log(cityGroup);

    if (citygroup) {
    getCityInfo (cityGroup);
    weathContainer.textContent = '';
    // add another variable for data city name submission
    } else {
        alert('Please enter a city name');

}

};
var buttonClickHandler = function (event) {
    var language = event.target.getAttribute('data-language');

}

cityNameInput.addEventListener('click', CitySubmitHandler)


