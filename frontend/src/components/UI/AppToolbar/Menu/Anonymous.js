import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

const Anonymous = () => {
    return (
        <>
            <Button component={Link} to="/register" color="inherit">
                Register
            </Button>
            <span>or</span>
            <Button component={Link} to="/login" color="inherit">
                Login
            </Button>
        </>
    );
};

export default Anonymous;