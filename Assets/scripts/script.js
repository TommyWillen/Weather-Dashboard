var cities = [];
$("#forecast-1").text(moment().add(1,"d").format("L"));
$("#forecast-2").text(moment().add(2,"d").format("L"));
$("#forecast-3").text(moment().add(3,"d").format("L"));
$("#forecast-4").text(moment().add(4,"d").format("L"));
$("#forecast-5").text(moment().add(5,"d").format("L"));
// function to add city information for the main section of the site
function displayCityInfo() {
  let city = "seattle";
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
  }).then(function (responseC) {
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
      })
      .done(function () {
        console.log($("#city-uvIndex").text());
        if (parseFloat($("#city-uvIndex").text()) <= 2) {
          $("#city-uvIndex").removeClass("bg-success");
          $("#city-uvIndex").removeClass("bg-warning");
          $("#city-uvIndex").removeClass("bg-danger");
          $("#city-uvIndex").removeClass("bg-high");
          $("#city-uvIndex").addClass("bg-success");
        } else if (parseFloat($("#city-uvIndex").text()) <= 5) {
          $("#city-uvIndex").removeClass("bg-success");
          $("#city-uvIndex").removeClass("bg-warning");
          $("#city-uvIndex").removeClass("bg-danger");
          $("#city-uvIndex").removeClass("bg-high");
          $("#city-uvIndex").addClass("bg-warning");
        } else if (parseFloat($("#city-uvIndex").text()) <= 7) {
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
  });
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

displayCityInfo();
// function to add the city button which will call the the display info function to add the button and display
function addCityBtn() {}

// $(document).ready(function(){
// $(document).ajaxSuccess(function () {

// })
// })
