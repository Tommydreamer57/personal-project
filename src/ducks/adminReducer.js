import axios from 'axios';

// INITIAL STATE

const initialState = {
    adminSections: [{}],        // all sections including unpublished
    adminPosts: [{}],           // all posts including unpublished posts
    adminComments: [],          // all comments
    adminResponses: []          // all responses
}

// PROMISE CONTROLS

const PENDING = '_PENDING';
const FULFILLED = '_FULFILLED';
const REJECTED = '_REJECTED';

// ACTION TYPES



// ACTION BUILDERS



// REDUCER

export default function adminReducer(state = initialState, action) {
    // console.log(state)
    // console.log(action.type)
    switch (action.type) {
        default:
            return state;
    }
}
