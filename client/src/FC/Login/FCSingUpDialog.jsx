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

export default function FCSingUpDialog({ login }) {
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
    }
    const handleUserPassword = ({ target: { value } }) => {
        setUserPassword(value)
    }
    const handleSignUp = async () => {
        const res = await axios.post("/signUp", {
            "userName": userName,
            "password": userPassword,
        }).catch(err => {
            handleStatus(err.response.data.length > 0 ? err.response.data : err.response.statusText, err.response.status);
        });
        if (res) {
            console.log({ res });
            await handleStatus(`Hello ${res.data.userName}`, res.status);
            setOpen(false);
            login(userName, userPassword)
        }
    }
    const handleStatus = async (data, status) => {
        console.log({ data, status });
        let severity = "";
        switch (true) {
            case status >= 500:
                severity = "error"
                break;
            case status >= 400:
                severity = "error"
                break;
            case status >= 300:
                severity = "warning"
                break;
            case status >= 200:
                severity = "success"
                break;
            case status >= 100:
                severity = "info"
                break;

            default:
                severity = "info";
                break;
        }
        setAlert(
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity={severity}>{data}</Alert>
            </Stack>);

        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
                setAlert(<></>)
            }, 5000);
        })
    }
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
