import axiosApi from "../../axiosApi";

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

const fetchPostsRequest = () => ({type: FETCH_POSTS_REQUEST});
const fetchPostsSuccess = posts => ({type: FETCH_POSTS_SUCCESS, payload: posts});
const fetchPostsFailure = error => ({type: FETCH_POSTS_FAILURE, payload: error});

export const fetchPosts = () => {
    return async dispatch => {
        try {
            dispatch(fetchPostsRequest());

            const res = await axiosApi(`/posts`);

            dispatch(fetchPostsSuccess(res.data));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(fetchPostsFailure(e.response.data));
            } else {
                dispatch(fetchPostsFailure({global: 'Some going wrong =('}));
            }
        }
    }
};

export const NEW_POST_REQUEST = 'NEW_POST_REQUEST';
export const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS';
export const NEW_POST_FAILURE = 'NEW_POST_FAILURE';

const newPostRequest = () => ({type:NEW_POST_REQUEST});
const newPostSuccess = () => ({type:NEW_POST_SUCCESS});
const newPostFailure = error => ({type:NEW_POST_FAILURE,payload:error});

export const newPost = post => {
    return async (dispatch,getState) => {
        const headers = {
            'Authorization': getState().users.user && getState().users.user.user.token,
        };
        try{
            dispatch(newPostRequest());
            await axiosApi.post('/posts', post,{headers});
            dispatch(newPostSuccess());
        } catch (e) {
            dispatch(newPostFailure(e));
        }
    };
};

export const SINGLE_POST_REQUEST = 'SINGLE_POST_REQUEST';
export const SINGLE_POST_SUCCESS = 'SINGLE_POST_SUCCESS';
export const SINGLE_POST_FAILURE = 'SINGLE_POST_FAILURE';

const singlePostRequest = () => ({type:SINGLE_POST_REQUEST});
const singlePostSuccess = data => ({type:SINGLE_POST_SUCCESS,payload:data});
const singlePostFailure = error => ({type:SINGLE_POST_FAILURE,payload:error});

export const singlePost = id => {
    return async dispatch => {
        try{
            dispatch(singlePostRequest());
            const {data} = await axiosApi.get(`/posts/${id}`);

            if (data) {
                dispatch(singlePostSuccess(data));
            }

        } catch (e) {
            dispatch(singlePostFailure(e))
        }
    };
};