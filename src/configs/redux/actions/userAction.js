import axios from 'axios'
import swal from "sweetalert2"
import { ActionTypes } from "../constants/action-types";

export const loginUser = (dataForm, navigate) => async (dispatch) => {
    try {
        dispatch({ type: 'USER_LOGIN_PENDING' })
        const result = await axios.post(
            `http://localhost:8000/users/login`,
            dataForm
        );
        const user = result.data.data
        const role = result.data.data
        const users = {
            role: result.data.data.role,
            email: result.data.data.email
        }
        console.log(users);
        const token = result.data.data.token
        localStorage.setItem("token", token);
        localStorage.setItem("user", role);
        localStorage.setItem("refreshToken", user.refreshToken);
        dispatch({ type: 'USER_LOGIN_SUCCESS', payload: user })

        dispatch({
            type: "USER_LOGIN_SUCCESS",
            token: token.data,
            payload: user,
        });
        swal.fire({
            icon: "success",
            title: "Login Success!",
        });
        navigate('/home')

    } catch (error) {
        swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There's Something Wrong!",
        });
        console.log(error);
    }
}

export const signUp = (dataForm, navigate) => async (dispatch) => {
    try {
        dispatch({ type: "USER_REGISTER_PENDING" });
        const result = await axios.post(
            `http://localhost:8000/users/register`,
            dataForm
        );
        const user = result.data.data;

        localStorage.setItem("token", user.token);
        localStorage.setItem("refreshToken", user.refreshToken);
        dispatch({ type: "USER_REGISTER_SUCCESS", payload: user });
        swal.fire({
            icon: "success",
            title: "Register is Success!",
            text: `Please Login!`,
        });
        navigate("/login");
    } catch (error) {
        swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Data is Wrong!",
        });
        console.log(error);
    }
};

export const signOut = () => {
    return (dispatch) => {
        dispatch({
            type: "CLEAR_PRODUCT",
        });

        dispatch({
            type: "SIGN_OUT",
        });
    };
};

export const updateUser = (users) => {
    return {
        type: ActionTypes.UPDATE_USER,
        payload: users,
    };
};

export const loadUser = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        if (token) {
            dispatch({
                type: "USER_LOADED",
                token,
            });
        } else return null;
    };
};
