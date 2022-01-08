import axios from "axios";

export const FETCH_USER = 'FETCH_USER';
export const FETCH_SAVED_RECIPES = 'FETCH_SAVED_RECIPES'

export const getUser = (e) => async dispatch => {
    const response = await e
    return dispatch({type: FETCH_USER, payload: response})
}