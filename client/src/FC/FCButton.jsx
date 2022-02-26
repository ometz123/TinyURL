import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme } from '@material-ui/core/styles';

export default function FCButton({longURLHandler}) {
    return (
        <Button
            variant="contained"
            color="success"
            onClick={longURLHandler}
            testid="Button_CreateTinyURL"
        >
            Shrink!
        </Button>
    );
}
