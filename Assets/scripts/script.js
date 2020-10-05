var cities = [];

// function to add city information for the main section of the site
function displayCityInfo() {
  let city = "seattle";
  let currentURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=9d164725063daa41aec86f0eecbfed4a";

  $.ajax({
    url: currentURL,
    method: "GET",
    
  }).then(function (responseC) {
    console.log(responseC);
    $("#city-name").text(responseC.name);
    $("#city-temp").html(
      "Temperature: " +
        convertKToF(parseFloat(responseC.main.temp)).toFixed(2) +
        "&deg;F"
    );
    let uvUrl =
      "http://api.openweathermap.org/data/2.5/uvi?lat=" +
      responseC.coord.lat +
      "&lon=" +
      responseC.coord.lon +
      "&appid=9d164725063daa41aec86f0eecbfed4a";
    $.ajax({
      url: uvUrl,
      method: "GET",
    }).then(function (responseU) {
      console.log(responseU);
      $("#city-uvIndex").text(responseU.value);
    }).done(function(){
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
    })
  });
}

displayCityInfo();
// function to add the city button which will call the the display info function to add the button and display
function addCityBtn() {}

function convertKToF(tempInKelvin) {
  return ((tempInKelvin - 273.15) * 9) / 5 + 32;
}

// $(document).ready(function(){
// $(document).ajaxSuccess(function () {
    
    
 
// })
// })