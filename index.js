import express from 'express';
/* if in package.json add "type": "module" (allow to use impoert statements), 
or eqivalent: const express = require('express'); */

import bodyParser from 'body-parser';

import countriesRoutes from './router/weather.js'

const app = express();
// to initialize our express application as function in variable app

const PORT = 5000;
/* PORT in capital letters - we are not gont to change this name
3000 for frontend, 5000 for backend */

app.use(bodyParser.json());
// to initialize the body parser as function

app.use('/', countriesRoutes);
// from weather.js file in the router folder - varibale deifined by import statement

app.get('/', (req, res) => res.send('Add a parameter of country: country/{country name} or city: city/{city name} (and {weather parameter})'));
/* create a route to rootpage which we can visit with our browser or send request to
all routes are starting with / for request and callback function with 2 parameters */

app.listen(PORT, ()=> console.log(`Server Running on port: http://localhost:${PORT}`));
/* make our application listen for incoming requests 
with callback function which execute once we run the server*/
