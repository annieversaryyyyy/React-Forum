import axiosApi from "../../axiosApi";

export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';

export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';

const fetchCommentsRequest = () => ({type: FETCH_COMMENTS_REQUEST});
const fetchCommentsSuccess = comments => ({type: FETCH_COMMENTS_SUCCESS, payload: comments});
const fetchCommentsFailure = error => ({type: FETCH_COMMENTS_FAILURE, payload: error});

const createCommentRequest = () => ({type: CREATE_COMMENT_REQUEST});
const createCommentSuccess = () => ({type: CREATE_COMMENT_SUCCESS});
const createCommentFailure = error => ({type: CREATE_COMMENT_FAILURE, payload: error});

export const fetchComments = post => {
    return async dispatch => {
        try {
            dispatch(fetchCommentsRequest());
            const response = await axiosApi(`/comments?post=${post}`);
            dispatch(fetchCommentsSuccess(response.data));
        } catch (e) {
            dispatch(fetchCommentsFailure(e));
        }
    }
};

export const createComment = post => {
    return async (dispatch,getState) => {
        const headers = {
            'Authorization': getState().users.user && getState().users.user.user.token,
        };
        try{
            dispatch(createCommentRequest());
            const response = await axiosApi.post('/comments', post,{ headers });
            dispatch(createCommentSuccess);
            return response.data;
        } catch (e) {
            dispatch(createCommentFailure(e));
        }
    };
};