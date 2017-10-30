import axios from 'axios';
import html from '../components/admin/SlateEditor/html-rules';

// INITIAL STATE

const initialState = {
    user: {},           // user object from /auth/me { id, username, favorites }
    favorites: [],
    sections: [],     // section object from /sections { section, id }
    subsections: [],
    selectedSection: 0, // selected section id
    posts: [{
        title: 'refresh page to load posts'
    }],    // post object from /posts/section { id, title, subtitle, body, comments { username, date, body } }
    selectedPost: {
        id: 0,
        published: true
    },    // selected post information
    selectedPostBody: html.deserialize(`<p>loading page</p>`),
    postIsFavorite: false,
    comments: [],
    responses: [],
    input: '',           // comment input
    alertClass: 'add-box',  // style class for alerts of adding / removing favorites
    alert: 'Loaded post'               // alert of adding or removing favorites
}

// PROMISE CONTROLS

const PENDING = '_PENDING';
const FULFILLED = '_FULFILLED';
const REJECTED = '_REJECTED';

// ACTION TYPES

const GET_USER = 'GET_USER';
const GET_SECTIONS = 'GET_SECTIONS';
const SELECT_SECTION = 'SELECT_SECTION';
const CLEAR_SELECTED_SECTION = 'CLEAR_SELECTED_SECTION';
const GET_SUBSECTIONS = 'GET_SUBSECTIONS';
const GET_ALL_POSTS = 'GET_ALL_POSTS';
const GET_POSTS = 'GET_POSTS';
const CLEAR_POSTS = 'CLEAR_POSTS';
const SELECT_POST = 'SELECT_POST';
const CLEAR_SELECTED_POST = 'CLEAR_SELECTED_POST';
const GET_COMMENTS = 'GET_COMMENTS';
const GET_FAVORITES = 'GET_FAVORITES';
const HANDLE_INPUT = 'HANDLE_INPUT';
const RESET_ALERT = 'RESET_ALERT';
const ALERT_ADD = 'ALERT-ADD';
const ALERT_REMOVE = 'ALERT_REMOVE';
const ALERT_WARNING = 'ALERT_WARNING';


// ACTION BUILDERS

// USER

export function getUser() {
    let user = axios.get(`/auth/me`)
        .then(response => {
            console.log('redux got user')
            console.log(response.data);
            return response.data
        })
    console.log('redux getting user')
    return {
        type: GET_USER,
        payload: user
    }
}

// CONTENT

