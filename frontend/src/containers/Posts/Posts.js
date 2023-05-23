import React, {useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../../store/actions/postActions";
import PostBlock from "../../components/PostBlock/PostBlock";
import dayjs from "dayjs";
import Spinner from "../../components/Spinner/Spinner";

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const loading = useSelector(state => state.posts.loading);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading) return <Spinner />

    if (!loading && !posts) return (
        <Typography variant="h5">
            There is no posts
        </Typography>
    )

    return posts && (
        <Grid container direction="column" spacing={2}>
            <Grid item container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h5">
                        Posts
                    </Typography>

                    {posts.map(elem => (
                        <PostBlock
                            key={elem._id}
                            id={elem._id}
                            title={elem.title}
                            date={dayjs(elem.datetime).format('YYYY-MM-DD [at] HH:mm:ss')}
                            author={elem.author.username}
                            description={elem.description}
                            image={elem.image}
                        />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Posts;