import './App.css';
import { Typography, AppBar, Toolbar } from '@mui/material';
import FCLogin from './FC/Login/FCLogin';
import React from 'react'
function App() {

  return (
    <div className="App">
      <FCLogin />
      <footer>
        <Typography variant="h6" color="primary" >
          Did you like <strong>TinyURL</strong>?
          <br />
          <a href="https://ko-fi.com/ometz" target="_blank" >You can buy my ☕!</a>
        </Typography>
      </footer>
    </div>
  );
}


export default App;
