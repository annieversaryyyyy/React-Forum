import React from 'react';
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import UserMenu from "./Menu/UserMenu";
import Anonymous from "./Menu/Anonymous";
import {ToastContainer} from "react-toastify";

const useStyles = makeStyles()(theme => ({
    mainLink: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        },
    },
    staticToolbar: {
        marginBottom: theme.spacing(2)
    },
}));

const AppToolbar = () => {
    const { classes } = useStyles();
    const user = useSelector(state => state.users.user);

    return (
        <>
            <AppBar position="fixed" color='error'>
                <ToastContainer />

                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h6">
                                <Link to="/" className={classes.mainLink}>
                                    Forum
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;