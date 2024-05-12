// src/redux/store.js
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import userReducer from './reducer';
import { saveToLocalStorage, loadFromLocalStorage } from './localstorage';

// Middleware to save state to local storage on state change
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  // saveToLocalStorage('userState', state);
  return result;
};

// Load initial state from local storage
// const persistedState = loadFromLocalStorage('userState');

const store = createStore(
  userReducer,
  applyMiddleware(thunk, localStorageMiddleware)
);

export default store;