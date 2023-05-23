import React from 'react';
import {Typography} from "@mui/material";
import PostForm from "../../components/PostForm/PostForm";
import {newPost} from "../../store/actions/postActions";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";

const NewPost = ({history}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    const SubmitHandler = data => {
        dispatch(newPost(data));
        history.push('/');
    };

    if (!user) {
        toast.warning('🦔 You need login!', {position: 'top-right', autoClose: 3500});
        return <Redirect to='/login' />
    }

    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                New post
            </Typography>
            <PostForm onSubmit={SubmitHandler}/>
        </>
    );
};

export default NewPost;