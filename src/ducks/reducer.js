import axios from 'axios';

// INITIAL STATE

const initialState = {
    user: {},           // user object from /auth/me { id, username, favorites }
    sections: [{}, {}], // section object from /sections { section, id }
    selectedSection: 0, // selected section id
    posts: [{}, {}],    // post object from /posts/section { id, title, subtitle, body, comments { username, date, body } }
    selectedPost: 0,    // selected post id
    input: ''           // comment input
}

// PROMISE CONTROLS

const PENDING = '_PENDING';
const FULFILLED = '_FULFILLED';
const REJECTED = '_REJECTED';

// ACTION TYPES

const GET_USER = 'GET_USER';
const GET_SECTIONS = 'GET_SECTIONS';
const GET_ALL_POSTS = 'GET_ALL_POSTS';
const GET_POSTS = 'GET_POSTS';
const GET_POST = 'GET_POST';
const HANDLE_INPUT = 'HANDLE_INPUT';


// ACTION BUILDERS

export function getUser() {
    let user = axios.get(`/auth/me`)
        .then(response => {
            console.log(response.data);
            return response.data
        })
    return {
        type: GET_USER,
        payload: user
    }
}


//REDUCER

export default function reducer(state = initialState, action) {
    // console.log(state)
    console.log(action.type)
    switch (action.type) {
        case GET_USER + FULFILLED:
            console.log(action.payload)    
            return Object.assign({}, state, { user: action.payload });
        default:
            return state;
    }

}
