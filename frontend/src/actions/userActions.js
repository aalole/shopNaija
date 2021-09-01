import axios from "axios";
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
} from "../constants/userconstants";
import { MY_ORDER_LIST_RESET } from "../constants/orderConstant";

export const register = (name, email, password) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        dispatch({ type: REGISTER_USER_REQUEST });

        const { data } = await axios.post("/api/users", { name, email, password }, config);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data,
        });
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        dispatch({ type: USER_LOGIN_REQUEST });

        const { data } = await axios.post("/api/users/login", { email, password }, config);
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getUserProfile = (id) => async (dispatch, getState) => {
    try {
        const { loginUser: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        dispatch({ type: USER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/users/${id}`, config);
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        const { loginUser: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

        const { data } = await axios.put('/api/users/profile', user, config);
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        const { loginUser: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        dispatch({ type: USER_LIST_REQUEST });

        const { data } = await axios.get('/api/users', config);
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        const { loginUser: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        dispatch({ type: USER_DELETE_REQUEST });

        await axios.delete(`/api/users/${id}`, config);
        dispatch({
            type: USER_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


export const updateUser = (user) => async (dispatch, getState) => {
    try {
        const { loginUser: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        dispatch({ type: USER_UPDATE_REQUEST });

        const { data } = await axios.patch(`/api/users/${user._id}`, user, config);
        dispatch({ type: USER_UPDATE_SUCCESS });
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: MY_ORDER_LIST_RESET })
    dispatch({ type: USER_LIST_RESET })
}