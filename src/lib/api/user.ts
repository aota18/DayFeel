import axios from 'axios';

const baseUrl='http://3.35.22.199:3000';
const local = 'http://localhost:3000';

export const login = ({name, email, imageUrl, token}) => axios.post(`${local}/users/login`, {name, email, imageUrl, token});