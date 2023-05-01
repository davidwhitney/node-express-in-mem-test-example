import express from 'express';
import { getWeather } from './WeatherService.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/weather', (req, res) => {
    const values = getWeather();
    res.json(values);
});

export default app;