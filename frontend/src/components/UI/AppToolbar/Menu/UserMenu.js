import * as React from 'react';
import Button from '@mui/material/Button';
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Link} from "react-router-dom";
import {logoutUser} from "../../../../store/actions/userActions";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            <Button
                id="basic-button"
                color={"inherit"}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <p>Hello! <strong>{user}</strong></p>
            </Button>
            <Button color="inherit" component={Link} to="/posts/new">
                Add new post
            </Button>
            <span> or </span>
            <Button onClick={() => dispatch(logoutUser())} color="inherit">
                Logout
            </Button>
        </div>
    );
};

export default UserMenu;