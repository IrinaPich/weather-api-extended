const axios = require('axios');
const { expect } = require('chai');

describe('Weather-api', function () {
    it('should get a capital of Moldova - Chișinău', async function () {
        const capitalCity = await axios.get(`https://restcountries.com/v3.1/name/moldova`);
        expect(capitalCity.data[0].capital[0]).equal('Chișinău'); 
    });
});

describe('Weather-api', function () {
    it('should get a  json weather data for London', async function () {
        const weatherCity = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=ce5c5dfc1585e08f124cccb1ce5aa9c6`);
        expect(weatherCity.data.name).equal('London'); 
    });
});

describe('Weather-api', function () {
    it('should get a json weather data for capital of Spain Madrid', async function () {
        const weather = await axios.get(`http://localhost:5000/country/spain`);
        expect(weather.data.name).equal('Madrid');  
    });
});

describe('Weather-api', function () {
    it('should get a json weather data for capital of France Paris', async function () {
        const weather = await axios.get(`http://localhost:5000/country/france`);
        expect(weather.data.name).equal('Paris');  
    });
});

describe('Weather-api', function () {
    it('should get a json weather data for city Bălţi', async function () {
        const weather = await axios.get(`http://localhost:5000/city/balti`);
        expect(weather.data.name).equal('Bălţi');  
    });
});
