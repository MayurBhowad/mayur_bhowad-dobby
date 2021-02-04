import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from "../types.redux";
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//SignUp user
export const signupUser = (userData, history) => dispatch => {
    axios
        .post('/api/user/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//LoginUser
export const loginUser = (userData, history) => dispatch => {
    axios.post('/api/user/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('token', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            // window.location.href = '/home';
            history.push('/dashboard')
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

//Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//Logout user
export const logoutUser = () => dispatch => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}