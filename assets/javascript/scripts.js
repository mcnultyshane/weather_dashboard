// variables for html sections
var cityNameInput = document.getElementById("city-input");
var searchBtn = document.getElementById("searchBtn");
var weathContainer = document.querySelector(".weather-container");
var currentBox = document.querySelector(".current-box");
var dayCard = document.getElementsByClassName('day-card');
var fivedayRow = document.querySelector('five-day-box');
var deleteBtn = document.getElementById("dlt-btn");

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

var fiveDay = document.querySelector("#five-day");
var searchHistoryDiv = document.getElementById("search-history");
var cityCount = 1;

// variables for pulling API search
// var apiKey = "7aa46cc940f1317aa850cdc655c09d9e";
var date = moment().format('ll');

// function for pulling API data
var weatherAsk = function (cityGroup) {
    if (!cityGroup) {
        return;
    };

    var weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityGroup + "&units=imperial&APPID=7aa46cc940f1317aa850cdc655c09d9e";
    console.log("this is weatherAPI on line 35: " + weatherApi);

    fetch(weatherApi)
        .then(function (response) {
            
            // if (!response || response.ok) {
            //     throw new Error('There was an error on line 42');
            // };

            return response.json();
            
        })
        .then(function (response) {
            cityDiv.classlist = 'temp-div border border-3';
            weathContainer.appendChild(cityDiv);

            cityInfoDiv.classList = 'detail-div';
            weathContainer.appendChild(cityInfoDiv)

            nameEl.innerHTML = "<h2 class='secondary-text'>Current Weather for <span class='font-weight-bold'>" + response.name + "</span></h2><br><img class='icon' src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png' alt=Current weather icon/><br><h2 class='font-weight-bold secondary-text'>" + date + "</h2><br>";
            cityDiv.appendChild(nameEl);

            tempEl.innerHTML = "<h3 class='secondary-text'>Current Temperature:<span class='font-weight-bold'>" + " " + Math.round(response.main.temp) + "&#176F</span></h3><br>";
            cityDiv.appendChild(tempEl);

            humidEl.innerHTML = "<h4 class='secondary-text'>Humidity:<span class='font-weight-bold'>" + " " + response.main.humidity + "%</span></h4>";
            cityDiv.appendChild(humidEl);

            windEl.innerHTML = "<h4 class='secondary-text'>Wind Speed:<span class='font-weight-bold'>" + " " + Math.round(response.wind.speed) + " MPH</span></h4>";
            cityDiv.appendChild(windEl);


            // grabbing UV information
            return fetch("https://api.openweathermap.org/data/2.5/uvi?appid=7aa46cc940f1317aa850cdc655c09d9e&lat=" + response.coord.lat + "&lon=" + response.coord.lon);
        })
        .then(function (uvFetch) {
            return uvFetch.json();
        })
        .then(function (uvResponse) {
            uvBubble.setAttribute("id", "uv-index");
            uvBubble.classList = "uv-class";
            cityDiv.appendChild(uvBubble)

            var uvValue = uvResponse.value;
            uvIndex.innerHTML = "UV Index: ";

            uvDisplay.setAttribute("id", "uv-index");
            uvDisplay.innerHTML = uvValue;
            uvBubble.appendChild(uvIndex);
            uvBubble.appendChild(uvDisplay);

            if (uvResponse.value > 7) {
                document.querySelector("#uv-index").classList = "uv-result badge rounded-pill text-wrap text-white  bg-danger w-25";
            } else if (uvResponse.value >= 2 && uvResponse.value <= 7) {
                document.querySelector("#uv-index").classList = "uv-result badge text-wrap rounded-pill bg-warningw-25 ";
            } else if (uvResponse.value <= 2) {
                document.querySelector("#uv-index").classList = "uv-result badge text-wrap rounded-pill bg-success w-25";
            }

            return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + uvResponse.lat + "&lon=" + uvResponse.lon + "&appid=7aa46cc940f1317aa850cdc655c09d9e&units=imperial");

        })
        .then(function (forecastResponse) {
            return forecastResponse.json();
        })
        .then(function (forecastResponse) {
            // for loop to display 5 day forecast
            for (var i = 1; i < 6; i++) {
                var forecastEl = document.createElement("div");
                forecastEl.classList = "forecast-card d-inline-flex flex-column card-body rounded-3 border border-dark bg-info text-light me-2 mb-5";
                fiveDay.appendChild(forecastEl);

                // display date 
                var dateDiv = document.createElement("div");
                dateDiv.classList = "secondary-text card-title";
                var forecastDate = moment.utc(forecastResponse.daily[i].dt * 1000).format("dddd, MMM DD");
                dateDiv.innerHTML = "<h5 class='font-weight-bold'>" + forecastDate + "</h5>";
                forecastEl.appendChild(dateDiv);

                // weather icon
                var iconDiv = document.createElement("div");
                iconDiv.innerHTML = "<img src='http://openweathermap.org/img/w/" + forecastResponse.daily[i].weather[0].icon + ".png' class='forecast-icon' alt=Current weather icon/>";
                forecastEl.appendChild(iconDiv);

                // display day temperature forecast
                var tempDiv = document.createElement("div");
                tempDiv.classList = "card-text secondary-text";
                tempDiv.innerHTML = "<h6>Day Temp:<span>" + " " + Math.round(forecastResponse.daily[i].temp.day) + "&#176F</span></h6>" + "<h6>Night Temp:<span>" + " " + Math.round(forecastResponse.daily[i].temp.night) + " &#176F</span></h6>";
                forecastEl.appendChild(tempDiv);

                // display humidity forecast
                var humidDiv = document.createElement("div");
                humidDiv.classList = "card-text secondary-text";
                humidDiv.innerHTML = "<h6>Humidity:<span>" + " " + forecastResponse.daily[i].humidity + "%</span></h6>";
                forecastEl.appendChild(humidDiv);
            }
        })
        .catch(function (error) {
            removePrevious();
            alert(error.message);
            document.querySelector("#searchBtn").value = "";
            return;
        });
};
// // function for city search

