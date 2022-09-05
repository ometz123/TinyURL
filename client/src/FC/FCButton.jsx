import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme } from '@material-ui/core/styles';

export default function FCButton(props) {
    return (
        <Button
            variant="contained"
            className="My-Button"
            testid={"Button_Test_" + props.title}
            {...props}
        >
            {props.title}
        </Button>
    );
}
