import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchComments} from "../../store/actions/commentActions";

const Comments = ({post}) => {
    const comments = useSelector(state => state.comments.comments);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchComments(post));
    }, [dispatch]);

    if (!comments.length) return  (
        <div>There is no comments</div>
    )

    return (
    <>
        {
            comments.map(comment => (
                <div key={comment._id}>
                    <p>{comment.description}</p>
                </div>
            ))
        }
    </>
    );
};

export default Comments;