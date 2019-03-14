import * as axios from 'axios';

const DEFAULT_URL = 'http://localhost:8080';

export const createUser = async (data) => {
    return await axios.post(`${DEFAULT_URL}/api/v1/signup`, data);
}

export const loginUser = async (data) => {
    return axios.post(`${DEFAULT_URL}/api/v1/login`, data)
        .then((response) => {
            localStorage.setItem('x-access-token', response.data.token);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('user_token', response.data.user_token);
            localStorage.setItem('user', response.data.user_id);
        });
}