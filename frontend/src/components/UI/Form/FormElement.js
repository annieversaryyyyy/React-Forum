import React from 'react';
import {Grid, TextField} from "@mui/material";

const FormElement = ({name, value, onChange, label, error, type, required}) => {
    return (
        <Grid item xs={12}>
            <TextField
                type={type}
                required={required}
                name={name}
                value={value}
                label={label}
                onChange={onChange}
                error={Boolean(error)}
                helperText={error}
                autoComplete={name}
            />
        </Grid>
    );
};

export default FormElement;