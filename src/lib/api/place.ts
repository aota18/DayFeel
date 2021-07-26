import axios from 'axios';

const baseUrl= process.env.NODE_ENV==='development' ? 'http://localhost:3000' : 'http://3.35.22.199:3000';



export const addPlace = ({userId, country, city, longitude, latitude}) => axios.post(`${baseUrl}/places`, {country, city, longitude, latitude, userId})
export const getPlaces = ({email}) => axios.get(`${baseUrl}/places/all?email=${email}`);
export const searchPlace = ({keyword}) => axios.get(`${baseUrl}/places/search?keyword=${keyword}`);