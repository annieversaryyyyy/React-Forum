import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from "tss-react/mui";
import {Avatar, Container, Grid, Typography, Link, Alert} from "@mui/material";
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import ButtonLoading from "../../components/UI/Form/ButtonLoading/ButtonLoading";
import {clearLoginErrors, loginUser} from "../../store/actions/userActions";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: `${theme.palette.error.main} !important`,
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: `${theme.spacing(2, 0)} !important`,
    },
    alert: {
        margin: theme.spacing(3, 0),
        width: '100%'
    }
}));

const Login = () => {
    const { classes } = useStyles();

    const dispatch = useDispatch();
    const error = useSelector(state => state.users.loginError);
    const loading = useSelector(state => state.users.loginLoading);

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            dispatch(clearLoginErrors());
        }
    }, [dispatch]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        dispatch(loginUser({...user}));
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccessibleForwardIcon/>
                </Avatar>
                <Typography component="h1" variant="h6">
                    Login
                </Typography>

                {error && (
                    <Alert className={classes.alert}
                           severity="error"
                    >
                        {error.message}
                    </Alert>
                )}

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                >
                    <FormElement
                        required={true}
                        label="Username"
                        name="username"
                        value={user.username}
                        onChange={inputChangeHandler}
                    />
                    <FormElement
                        type="password"
                        required={true}
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                    />
                    <Grid item xs={12}>
                        <ButtonLoading
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="error"
                            className={classes.submit}
                            loading={loading}
                            disabled={loading}
                        >
                            Login
                        </ButtonLoading>
                    </Grid>
                </Grid>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/register">
                            Register
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Login;