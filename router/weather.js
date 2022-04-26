import axios from 'axios';
import express from 'express';

const router = express.Router();
// initialize router

router.get('/country', (req, res) => res.send('Add a country as a parameter: country/{country name}'));

router.get('/country/:countryName', (req, res) => {
    const { countryName } = req.params;
    
    console.log(`Country: ${countryName}`);

    const capitalCity = axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
    capitalCity.then(response => {
        const capital=response.data[0].capital[0];
        console.log(`Capital: ${capital}`);


       const cityWeather = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=ce5c5dfc1585e08f124cccb1ce5aa9c6`);
// appid is an active API key 

        cityWeather.then(response => {
            res.send(response.data);
        }).catch(error => console.error(`Weather error: ${error}`));      

    }).catch(error => console.error(`Capital error: ${error}`));            

});


router.get('/city', (req, res) => res.send('Add a city (weather parameters: temperature, pressure, humidity, visibility, wind, clouds) as a parameters: city/{city name}/{weather parameter}'));

router.get('/city/:cityName', (req, res) => {
    const { cityName } = req.params;
//    console.log(`City: ${cityName}`); 

    const city = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ce5c5dfc1585e08f124cccb1ce5aa9c6`);
    city.then(response => {
      
        const weather=response.data;
        res.send(response.data);

    }).catch(error => console.error(`Weather error: ${error}`));     
});


/*
router.get('/city/:cityName/:weatherType/', (req, res) => { 
    const cityName = req.params.cityName;
    const weatherType = req.params.weatherType;

    const city = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ce5c5dfc1585e08f124cccb1ce5aa9c6`);
    city.then(response => {
        console.log(`City: ${cityName} Type: ${weatherType}`);       
        const weather = response.data[weatherType];
//        console.log(weather);  
        if (typeof weather === 'object') {
            res.send(weather);
        } else {
            res.send(weather.toString());
        };

    }).catch(error => console.error(`Weather error: ${error}`));     
});
*/

router.get('/city/:cityName/:weatherParam/', (req, res) => { 
    const cityName = req.params.cityName;
    const weatherParam = req.params.weatherParam;

    const city = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ce5c5dfc1585e08f124cccb1ce5aa9c6`);
    city.then(response => {
        console.log(`City: ${cityName} Type: ${weatherParam}`);       
        const weather = response.data;


        const weatherData = {
                city: cityName, 
                weatherparameter: weatherParam
        };

        weatherData.country = weather.sys.country;

        switch (weatherParam) {
            case 'temperature':
                weatherData.temperature = weather.main.temp;
                weatherData.feelslike = weather.main.feels_like;
                weatherData.min = weather.main.temp_min;
                weatherData.max = weather.main.temp_max;
                weatherData.unit = 'Kelvin';
                weatherData.temperatureCelsius = Math.round(weather.main.temp - 273.15);
                break;
            case 'wind':
                weatherData.windspeed = weather.wind.speed;
                weatherData.windspeed = weather.wind.deg;
                break;
            case 'pressure':
                weatherData.pressure = weather.main.pressure;
                break;
            case 'humidity':
                weatherData.humidity = weather.main.humidity;
                break;
            case 'clouds':
                weatherData.clouds = weather.clouds;
                break;
            case 'visibility':
                weatherData.visibility = weather.visibility;
                break;
        };

        res.send(weatherData);

    }).catch(error => console.error(`Weather error: ${error}`));     
});


export default router;