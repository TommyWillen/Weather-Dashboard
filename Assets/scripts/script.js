
// waits for html and css before loading js
$(document).ready(function () {
  // global variable that stores city names from search
  let cities = [];
  // stores state name from advanced search
  let states = [];
  // stores countries from advanced search
  let countries = [];
  // stores the above 3 arrays as and array of objects
  let citiesObj = [];
  let cityIdArray = [];
  // console.log(cityIdArray);

  // pulls stored information from local storage
  let storedCities = localStorage.getItem("storedCityInfo");
  // sets the dates for the five day forcast
  $("#forecast-1").text(moment().add(1, "d").format("L"));
  $("#forecast-2").text(moment().add(2, "d").format("L"));
  $("#forecast-3").text(moment().add(3, "d").format("L"));
  $("#forecast-4").text(moment().add(4, "d").format("L"));
  $("#forecast-5").text(moment().add(5, "d").format("L"));
  // Check to see if there is stored information and adds the buttons for the stored cities
  if (storedCities) {
    citiesObj = JSON.parse(storedCities);
    for (let i = 0; i < citiesObj.length; i++){
      cities.push(citiesObj[i].city);
      states.push(citiesObj[i].state);
      countries.push(citiesObj[i].country);
      cityIdArray.push(citiesObj[i].id);
    }
    // console.log(citiesObj);
    addCityBtn();
  }
  // loads the most recently searched for city
  if ($('#city-list').children().length > 0) {
    $(function () {
      $(".new-city-btn").first().click();
    }
    )
  }
  // function to display all of the city weather information including current weather, uv index and 5-day forecast
  function displayCityInfo() {
    // uses data attributes from button pressed to identify parameter for the city search
    let city = $(this).attr("data-city-name");
    let state = $(this).attr("data-state-name");
    let country = $(this).attr("data-country-name");
    // creating local element variable for the button to be manipulated in the function
    let cityEl = $(this)
    // api url for the current day weather
    let currentURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city + "," + state + "," + country +
      "&appid=9d164725063daa41aec86f0eecbfed4a&units=imperial";
    // api url for the 5 day forecast
    let fiveDayURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city + "," + state + "," + country +
      "&appid=9d164725063daa41aec86f0eecbfed4a&units=imperial";
    // first ajax call for the current weather
    $.ajax({
      url: currentURL,
      method: "GET",
      // function to call if there is a success in the ajax call
      success: function (responseC) {
        // console.log(responseC);
        // variable for the weather icon
        let iconCode = responseC.weather[0].icon;
        // variable for the src attribute to display the weather icon for the current dat
        let iconUrl = "https://openweathermap.org/img/w/" + iconCode + ".png";

        // adds information in the current day card for all data except uv-index
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
        // api url for the uv-index call that uses the longitude and latitude attributes from the current day call
        let uvUrl =
          "http://api.openweathermap.org/data/2.5/uvi?lat=" +
          responseC.coord.lat +
          "&lon=" +
          responseC.coord.lon +
          "&appid=9d164725063daa41aec86f0eecbfed4a";
        // ajax call for the uv index
        $.ajax({
          url: uvUrl,
          method: "GET",
        })
          .then(function (responseU) {
            // console.log(responseU);
            // displays the uv index in the current day card
            $("#city-uvIndex").text(responseU.value);
            // if statements modify the uv-index class to change the color depending on the index value
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
    // ajax call for the five day forecast
    $.ajax({
      url: fiveDayURL,
      method: "GET",
    }).then(function (responseF) {
      // console.log(responseF);
      // arrays that will hold the forecast temp, humidity, and icon id
      let forecastTempArr = [];
      let forecastHumidityArr = [];
      let forecastIconArr = [];
      // for loop that adds data to the above 3 arrays for 12:00pm for the next 5 days
      for (let i = 0; i < responseF.list.length; i++) {
        if (responseF.list[i].dt_txt === moment().add(1, "d").format("YYYY-MM-DD") + " 12:00:00" || responseF.list[i].dt_txt === moment().add(2, "d").format("YYYY-MM-DD") + " 12:00:00" || responseF.list[i].dt_txt === moment().add(3, "d").format("YYYY-MM-DD") + " 12:00:00" || responseF.list[i].dt_txt === moment().add(4, "d").format("YYYY-MM-DD") + " 12:00:00" || responseF.list[i].dt_txt === moment().add(5, "d").format("YYYY-MM-DD") + " 12:00:00") {
          forecastTempArr.push(responseF.list[i].main.temp);
          forecastHumidityArr.push(responseF.list[i].main.humidity);
          forecastIconArr.push(responseF.list[i].weather[0].icon);
        }
      }
      // console.log(forecastTempArr);
      // console.log(forecastHumidityArr);
      // console.log(forecastIconArr);
      // the 3 each methods below add the values from the 3 forecast arrays to the forecast cards below
      $(".forecast-temp").each(function (arr) {
        return $(this).text(forecastTempArr[arr]);
      })
      $(".forecast-humidity").each(function (arr) {
        return $(this).text(forecastHumidityArr[arr]);
      })
      $(".forecast-icon").attr("src", function (arr) {
        return "http://openweathermap.org/img/w/" + forecastIconArr[arr] + ".png";
      })
      // console.log(forecastHumiditySpan);
      // console.log(forecastTempSpan);
      // fail method will display error and remove button for city that does not contain good information
    })
  }


  // function to add the city button which will call the the display info function to add the button and display
  function addCityBtn() {
    // empties current buttons
    $("#city-list").empty()
    // for loop will add buttons based on the cityObj variable
    for (let i = 0; i < citiesObj.length; i++) {
      // creates new button
      let newCityBtn = $("<button>");
      // adds bootstrap classes to make it look fancy
      newCityBtn.addClass("list-group-item list-group-item-action new-city-btn");
      // adds the appropriate data attributes
      newCityBtn.attr("data-city-name", citiesObj[i].city);
      newCityBtn.attr("data-state-name", citiesObj[i].state);
      newCityBtn.attr("data-country-name", citiesObj[i].country);
      // newCityBtn.attr("data-country-id", )
      newCityBtn.attr("data-index", i);
      newCityBtn.html(citiesObj[i].city + "<button type='button' class='close delete-btn' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
      // adds the new city button to the top of the list because adding it to the bottom makes zero sense.
      $("#city-list").prepend(newCityBtn);
      $(function () {
        $(".new-city-btn").first().click();
      }
      )
    }
  }
  // event handler that is linked to the search button
  $("#city-search-btn").on("click", function (event) {
    event.preventDefault();

    // console.log(cities);
    // takes information about city name state and country for api calls
    let cityName = $("#city-search").val();
    let cityState = $("#state-search").val();

    let cityCountry = $("#country-search").val();
  // this helps with city search when there are more than one city with the same name. You must include us for it to work because it will assume your state is the country
    if (cityState && !cityCountry) {
      cityCountry = "us"
    }
      // prevent user from not entering a city name
    if (!$("#city-search").val()) {
      return
    }
    // test api call to get the city id and prevent duplicate cities
    let testUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName + "," + cityState + "," + cityCountry +
      "&appid=9d164725063daa41aec86f0eecbfed4a&units=imperial";
    $.ajax({
      url: testUrl,
      method: "GET",
    }).then(function (responseT) {

      // console.log(cityName)
      // creates a test object to compare with the current stored list and see if there are duplicates
      let cityNameLower = cityName.toLowerCase();
      let cityTestObj = {
        city: cityNameLower,
        state: cityState,
        country: cityCountry,
        id: responseT.id
      }

      // for loop tests to see if the city id already exists
      for (let i = 0; i < citiesObj.length; i++) {
        if (citiesObj[i].id === cityTestObj.id) {
          // this calls the error notification and prevent the data from displaying
          duplicateNotification();
          return
        }
      }

// if the city does not exist as an object in the citiesObj array then you will push the values into the four variable arrays for the city info,

      cities.push(cityNameLower);
      states.push(cityState);
      countries.push(cityCountry);
      cityIdArray.push(responseT.id);
      // this function calls for the storage of the cities data into the citiesObj and then stores it in local storage
      storeCityStateObj();

    }).fail(function () {
      // error notification to display
      nullNotification();
    });
  })
// function to store the city informatio into local storage
  function storeCityStateObj() {
    // the map method creates an object for each city value into an array to be stored in local storage
    citiesObj = (cities.map((s, i) => ({ city: cities[i], state: states[i], country: countries[i], id: cityIdArray[i] })));
    // console.log(citiesObj);
    // the array must be stringified before it can be stored
    storedCities = JSON.stringify(citiesObj);
    // stores the city JSON object string
    localStorage.setItem("storedCityInfo", storedCities);
    // calls the addCItyBtn function to populate the new button
    addCityBtn();

  }
  // this toggles the advanced search fields for city and state name.
  $("#advanced-search").on("click", function () {
    $("#state-search").attr("style", "display: inline-block");
    $("#country-search").attr("style", "display: inline-block");
    $(this).removeClass("active");
    $(this).addClass("disabled");
  })
  // this the the eventhandler for when a city button is pressed
  $(document).on("click", ".new-city-btn", displayCityInfo);

  // this is the event handler attached to the x button on each city button
  $(document).on("click", ".delete-btn", xButtonMeansDelete)

  // this is the function that is called when the x button on the city buttons is pressed and deletes the button and removes the information from local storage
  function xButtonMeansDelete() {
    // console.log($(this).parent().attr("data-city-name"))
    // removes the value from the cities, states, countries, and  arrays based on its data index from the addCityBtn function
    cities.splice(parseInt($(this).parent().attr("data-index")), 1);
    states.splice(parseInt($(this).parent().attr("data-index")), 1);
    countries.splice(parseInt($(this).parent().attr("data-index")), 1);
    cityIdArray.splice(parseInt($(this).parent().attr("data-index")), 1);
    $(this).parent().remove();
    // console.log(cities);
    storeCityStateObj();
  }
// notification if the city is already present in the list of cities
  function duplicateNotification() {
    // reveals hidden message
    $("#city-error").attr("style", "display: inline-block")
// interval that displays message for 1 second and then hides it again
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
// function that displays the notification if there is no data found for the given city
  function nullNotification() {
// reveals hidden message
    $("#city-null").attr("style", "display: inline-block")
// interval that displays the message for 1 second and then hides it again
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