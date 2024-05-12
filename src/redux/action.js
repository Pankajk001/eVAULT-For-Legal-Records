// src/redux/actions.js
import { SET_USER, UPDATE_USER, LOGOUT } from './actionTypes';

export const setUser = (userData) => ({
  type: SET_USER,
  payload: userData,
});

export const updateUser = (updatedUserData) => ({
  type: UPDATE_USER,
  payload: updatedUserData,
});

export const logout = () => ({
  type: LOGOUT,
});