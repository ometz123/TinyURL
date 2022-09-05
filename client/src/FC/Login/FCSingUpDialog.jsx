import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Alert, Stack, TextField } from '@mui/material';
import { useState } from 'react';
const axios = require('axios');

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FCSingUpDialog() {
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [alert, setAlert] = useState(<></>)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleUserName = ({ target: { value } }) => {
        setUserName(value)
        console.log(userName);
    }
    const handleUserPassword = ({ target: { value } }) => {
        setUserPassword(value)
        console.log(userPassword);
    }
    const handleSignUp = async () => {
        const res = await axios.post("/signUp", {
            "userName": userName,
            "password": userPassword,
        }).catch(err => {
            handleError(err)
        });
        //console.log({ res });
    }
    const handleError = async (err) => {
        console.error({ err });
        if (err.response) {
            const severity = err.stack.slice(0, err.stack.indexOf(":")).toLowerCase();
            setAlert(
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity={severity}>{err.response.data}</Alert>
                </Stack>);
        }
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
                setAlert(<></>)
            }, 5000);
        })
    };
    return (
        <div>
            <Button
                size="small"
                onClick={handleClickOpen}>
                Join Now
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Join Tiny URL"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Create an account and you will be able to create
                        your own tiny URLs, save and access them at any time.
                        <br />
                        <br />

                    </DialogContentText>
                    It's Free! &#128526;
                    <div style={{ textAlign: "-webkit-center", margin: 4, padding: 2 }}>
                        <div >
                            <TextField
                                label="User Name"
                                style={{ margin: 4, padding: 2 }}
                                onChange={handleUserName}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onChange={handleUserPassword}

                                style={{ margin: 4, padding: 2 }}
                            />
                        </div>
                        <div>
                            {alert}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <div>
                        <Button className="My-Button" onClick={handleClose}>Cancel</Button>
                        <Button className="My-Button" onClick={handleSignUp}>Sign Up</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
