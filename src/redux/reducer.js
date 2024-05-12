// src/redux/reducer.js
import { SET_USER, UPDATE_USER, LOGOUT } from './actionTypes';

const initialState = {
    userId: null,
   
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.payload };

        case UPDATE_USER:
            return { ...state, ...action.payload };

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};

export default userReducer;