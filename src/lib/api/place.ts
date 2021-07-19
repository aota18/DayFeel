import axios from 'axios';

const baseUrl='http://3.35.22.199:3000';
const local = 'http://localhost:3000';


export const addPlace = ({userId, country, city, longitude, latitude}) => axios.post(`${local}/places`, {country, city, longitude, latitude, userId})
export const getPlaces = ({email}) => axios.get(`${local}/places/all?email=${email}`);
export const searchPlace = ({keyword}) => axios.get(`${local}/places/search?keyword=${keyword}`);