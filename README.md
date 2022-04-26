# Weather API

The project is an API for query the current weather in the capital of a country or in the city (with additional parameter - part of data set). The name of the country or city (or type og weather data) is the input parameters.

The capital of the country is determined using the api: https://restcountries.com/#api-endpoints-v3-all.
The weather of the capital is determined using the api: api.openweathermap.org.

For http requests from node.js and the browser used AXIOS.  


## Install and run the project

1. Install git and npm
2. git clone https://github.com/IrinaPich/weather-api.git
3. Enter project directory
4. npm install 
5. npm start

After this point you must see in your terminal: Server Running on port: http://localhost:5000.
Then enter to a browser: 
localhost:5000/country/{country name}. For example: http://localhost:5000/country/china
localhost:5000/city/{city name}. For example: http://localhost:5000/city/berlin
localhost:5000/city/{city name}/{type of weather}. For example: http://localhost:5000/city/paris/main

## Test project

1. Install mocha
2. Install chai
3. npm test

## Challenges

API doesn't work (app crashed) for countiry capitals with special letters. For example the capital of Moldova is Chișinău and require additional code implementing.
