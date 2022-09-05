import React,{ useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, Grid, InputLabel, OutlinedInput, Typography } from "@mui/material";

export default function FCTextField({ urlUpdated,inputRef }) {

    return (
        <TextField
            fullWidth
            autoComplete='off'
            label="Long URL"
            id="LongURL"
            color='primary'
            inputProps={{ 
                style: { color: "blue", },
                testid:"input_URLInput"
             }}
            onChange={urlUpdated}
            testid="URLInput"
            inputRef={inputRef}
        />
    
    );
}
