import React, {useEffect} from 'react';
import {Card, CardMedia, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import {singlePost} from "../../store/actions/postActions";
import defaultImg from '../../assets/default_post_image.jpg';
import {apiUrl} from "../../config";
import CommentForm from "../../components/CommentForm/CommentForm";
import Comments from "../../components/Comments/Comments";
import Spinner from "../../components/Spinner/Spinner";

const SinglePost = ({match}) => {
    const dispatch = useDispatch();
    const post = useSelector(state => state.posts.singlePost);
    const loading = useSelector(state => state.posts.loading);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(singlePost(match.params.id));
    }, [dispatch, match.params.id]);

    if (loading) return <Spinner />

    return post && (
        <>
        <Grid container>
            <Grid item justifyContent='column' sx={{padding:'10px',borderBottom:'2px solid black',borderRadius:5,width:'100%'}}>
                <Card sx={{maxWidth: 345}}>
                    <CardMedia
                        component='img'
                        image={post.image ? `${apiUrl}/${post.image}` : defaultImg}
                        height="auto"
                    />
                </Card>
                <Typography component="h5" sx={{fontWeight: 'bold', fontSize: 20}}>
                    Post by {post.author.username}
                </Typography>
                <Typography sx={{marginBottom:10}}>
                    {dayjs(post.datetime).format('YYYY-MM-DD [at] HH:mm:ss')}
                </Typography>
                <Typography sx={{textAlign:'center'}}>
                    {post.description}
                </Typography>
            </Grid>
        </Grid>

            <Comments post={match.params.id} />

            <h1>Add new comment</h1>
            {user ? <CommentForm post={match.params.id}/> : <div>Please login for send message</div>}
        </>
    );
};

export default SinglePost;