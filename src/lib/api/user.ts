import axios from 'axios';

const baseUrl= process.env.NODE_ENV==='development' ? 'http://localhost:3001' : 'http://3.35.22.199:3000';

export const login = ({name, email, imageUrl, token}) => axios.post(`${baseUrl}/users/login`, {name, email, imageUrl, token});
export const authorize = ({code, token}) => axios.post(`${baseUrl}/users/authorize`, {code, token});