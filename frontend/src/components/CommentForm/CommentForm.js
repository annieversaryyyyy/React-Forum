import React, {useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {createComment} from "../../store/actions/commentActions";

const CommentForm = ({post}) => {
    const [state, setState] = useState({
        description: ""
    });

    const dispatch = useDispatch();

    const submitFormHandler = async (e) => {
        e.preventDefault();

        if (!state.description) return;

        const commentData = { post };

        Object.keys(state).forEach(key => {
            commentData[key] = state[key];
        });

        try {
            const createdComment = await dispatch(createComment(commentData));
            if (createdComment) refreshPage();
        } catch (error) {
            console.log(error);
        }
    };

    function refreshPage() {
        window.location.reload(false);
    }

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };


    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid
                container
                maxWidth="md"
                textAlign="center"
                marginX="auto"
                direction="column"
                rowSpacing={2}
            >

                <Grid item>
                    <TextField
                        multiline
                        rows={3}
                        label="Description"
                        name="description"
                        required
                        value={state.description}
                        onChange={inputChangeHandler}
                    />
                </Grid>

                <Grid item>
                    <Button type="submit" color="error" variant="contained">Create new comment</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default CommentForm;