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

function createBtn(city) {
    cityAsk.textContent = city;
    cityAsk.classList = "butn btn-infor btn-block"
    cityAsk.setAttribute
}


var buttonClickHandler = function (event) {
    var language = event.target.getAttribute('data-language');

}

cityNameInput.addEventListener('click', CitySubmitHandler)