export function getSections() {
    let sections = axios.get(`/api/sections`)
        .then(response => {
            console.log('redux got sections')
            console.log(response.data);
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

export function clearSelectedSection() {
    return {
        type: CLEAR_SELECTED_SECTION
    }
}

export function getSubsections(section) {
    let subsections = axios.get(`/api/subsections/${section}`)
        .then(response => {
            console.log('redux got subsections')
            console.log(response.data)
            return response.data
        })
    return {
        type: GET_SUBSECTIONS,
        payload: subsections
    }
}

export function getPosts(section) {
    let posts = axios.get(`/api/posts/${section}`)
        .then(response => {
            console.log('redux got posts')
            console.log(response.data);
            return response.data
        })
    console.log('redux getting posts')
    return {
        type: GET_POSTS,
        payload: posts
    }
}

export function clearPosts() {
    return {
        type: CLEAR_POSTS
    }
}

export function selectPost(postid) {
    let post = axios.get(`/api/post/${postid}`)
        .then(response => {
            console.log('redux got post')
            console.log(response.data)
            return response.data[0]
        })
    console.log('redux selecting post')
    return {
        type: SELECT_POST,
        payload: post
    }
}

export function clearSelectedPost() {
    return {
        type: CLEAR_SELECTED_POST
    }
}

export function adminSelectPost(postid) {
    let post = axios.get(`/api/admin/post/${postid}`)
        .then(response => {
            console.log('redux selected admin post')
            console.log(response.data)
            return response.data[0]
        })
    console.log('redux selecting admin post')
    return {
        type: SELECT_POST,
        payload: post
    }
}

// COMMENTS

export function getComments(postid) {
    let comments = axios.get(`/api/comments/${postid}`)
        .then(response => {
            console.log('redux got comments')
            console.log(response.data)
            return response.data
        })
    console.log('redux getting comments')
    return {
        type: GET_COMMENTS,
        payload: comments
    }
}

export function postComment(postid, userid, body) {
    console.log(postid)
    let comments = axios.post(`/api/comments/${postid}`, { userid, body })
        .then(response => {
            console.log('redux posted comment')
            console.log(response.data)
            return response.data
        })
    console.log('redux posting comment')
    return {
        type: GET_COMMENTS,
        payload: comments
    }
}

// FAVORITES

export function getFavorites(userid) {
    let favorites = axios.get(`/api/favorites/${userid || null}`)
        .then(response => {
            console.log('redux got favorites')
            console.log(response.data)
            return response.data || null
        })
    console.log('redux getting favorites');
    return {
        type: GET_FAVORITES,
        payload: favorites
    }
}

export function addFavorite(userid, postid) {
    let favorites = axios.post(`/api/favorites/${userid}/${postid}`)
        .then(response => {
            console.log('redux added favorite')
            console.log(response.data)
            return response.data
        })
    console.log('redux adding favorite')
    return {
        type: GET_FAVORITES,
        payload: favorites
    }
}

export function removeFavorite(userid, postid) {
    let favorites = axios.delete(`/api/favorites/${userid}/${postid}`)
        .then(response => {
            console.log('redux deleted favorite')
            console.log(response.data)
            return response.data
        })
    console.log('redux removing favorite')
    return {
        type: GET_FAVORITES,
        payload: favorites
    }
}

// ALERTS

export function resetAlert() {
    console.log('redux resetting alert')
    return {
        type: RESET_ALERT
    }
}

export function alertAdd(alert) {
    console.log('redux alerting add')
    return {
        type: ALERT_ADD,
        payload: alert
    }
}

export function alertRemove(alert) {
    console.log('redux alerting remove')
    return {
        type: ALERT_REMOVE,
        payload: alert
    }
}

export function alertWarning(alert) {
    console.log('redux alerting warning')
    return {
        type: ALERT_WARNING,
        payload: alert
    }
}

// REDUCER

export default function reducer(state = initialState, action) {

    // console.log(state)
    console.log(action.type)
    console.log(action.payload)
    let postIsFavorite = false;
    let alertClass = 'add-box';
    let alert = '';

    switch (action.type) {

        case GET_USER + FULFILLED:
            return Object.assign({}, state, { user: action.payload });

        case GET_SECTIONS + FULFILLED:
            return Object.assign({}, state, { sections: action.payload });

        case SELECT_SECTION:
            return Object.assign({}, state, { selectedSection: action.payload });

        case CLEAR_SELECTED_SECTION:
            console.log(state.selectedSection)
            return Object.assign({}, state, { selectedSection: 0 })

        case GET_SUBSECTIONS:
            return Object.assign({}, state, { subsections: action.payload });

        case GET_POSTS + FULFILLED:
            return Object.assign({}, state, { posts: action.payload });

        case CLEAR_POSTS:
            return Object.assign({}, state, { posts: [] })

        case SELECT_POST + FULFILLED:
            // CHECK FAVORITES TO SEE IF POST IS IN FAVORITES
            if (state.favorites.length && action.payload) {
                if (state.favorites.filter(fav => fav.id == action.payload.id).length) {
                    postIsFavorite = true;
                }
            }
            let body = html.deserialize(`<p>loading page</p>`);
            if (action.payload) {
                if (action.payload.body) {
                    body = html.deserialize(action.payload.body)
                }
            }    
            console.log(body)
            // RETURN SELECTED POST AND IF IT IS IN FAVORITES
            return Object.assign({}, state, { selectedPost: action.payload, selectedPostBody: body, postIsFavorite });

        case SELECT_POST + REJECTED:
            alertClass = 'warning-box'
            alert = 'could not load post, please refresh'
            return Object.assign({}, state, { alertClass, alert });

        case CLEAR_SELECTED_POST:
            return Object.assign({}, state, { selectedPost: initialState.selectedPost, selectedPostBody: html.deserialize(`<p>loading page</p>`) });

        case GET_COMMENTS + FULFILLED:
            return Object.assign({}, state, { comments: action.payload });

        case GET_FAVORITES + PENDING:
            postIsFavorite = false
            return Object.assign({}, state, { postIsFavorite: !state.postIsFavorite });

        case GET_FAVORITES + FULFILLED:
            postIsFavorite = false
            // CHECK SELECTED POST TO SEE IF POST IS IN FAVORITES
            if (state.selectedPost && action.payload) {
                if (state.selectedPost.id) {
                    console.log(state.user.id)
                    console.log(state.selectedPost.id)
                    console.log(action.payload)
                    if (action.payload.filter(fav => fav.id == state.selectedPost.id).length) {
                        postIsFavorite = true;
                    }
                }
            }
            // RETURN FAVORITES AND IF SELECTED POST IS IN FAVORITES
            return Object.assign({}, state, { favorites: action.payload, postIsFavorite });

        case GET_FAVORITES + REJECTED:
            postIsFavorite = false
            alertClass = 'warning-box'
            alert = 'please log in to add favorites'
            return Object.assign({}, state, { alertClass, alert, postIsFavorite });

        case RESET_ALERT:
            alertClass = ' alert-fadout'
            return Object.assign({}, state, { alertClass });

        case ALERT_ADD:
            alertClass = 'add-box'
            alert = action.payload
            return Object.assign({}, state, { alertClass, alert });

        case ALERT_REMOVE:
            alertClass = 'remove-box'
            alert = action.payload
            return Object.assign({}, state, { alertClass, alert });

        case ALERT_WARNING:
            alertClass = 'warning-box'
            alert = action.payload
            return Object.assign({}, state, { alertClass, alert });

        default:
            return state;
    }

}
