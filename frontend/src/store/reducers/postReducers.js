import {
    FETCH_POSTS_FAILURE,
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    NEW_POST_FAILURE,
    NEW_POST_REQUEST, NEW_POST_SUCCESS, SINGLE_POST_FAILURE, SINGLE_POST_REQUEST, SINGLE_POST_SUCCESS
} from "../actions/postActions";

const init = {
    posts: null,
    singlePost: null,
    loading: false,
    error: null
};

const postsReducer = (state = init, action) => {
    switch (action.type) {
        case FETCH_POSTS_REQUEST:
            return {...state, loading: true, error: null, posts: null};
        case FETCH_POSTS_SUCCESS:
            return {...state, loading: false, error: null, posts: action.payload};
        case FETCH_POSTS_FAILURE:
            return {...state, loading: false, error: action.payload, posts: null}

        case NEW_POST_REQUEST:
            return {...state, loading: true, error: null, posts: null};
        case NEW_POST_SUCCESS:
            return {...state, loading: false, error: null};
        case NEW_POST_FAILURE:
            return {...state, loading: false, error: action.payload};

        case SINGLE_POST_REQUEST:
            return {...state, loading: true, error: null, singlePost: null};
        case SINGLE_POST_SUCCESS:
            return {...state, loading: false, singlePost: action.payload};
        case SINGLE_POST_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default postsReducer;