# Weather-Dashboard

Explore the github [project repo](https://github.com/TommyWillen/Weather-Dashboard/)

View the [github-pages](https://tommywillen.github.io/Weather-Dashboard/)

## Table of Contents

- [Project Description](#Project-Description)
    - [Project Tasks](#Project-Tasks)
    - [Third Party APIs](#Third-Party-APIs)
    - [API Calls](#responsive-time)
        - [City Data Confirmation and Error](#city-data-confirmation-and-error)
        - [UV Index Color Code](#local-storage-and-new-day-reset)
        - [5-Day Forecast](#5-Day-Forecast)
    - [City Button List Group](#city-button-list-group)
    - [Advanced Search](#advanced-search)
    - [Video Tutorial](#Video-Tutorial)
- [Installation](#installation)

- [Roadmap](#roadmap)

- [License](#license)

- [Contact Me](#contact-me)

- [Acknowledgements](#acknowledgements)

## Project Description
![Weather Dashboard](/Assets/images-and-gifs/weather-dashboard-Main.png)

### Project Tasks
![Weather Dashboard gif](/Assets/images-and-gifs/Weather-Dashboard-Function.gif)
For this project I was tasked with creating a weather dashboard using JQuesry, Moment.JS, and openweathermap api. I was asked to do the following:

- When the user searches for a city, a button appears for that city that persists in local storage.
    - If a city that is searched for is already located on the list, an error message will be displayed and no button will be added.
    - If a seccond city is searched for the button for that city is added to the top of the list
    - Each button also includes an close button that removes it from the list and from local storage.
- When the user clicks the button:
    - If there is no data for the given city, the button will be removed and an error message will display telling the user the warning.
    - The city name, current date, and current weather icon is displayed on top.
    - Temperature, humidity, wind speed, and uv index is displayed below it.
        - the uv index value is color coded based on its value.
    - A five day forecast is displayed below the current day weather data for 12:00pm that day.
        - Date, weather icon, temperature, and humidity is displayed for each forecast day
- When the user presses the advanced search link, two additional forms will appear to allow the user to include city and state information for more specific search parameters


### Third Party APIs

For this project I used multiple 3rd party APIs to support my project, namely bootstrap, jquery, moment.js, and openweathermap api.

I used the bootstrap library of classes to create the html elements for my weather dashboard. I also created my own stylesheet for any modifications I needed to make.

I used jquery's library of methods to speed up my DOM manupulation greatly shrinking my code and making it much easier to work with.

I used moment.js for the handy methods around current date and times.

I used openweathermap api for their weather information and icons.

### API Calls

For openweathermap api, I had to make a total of three calls for current data, uv index, and the 5-day forecast.

#### City Data Confirmation and Error
![error message gif](/Assets/images-and-gifs/weather-dashboard-error.gif)

The first call I made was to get the current weather data for the given city. The first challenge I had was to make sure there actually was city data to collect. To do this I used ajax.error and ajax.success. If there was no data ajax error would run reveal an error message, and remove the city button. If the ajax call was successful, the city information would be displayed for the current weather data.

#### UV Index Color Code

The second call I made was to get the uv index and color code it based on the result. This task proved to be especially challenging because when I used only one .then method, the color would not display properly because the value would not return synchronously with the style changes cause the wrong color to display. I realized the issue was that my if statement was based on the html element and not the response value. When I swqitched to the response value, it worked perfectly

#### 5-Day Forecast

The third call was the trickiest because the data that was called was for every 3 hours interval from the current day for the next 5 days. For my for loop I had to create an if statement that checked for a specific date and time (using momentjs) and compare it with the data. If it matched 12:00pm it was stored in an three arrays for each data requested.

I then used the .each method to append the information from the arrays to each forcast card.

### City Button List Group

WHen the city search button is pressed, four tests are performed:
1. The first test checks to see if the user actually typed in a city name and will simply clear the field if no city name was entered
2. The second test checks to see if there aready is a button for that city. If the city already has a button, an error message is displayed and the search field is reset
3. The third test checks to see if openweathermap api has data for the given city. If there isn't any data, a different message appears and the button is not created.
4. The fourth test checks to see if the user included a state name but not a country name. The api call will mistake that for a country if you do not include us so this test will add it there.

If the search passes all three tests, the city button will be prepended to the top of the city button list group and the information will be displayed in the main section of the document. On refresh or page load the top city's information will be displayed in the main section (the city that was searched for last).

### Advanced Search

I decided to add an advanced search button because there are too many cities in the US that share the same name. When the user clicks the advanced search button, two hidden forms appear and ask for city and country. Those data points will then be linked together in the final api call. As mentioned above, if there is a declared state and no declared country, us will be added to it to allow it to work properly.

### Video Tutorial

Click the image to view my video feature tutorial:

[![Start screen to link to youtube video](/Assets/images-and-gifs/weather-dashboard-main.png)](https://youtu.be/S6Ty38wGxro)

## Installation

Prerequisites\: None

Simply clone it from my repo\:

```
clone git@github.com:TommyWillen/Work-Day-Scheduler.git
```

## Roadmap

In the future I would like to provide link/button that displays hidden advanced search options for state and country information so that the user would have greater ability to find the correct information for cities that share the same name as others like Portland.

## License

[License](https://github.com/TommyWillen/Weather-Dashboard/blob/master/LICENSE)

## Contact Me

- [Email](TommyAllen1215@gmail.com)
- [Github Page](https://github.com/TommyWillen)
- [LinkedIn](https://www.linkedin.com/in/tommy-willen-12867b1b3/)

## Acknowledgements

For this project I would like to thank the following individuals\:

- John Young\: For introducing me to the joys of APIs!
- Dan Mont-Eton\: For the calm and patient support he provided in understanding my code and "talking me off the ledge" when I wanted to throw my computer at the wall.