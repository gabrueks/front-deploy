import * as axios from 'axios';

const DEFAULT_URL = 'https://blooming-taiga-15572.herokuapp.com';

export const createPost = async (data) => {
    return await axios.post(`${DEFAULT_URL}/api/v1/create-post`, data, mountHeaders()).catch((err) => handleUnauthorized(err));
}

export const createTimelinePost = async (data) => {
    return await axios.post(`${DEFAULT_URL}/api/v1/create-post-timeline`, { text: data.valueTimeline, timeline: data.timeline }, mountHeaders()).catch((err) => handleUnauthorized(err));
}

export const listPost = async (state) => {
    return await axios.get(`${DEFAULT_URL}/api/v1/list-post`, {
            headers: {
                'x-access-token': window.localStorage.getItem('x-access-token'),
                'email': window.localStorage.getItem('email'),
                last_timeline: (state.posts) ? state.posts[state.posts.length - 1].id : '',
                last_user: (state.posts) ? state.posts.filter((user) => user.actor.id !== undefined)[state.posts.filter((user) => user.actor.id !== undefined).length - 1].id : ''
            }
        }).catch(err => handleUnauthorized(err));
}

export const addComment = async (text, activityId) => {
    return await axios.post(`${DEFAULT_URL}/api/v1/create-comment`, { text, activityId }, mountHeaders()).catch(err => handleUnauthorized(err));
}

export const likePost = async (isLiked, activityId, likeId = null) => {
    return await axios.put(`${DEFAULT_URL}/api/v1/like-post`, { isLiked, activityId, likeId }, mountHeaders()).catch(err => handleUnauthorized(err));
}

export const loadComments = async (url) => {
    return await axios.post(`${DEFAULT_URL}/api/v1/get-comments`, { url }, mountHeaders()).catch((err) => handleUnauthorized(err));
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
