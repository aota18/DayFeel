import axios from 'axios';


const baseUrl= process.env.NODE_ENV==='development' ? 'http://localhost:3000' : 'http://3.35.22.199:3000';

export const getWeatherInfo = ({lat, lgt}) => axios.get(`${baseUrl}/weather?lat=${lat}&lgt=${lgt}`);