var CitySubmitHandler = function (event) {
    event.preventDefault();
    // search button submit
    var cityGroup = cityNameInput.value.trim().toUpperCase();
    console.log("This is the value on 143: " + cityGroup);

    if (cityGroup) {
        weatherAsk(cityGroup);
        createBtn(cityGroup);
        storeHistory();

    } else {
        alert('Please enter a city name to see the current forecast.');
    }

};
// creating button for city searches
function createBtn(cityGroup) {
    var cityAsk = document.createElement("button");
    cityAsk.textContent = cityGroup;
    cityAsk.classList = "btn newBtn btn-infor shadow btn-block bg-secondary bg-gradient text-white mb-3"
    cityAsk.setAttribute("data-city", cityGroup);
    cityAsk.setAttribute("type", "submit");
    cityAsk.setAttribute("id", "city-" + cityGroup);

    searchHistoryDiv.prepend(cityAsk);

};

function clearHistory() {
    var searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
    for (var i = 0; i < searchedCities.length; i++) {
        document.getElementById("city-" + searchedCities[i]).remove();

    }
    localStorage.clear("searchedCities");
};

function storeHistory() {
    var userSearch = document.querySelector("#city-input").value.trim().toUpperCase();
    console.log("this is line 177 log: " + userSearch);

    if (!userSearch) {
        return;
    }
    var previousSearchCity = JSON.parse(localStorage.getItem("searchedCities")) || [];
    previousSearchCity.push(userSearch);
    localStorage.setItem("searchedCities", JSON.stringify(previousSearchCity));

    document.querySelector("#searchBtn").value = "";

    removePrevious();
};

function loadHistory() {
    if (localStorage.getItem("searchedCities")) {
        var previousSearchCity = JSON.parse(localStorage.getItem("searchedCities"));
        console.log(previousSearchCity);
        for (var i = 0; i < previousSearchCity.length; i++) {
            createBtn(previousSearchCity[i]);
        }
    };

    for (i = 0; i < document.getElementsByClassName("newBtn").length; i++) {
        document.getElementsByClassName("newBtn")[i].addEventListener('click', function () {
            var btnClicked = this.getAttribute("data-city");
            weatherAsk(btnClicked);
            console.log("This is button on 204 value: " + btnClicked);
            removePrevious();
        });
    }
};

var removePrevious = function () {
    nameEl.remove();
    uvBubble.remove();
    fiveDay.innerHTML = "";
    tempEl.remove();
    humidEl.remove();
    windEl.remove();
};

searchBtn.addEventListener("click", CitySubmitHandler);
deleteBtn.addEventListener("click", clearHistory);

loadHistory();