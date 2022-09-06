import React, { useEffect, useState, useRef } from 'react'
import logo from '../../logo.svg';
import FCAdmin from './FCAdmin';
import FCTextField from '../../FC/FCTextField';
import FCButton from '../../FC/FCButton';
import { Box } from '@mui/system';
import { Typography, AppBar, Toolbar, TextField, Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import FCTable from '../FCTable';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import FCUser from './FCUser';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import FCSingUpDialog from './FCSingUpDialog';

export default function FCLogin() {
    //let userName = "";
    //let userPassword = "";
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [alert, setAlert] = useState(<></>)
    const [dialog, setDialog] = useState(<></>)
    const [userName, setUserName] = useState("User");
    const isAdmin = false;
    const [userPassword, setUserPassword] = useState("");
    const [url, setUrl] = useState("");
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const textInput = useRef(null);
    let navigate = useNavigate();


    const view = () => {
        if (!loading) {
            return (
                <div>
                    <Box sx={{ display: 'flex', m: 1, p: 1, border: 1, borderColor: 'primary' }}>
                        <FCTextField
                            urlUpdated={urlUpdated}
                            inputRef={textInput}
                        />
                        <FCButton
                            onClick={longURLHandler}
                            title="Shrink!"
                            color="success"
                            disabled={url.length < 5}
                        />
                    </Box>
                </div>)
        }
        else return (<CircularProgress
            style={{
                color: '#fcaf17',
                animationDuration: '700ms',
                strokeLinecap: 'round',
            }}
            size={45}
            thickness={4} />)
    }
    const longURLHandler = async () => {
        setLoading(true);
        const res = await axios.post("/shortUrls", { url, userName, isAdmin })
            // Added: "proxy": "http://localhost:5000" to package.json
            .catch(err => {
                console.error(err);
            });
        console.log(res.data);
        setUrls([...urls, {
            tiny: res.data.shortUrl.short,
            full: url
        }]);
        console.log(textInput);
        setUrl("");
        setLoading(false);
        textInput.current.value = "";
    };
    const test = async () => {
        console.log("Clicked on test");
        let time = new Date().getTime();
        const res = await axios.get("/test") // Added: "proxy": "http://localhost:5000" to package.json
            .catch(err => { console.error(err); });
        if (res) {
            res.data && console.log("Client=> Server=>  Client Respons Miliseconds: ", new Date().getTime() - time);
            res.data && console.log("Server => Client Miliseconds: ", res.data.time - time);
            console.log("res: ", res);
            //console.log("res: ", res.data);

        }
    };

    const urlUpdated = ({ target: { value } }) => {
        setUrl(value);
    };

    const getAllURLs = async (user) => {
        console.log('====================================');
        console.log("getAllURLs", user);
        console.log('====================================');
        const res = await axios.post("http://localhost:5000", user)
            .catch(err => {
                console.error(err);
            });
        if (res.data !== "No URLs") {
            setUrls(res.data.shortUrls.map((url) => {
                return { tiny: url.short, full: url.full }
            }))
        } else { setUrls([]) }

    };
    const handleUserName = ({ target: { value } }) => {
        setUserName(value)
        console.log(userName);
    }
    const handleUserPassword = ({ target: { value } }) => {
        console.log(userPassword);
        setUserPassword(value)
    }
    const login = async () => {
        const res = await axios.post("/login", { userName, password: userPassword })
            .catch(err => {
                console.log({ err });
                handleStatus(err.response.data.length > 0 ? err.response.data : err.response.statusText, err.response.status);
            });
        if (res) {
            console.log({ res });
            handleStatus(`Hello ${res.data.userName}`, res.status);
            if (res.data.isAdmin) {
                console.log('====================================');
                console.log("Hello Admin!");
                navigate(`/admin`)
                console.log('====================================');
            } else {
                console.log('====================================');
                console.log("Hello User!");
                navigate(`/`)
                console.log('====================================');
            }
            localStorage.setItem("user", JSON.stringify(res.data))
            setUser(res.data)
            //await getAllURLs()
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
    useEffect(async () => {
        const user = localStorage.getItem("user");
        console.log(`localStorage "user":`, JSON.parse(user));
        if (user) {
            await getAllURLs(JSON.parse(user));
        }
    }, [, user]);


    return (
        <div>
            <div style={{ textAlign: "justify", margin: 4, padding: 2 }}>
                <div  >
                    <div className='row'>
                        <div >
                            <TextField
                                label="User Name"
                                style={{ margin: 4, padding: 2 }}
                                type="text"
                                onChange={handleUserName}
                            />
                            <TextField
                                label="Password"
                                style={{ margin: 4, padding: 2 }}
                                type="password"
                                onChange={handleUserPassword}
                            />
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                className="My-Button"
                                onClick={login}
                                disabled={!(userName.length > 3 && userPassword.length > 5)}
                                type='button'
                            >
                                <p>

                                    Login
                                </p>
                            </Button>
                        </div>
                    </div>
                    <div>
                        {alert}
                    </div>
                    {/* <Link
                    to="/admin">
                    <Button
                        disabled={allowLogin}
                        type='button'
                        variant="contained"

                    >
                        <p>
                            Login
                        </p>
                    </Button>
                </Link> */}

                </div>
                <div style={{ display: "flex" }}>
                    don't have an account yet?
                    <FCSingUpDialog />
                </div>
            </div>
            <div>

            </div>
            <div >
                <img src={logo} className="App-logo" alt="logo" />
                <Typography variant="h4" color="primary" testid="MyHeader">
                    Tiny URL
                </Typography>
            </div>
            <div className="App-container">
                {view()}
                <Link to="/admin">Admin</Link>
                <Link to="/">User</Link>
                <Routes>
                    <Route path="/" element={<FCUser />} />
                    <Route path="/admin" element={<FCAdmin />} />
                </Routes>
            </div>
            <FCButton
                onClick={test}
                title="Test!"
                color="primary" />
            <br />
            <br />
            <div style={{ textAlign: "-webkit-center" }}>
                <FCTable urls={urls} />
            </div>
        </div >
    )
}
