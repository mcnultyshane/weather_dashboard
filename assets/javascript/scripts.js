// variables for html sections
var cityNameInput = document.querySelector("#search-button");
var cityNameForm = document.querySelector(".form-control");
var weathContainer = document.querySelector(".weather-container");
var currentBox = document.querySelector(".current-box");
var dayCard = document.getElementsByClassName('day-card');
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

    fetch(weatherApi)
        .then(function (response) {
            if (!response || response.ok) {
                throw new Error('There was an error');
            };
            return response.json();

        })
        .then(function (response) {
            cityDiv.classlist = 'temp-div';
            weathContainer.appendChild(cityDiv);

            cityInfoDiv.classList = 'detail-div';
            weathContainer.appendChild(cityInfoDiv)

            nameEl.innerHTML = "<h2 class='secondary-text'>Current Weather for <span class='font-weight-bold'>" + response.name + "</span></h2><br><img class='icon' src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt=Current weather icon/><br><br><h2 class='font-weight-bold secondary-text'>" + date + "</h2><br>";
            cityDiv.appendChild(nameEl);

            tempEl.innerHTML = "<h3 class='secondary-text'>Current Temperature:<span class='font-weight-bold'>" + " " + Math.round(response.main.temp) + "&#176F</span></h3><br>";

            humidEl.innerHTML = "<h4 class='secondary-text'>Humidity:<span class='font-weight-bold'>" + " " + response.main.humidity + "%</span></h4>";
            cityDiv.appendChild(humidEl);

            windEl = "<h4 class='secondary-text'>Wind Speed:<span class='font-weight-bold'>" + " " + Math.round(response.wind.speed) + " MPH</span></h4>";
            cityDiv.appendChild(windEl);


            // grabbing UV information
            return fetch("https://api.openweathermap.org/data/2.5/uvi?appid=7aa46cc940f1317aa850cdc655c09d9e&lat=" + response.coord.lat + "&lon=" + response.coord.lon);
        })
        .then(function (uvFetch) {
            return uvFetch.json();
        })
        .then(function (uvResponse) {
            uvBubble.setAttribute("id", "uv-index");
            uvBubble.classList = "seconday-text uv-class";
            cityDiv.appendChild(uvBubble)

            var uvValue = uvResponse.value;
            uvIndex.innerHTML = "UV Index: ";

            uvDisplay.setAttribute("id", "uv-index");
            uvDisplay.innerHTML= uvValue;
            uvBubble.appendChild(uvIndex);
            uvBubble.appendChild(uvDisplay);

            if (uvResponse.value > 7) {
                document.querySelector("#uv-index").classList = "uv-result rounded bg-danger";
            } else if (uvResponse.value >= 2 && uvResponse.value <= 7) {
                document.querySelector("#uv-index").classList = "uv-result rounded bg-warning";
            } else if (uvResponse.value <= 2) {
                document.querySelector("#uv-index").classList = "uv-result rounded bg-success";
            }

            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + uvResponse.lat + "&lon=" + uvResponse.lon + "&appid=7aa46cc940f1317aa850cdc655c09d9e&units=imperial");

        })

}
}




// function for city search

var CitySubmitHandler = function (event) {
    event.preventDefault();
    // search button submit
    var cityGroup = cityNameInput.value.trim().toUpperCase();
    console.log(cityGroup);

    if (citygroup) {
        weatherAsk(cityGroup);
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