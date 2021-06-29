import axios from 'axios';

const baseUrl='http://localhost:3000';

export const getWeatherInfo = ({lat, lgt}) => axios.get(`${baseUrl}/weather?lat=${lat}&lgt=${lgt}`);