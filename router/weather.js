import axios from 'axios';
import express from 'express';

const router = express.Router();
// initialize our router

router.get('/country', (req, res) => res.send('Add a country as a parameter: country/{country name}'));

router.get('/country/:countryName', (req, res) => {
    const { countryName } = req.params;
    
    console.log(`Country: ${countryName}`);

    const capitalCity = axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
    capitalCity.then(response => {
        const capital=response.data[0].capital[0];
        console.log(`Capital: ${capital}`);

        // appid is an active API key 
       const cityWeather = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=ce5c5dfc1585e08f124cccb1ce5aa9c6`);
    
        cityWeather.then(response => {
//           const weather = response.data;
            res.send(response.data);

        }).catch(error => console.error(`Weather error: ${error}`));      


    }).catch(error => console.error(`Capital error: ${error}`));            

});


router.get('/city', (req, res) => res.send('Add a city (weather tipe: main, visibility, wind, rain, clouds) as a parameters: city/{city name}/{weather tipe}'));

router.get('/city/:cityName', (req, res) => {
    const { cityName } = req.params;
//    console.log(`City: ${cityName}`); 

    const city = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ce5c5dfc1585e08f124cccb1ce5aa9c6`);
    city.then(response => {
      
        const weather=response.data;
        res.send(response.data);

    }).catch(error => console.error(`Weather error: ${error}`));     
});

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


export default router;