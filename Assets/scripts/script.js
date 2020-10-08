$(document).ready(function(){
let cities = [];
let states = [];
let countries = [];
let citiesObj = [];
let storedCities = localStorage.getItem("storedCityInfo");
$("#forecast-1").text(moment().add(1,"d").format("L"));
$("#forecast-2").text(moment().add(2,"d").format("L"));
$("#forecast-3").text(moment().add(3,"d").format("L"));
$("#forecast-4").text(moment().add(4,"d").format("L"));
$("#forecast-5").text(moment().add(5,"d").format("L"));
// function to add city information for the main section of the site
if (storedCities) {
  cities = JSON.parse(storedCities);
  console.log(cities);
  addCityBtn();
}

Array.prototype.removeCity = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};

function displayCityInfo() {
  let city = $(this).attr("data-city-name");
  let cityEl = $(this);
  let currentURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=9d164725063daa41aec86f0eecbfed4a&units=imperial";
  let fiveDayURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=9d164725063daa41aec86f0eecbfed4a&units=imperial";
  $.ajax({
    url: currentURL,
    method: "GET",
    error: function(){
      nullNotification();
      cities.removeCity(city);
      $(cityEl).remove();
      storedCities = JSON.stringify(cities);
      localStorage.setItem("storedCityInfo", storedCities);
      console.log(cities);
      nullNotification();
    },
    success: function(responseC){
        console.log(responseC);
        let iconCode = responseC.weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        $("#city-name").html(
          responseC.name +
            "(" +
            moment().format("L") +
            ")" +
            "<img src='" +
            iconUrl +
            "'>"
        );
        $("#city-temp").html("Temperature: " + responseC.main.temp + "&deg;F");
        $("#city-humidity").text("Humidity: " + responseC.main.humidity + "%");
        $("#city-windSpeed").text("Wind Speed: " + responseC.wind.speed + "mph");
        let uvUrl =
          "http://api.openweathermap.org/data/2.5/uvi?lat=" +
          responseC.coord.lat +
          "&lon=" +
          responseC.coord.lon +
          "&appid=9d164725063daa41aec86f0eecbfed4a";
        $.ajax({
          url: uvUrl,
          method: "GET",
        })
          .then(function (responseU) {
            console.log(responseU);
            $("#city-uvIndex").text(responseU.value);
            if (parseFloat(responseU.value) <= 2) {
              $("#city-uvIndex").removeClass("bg-success");
              $("#city-uvIndex").removeClass("bg-warning");
              $("#city-uvIndex").removeClass("bg-danger");
              $("#city-uvIndex").removeClass("bg-high");
              $("#city-uvIndex").addClass("bg-success");
            } else if (parseFloat(responseU.value) <= 5) {
              $("#city-uvIndex").removeClass("bg-success");
              $("#city-uvIndex").removeClass("bg-warning");
              $("#city-uvIndex").removeClass("bg-danger");
              $("#city-uvIndex").removeClass("bg-high");
              $("#city-uvIndex").addClass("bg-warning");
            } else if (parseFloat(responseU.value) <= 7) {
              $("#city-uvIndex").removeClass("bg-success");
              $("#city-uvIndex").removeClass("bg-warning");
              $("#city-uvIndex").removeClass("bg-danger");
              $("#city-uvIndex").removeClass("bg-high");
              $("#city-uvIndex").addClass("bg-high");
            } else {
              $("#city-uvIndex").removeClass("bg-success");
              $("#city-uvIndex").removeClass("bg-warning");
              $("#city-uvIndex").removeClass("bg-danger");
              $("#city-uvIndex").removeClass("bg-high");
              $("#city-uvIndex").addClass("bg-danger");
            }
          });
    }
  })
  $.ajax({
    url: fiveDayURL,
    method: "GET",
  }).then(function (responseF) {
    console.log(responseF);
    let forecastTempArr = [];
    let forecastHumidityArr = [];
    let forecastIconArr = [];
    for (let i = 0; i < responseF.list.length; i++) {
      if (responseF.list[i].dt_txt === moment().add(1, "d").format("YYYY-MM-DD") + " 12:00:00" || responseF.list[i].dt_txt === moment().add(2, "d").format("YYYY-MM-DD") + " 12:00:00" || responseF.list[i].dt_txt === moment().add(3, "d").format("YYYY-MM-DD") + " 12:00:00" || responseF.list[i].dt_txt === moment().add(4, "d").format("YYYY-MM-DD") + " 12:00:00" || responseF.list[i].dt_txt === moment().add(5, "d").format("YYYY-MM-DD") + " 12:00:00"){
        forecastTempArr.push(responseF.list[i].main.temp);
        forecastHumidityArr.push(responseF.list[i].main.humidity);
        forecastIconArr.push(responseF.list[i].weather[0].icon);
      }
    }
    console.log(forecastTempArr);
    console.log(forecastHumidityArr);
    console.log(forecastIconArr);
    $(".forecast-temp").each(function (arr){
      return $(this).text(forecastTempArr[arr]);
    })
    $(".forecast-humidity").each(function (arr){
      return $(this).text(forecastHumidityArr[arr]);
    })
    $(".forecast-icon").attr("src", function(arr){
      return "http://openweathermap.org/img/w/" + forecastIconArr[arr] + ".png";
    })
    // console.log(forecastHumiditySpan);
    // console.log(forecastTempSpan);
  });
}


// function to add the city button which will call the the display info function to add the button and display
function addCityBtn() {
 
  $("#city-list").empty()

 for (let i = 0; i < cities.length; i++) {

  let newCityBtn = $("<button>");

  newCityBtn.addClass("list-group-item list-group-item-action new-city-btn");

  newCityBtn.attr("data-city-name", cities[i]);

  newCityBtn.html(cities[i] + "<button type='button' class='close delete-btn' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");

  $("#city-list").prepend(newCityBtn);

 }
}

$("#city-search-btn").on("click", function(event){
  event.preventDefault();
  
  console.log(cities);
  let cityName = $("#city-search").val();
  let cityState = $("#state-search").val();

  let cityCountry = $("#country-search").val();

  if(!$("#city-search").val()){
    return
  }
  
  console.log(cityName)
  let cityNameLower = cityName.toLowerCase();
if(cities.includes(cityNameLower)) {
  
  duplicateNotification();
 
} else {
  cities.push(cityNameLower);
  states.push(cityState);
  countries.push(cityCountry);
  storeCityStateObj();
}
})

function storeCityStateObj () {
  citiesObj = (cities.map((s,i) => ({city: cities[i], state: states[i], country: countries[i]}) ));
  console.log(citiesObj);
  storedCities = JSON.stringify(cities);
  localStorage.setItem("storedCityInfo", storedCities);
  addCityBtn();
  console.log(citiesObj[1].country);
}

$("#advanced-search").on("click", function(){
  $("#state-search").attr("style", "display: inline-block");
  $("#country-search").attr("style", "display: inline-block");
  $(this).removeClass("active");
  $(this).addClass("disabled");
})

$(document).on("click", ".new-city-btn", displayCityInfo);


$(document).on("click", ".delete-btn", function(){
  console.log($(this).parent().attr("data-city-name"))
  cities.removeCity($(this).parent().attr("data-city-name"));
  $(this).parent().remove();
  console.log(cities);
  storedCities = JSON.stringify(cities);
  localStorage.setItem("storedCityInfo", storedCities);
})

function duplicateNotification() {
  $("#city-error").attr("style", "display: inline-block")
  
  duplicateInterval = setInterval(function () {
    // sets the notification to display for only 1 second
    let duplicateTime = 1;
    duplicateTime--;
    if (duplicateTime === 0) {
      // clears the interval to ready for the next call of the function
      clearInterval(duplicateInterval);
      // sets the display to none to hide the notification in preparation for the next call
      $("#city-error").attr("style", "display: none");
     
    }
  }, 1000);
}

function nullNotification() {
  $("#city-null").attr("style", "display: inline-block")
  
  nullInterval = setInterval(function () {
    // sets the notification to display for only 1 second
    let nullTime = 1;
    nullTime--;
    if (nullTime === 0) {
      // clears the interval to ready for the next call of the function
      clearInterval(nullInterval);
      // sets the display to none to hide the notification in preparation for the next call
      $("#city-null").attr("style", "display: none");
     
    }
  }, 1000);
}


})

