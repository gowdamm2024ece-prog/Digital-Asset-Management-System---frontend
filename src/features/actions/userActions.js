// features/actions/userActions.js

import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_CREATE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS,
} from "../constants/userConstants";

import {
  fetchUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
} from "../api/userApi";

// Get Users
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const { data } = await fetchUsersAPI();

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.message,
    });
  }
};

// Create User
export const createUser = (user) => async (dispatch) => {
  await createUserAPI(user);
  dispatch({ type: USER_CREATE_SUCCESS });
  dispatch(getUsers());
};

// Update User
export const updateUser = (id, user) => async (dispatch) => {
  await updateUserAPI(id, user);
  dispatch({ type: USER_UPDATE_SUCCESS });
  dispatch(getUsers());
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  await deleteUserAPI(id);
  dispatch({ type: USER_DELETE_SUCCESS });
  dispatch(getUsers());
};