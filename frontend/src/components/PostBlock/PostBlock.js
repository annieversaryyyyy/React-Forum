import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import defaultImg from '../../assets/default_post_image.jpg';
import {apiUrl} from "../../config";

const PostBlock = ({title, image, date, author, id, description}) => {
    let cardImg = defaultImg;

    if (image) {
        cardImg = apiUrl + '/' + image;
    }

    return (
        <Grid item>
            <Card sx={{maxWidth: 400, maxHeight: 300, marginBottom: 5, overflow: 'ellipsis'}}>
                <CardMedia
                    component="img"
                    alt={title}
                    height={140}
                    image={cardImg}
                />
                <CardContent>
                    <Typography>
                        {date}
                    </Typography>
                    <Typography sx={{fontStyle: 'italic'}}>
                        post by {author}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link style={{textOverflow:'ellipsis',whiteSpace:'nowrap',overflow:'hidden',maxWidth: 200, maxHeight: 100}} to={`/post/${id}`}>{description}</Link>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default PostBlock;