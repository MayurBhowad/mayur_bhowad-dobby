import axios from 'axios';
import { GET_ERRORS, GET_POSTS, LOADING } from '../types.redux';

//get all posts
export const getAllPosts = (id) => dispatch => {
    dispatch(setPostLoading());
    axios.get(`/api/post/${id}`).then(res =>
        dispatch({
            type: GET_POSTS,
            payload: res.data.images
        })
    ).catch(err => dispatch({
        type: GET_POSTS,
        payload: []
    }))
}

//create post
export const createPost = (postData, history) => dispatch => {
    axios.post('/api/post/', postData).then(res => {
        dispatch({ type: LOADING })
        history.push('/dashboard')
    }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    }))
}

//Set post loading
export const setPostLoading = () => {
    return {
        type: LOADING
    }
}