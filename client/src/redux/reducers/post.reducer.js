import { GET_POSTS, LOADING, SET_CURRENT_USER } from '../types.redux';

const initialState = {
    posts: null,
    post: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        // case SET_CURRENT_USER:
        //     return {
        //         ...state,
        //         posts: null,
        //     };
        default:
            return state;
    }
}
