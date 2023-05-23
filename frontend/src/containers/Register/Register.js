import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from "tss-react/mui";
import {Avatar, Container, Grid, Typography, Link, Alert} from "@mui/material";
import AccessibleIcon from '@mui/icons-material/Accessible';
import {useDispatch, useSelector} from "react-redux";
import {clearRegisterErrors, registerUser} from "../../store/actions/userActions";
import FormElement from "../../components/UI/Form/FormElement";
import ButtonLoading from "../../components/UI/Form/ButtonLoading/ButtonLoading";

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
}));

const Register = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
    const loading = useSelector(state => state.users.registerLoading);

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            dispatch(clearRegisterErrors());
        }
    }, [dispatch]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setUser(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        dispatch(registerUser({...user}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };


    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccessibleIcon/>
                </Avatar>
                <Typography component="h1" variant="h6">
                    Registration
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
                        error={getFieldError('username')}
                    />
                    <FormElement
                        type="password"
                        required={true}
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                        error={getFieldError('password')}
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
                            Sign Up
                        </ButtonLoading>
                    </Grid>
                </Grid>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/login">
                            Already have an account? Then sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;