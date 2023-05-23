import {
    CREATE_COMMENT_FAILURE,
    CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS,
    FETCH_COMMENTS_FAILURE,
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS
} from "../actions/commentActions";

const initialState = {
    comments: [],
    loading: false,
    error: null
};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTS_REQUEST:
            return {...state, loading: true, error: null, comments: []};
        case FETCH_COMMENTS_SUCCESS:
            return {...state, loading: false, error: null, comments: action.payload};
        case FETCH_COMMENTS_FAILURE:
            return {...state, loading: false, error: action.payload, comments: []}

        case CREATE_COMMENT_REQUEST:
            return {...state, loading: true, error: null};
        case CREATE_COMMENT_SUCCESS:
            return {...state, loading: false, error: null};
        case CREATE_COMMENT_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default commentReducer;