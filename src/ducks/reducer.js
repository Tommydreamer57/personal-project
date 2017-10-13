import axios from 'axios';

// INITIAL STATE

const initialState = {
    user: {},           // user object from /auth/me { id, username, favorites }
    favorites: [],
    sections: [{}],     // section object from /sections { section, id }
    selectedSection: 0, // selected section id
    posts: [{
        title: 'refresh page to load posts'
    }],    // post object from /posts/section { id, title, subtitle, body, comments { username, date, body } }
    selectedPost: 0,    // selected post id
    postIsFavorite: false,
    input: ''           // comment input
}

// PROMISE CONTROLS

const PENDING = '_PENDING';
const FULFILLED = '_FULFILLED';
const REJECTED = '_REJECTED';

// ACTION TYPES

const GET_USER = 'GET_USER';
const GET_SECTIONS = 'GET_SECTIONS';
const SELECT_SECTION = 'SELECT_SECTION';
const GET_ALL_POSTS = 'GET_ALL_POSTS';
const GET_POSTS = 'GET_POSTS';
const SELECT_POST = 'SELECT_POST';
const GET_FAVORITES = 'GET_FAVORITES';
const HANDLE_INPUT = 'HANDLE_INPUT';


// ACTION BUILDERS

export function getUser() {
    let user = axios.get(`/auth/me`)
        .then(response => {
            // console.log(response.data);
            return response.data
        })
    return {
        type: GET_USER,
        payload: user
    }
}

export function getSections() {
    let sections = axios.get(`/sections`)
        .then(response => {
            // console.log(response.data);
            return response.data
        })
    return {
        type: GET_SECTIONS,
        payload: sections
    }
}

export function selectSection(section) {
    // console.log(section);
    return {
        type: SELECT_SECTION,
        payload: section
    }
}

export function getPosts(section) {
    let posts = axios.get(`/posts/${section}`)
        .then(response => {
            // console.log(response.data);
            return response.data
        })
    return {
        type: GET_POSTS,
        payload: posts
    }
}

export function selectPost(postid) {
    let post = axios.get(`/post/${postid}`)
        .then(response => {
            return response.data[0]
        })
    return {
        type: SELECT_POST,
        payload: post
    }
}

export function getFavorites(userid) {
    let favorites = axios.get(`/favorites/${userid || null }`)
        .then(response => {
            console.log(response.data)
            return response.data
        })
    console.log('it worked');
    return {
        type: GET_FAVORITES,
        payload: favorites
    }
}

export function addFavorite(userid, postid) {
    let favorites = axios.post(`/favorites/${userid}/${postid}`)
        .then(response => {
            return response.data
        })
    return {
        type: GET_FAVORITES,
        payload: favorites
    }
}

export function removeFavorite(userid, postid) {
    let favorites = axios.delete(`/favorites/${userid}/${postid}`)
        .then(response => {
            return response.data
        })
    return {
        type: GET_FAVORITES,
        payload: favorites
    }
}

//REDUCER

export default function reducer(state = initialState, action) {
    // console.log(state)
    // console.log(action.type)
    let postIsFavorite = false    
    switch (action.type) {
        case GET_USER + FULFILLED:
            // console.log(action.payload);
            return Object.assign({}, state, { user: action.payload });
        case GET_SECTIONS + FULFILLED:
            // console.log(action.payload);
            return Object.assign({}, state, { sections: action.payload });
        case SELECT_SECTION:
            // console.log(action.payload);
            return Object.assign({}, state, { selectedSection: action.payload });
        case GET_POSTS + FULFILLED:
            // console.log(action.payload);
            return Object.assign({}, state, { posts: action.payload });
        case SELECT_POST + FULFILLED:
            // CHECK FAVORITES TO SEE IF POST IS IN FAVORITES
            if (state.favorites.length) {
                if (state.favorites.filter(fav => fav.id == action.payload.id).length) {
                    postIsFavorite = true;
                }
                else {
                    postIsFavorite = false;
                }
            }
            // RETURN SELECTED POST AND IF IT IS IN FAVORITES
            return Object.assign({}, state, { selectedPost: action.payload, postIsFavorite });
        case GET_FAVORITES + FULFILLED:
            // console.log(action.payload);
            // CHECK SELECTED POST TO SEE IF POST IS IN FAVORITES
            if (state.selectedPost) {
                if (state.selectedPost.id) {
                    if (action.payload.filter(fav => fav.id == state.selectedPost.id).length) {
                        postIsFavorite = true;
                    }
                    else {
                        postIsFavorite = false;
                    }
                }    
            }
            // RETURN FAVORITES AND IF SELECTED POST IS IN FAVORITES
            return Object.assign({}, state, { favorites: action.payload, postIsFavorite });
        default:
            return state;
    }

}
