import * as axios from 'axios';

const DEFAULT_URL = 'https://blooming-taiga-15572.herokuapp.com';


export const createGroup = async (name) => {
    return await axios.post(`${DEFAULT_URL}/api/v1/create-group`, { name }, mountHeaders()).catch((err) => handleUnauthorized(err));
}

export const followPerson = async (follow) => {
    return await axios.put(`${DEFAULT_URL}/api/v1/follow`, { follow }, mountHeaders()).catch(err => handleUnauthorized(err));
}

export const followGroup = async (follow) => {
    return await axios.put(`${DEFAULT_URL}/api/v1/follow-group`, { follow }, mountHeaders()).catch(err => handleUnauthorized(err));
}

export const getSubscriptions = async () => {
    return await axios.get(`${DEFAULT_URL}/api/v1/subscriptions`, mountHeaders()).catch(err => handleUnauthorized(err));
}

function handleUnauthorized(err) {
    if (err.response.status === 401) {
        window.localStorage.clear();
        window.location.replace('/');
    };
}

function mountHeaders() {
    return {
        headers: {
            'x-access-token': window.localStorage.getItem('x-access-token'),
            'email': window.localStorage.getItem('email')
        }
    }
}
