import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './reducer';
import adminReducer from './adminReducer';

let reducers = combineReducers({
    reducer,
    adminReducer
})

// CHANGE BACK TO REDUCERS  *V*  AFTER FIGURING OUT HOW TO USE COMBINEREDUCERS
export default createStore(reducer, applyMiddleware(promiseMiddleware()));
