import logo from './logo.svg';
import './App.css';
import FCTextField from './FC/FCTextField';
import FCButton from './FC/FCButton';
import { Box } from '@mui/system';
import { Typography, AppBar, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FCTable from './FC/FCTable';

function App() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);

  const longURLHandler = async () => {
    const res = await axios.post("/shortUrls", { url })
      .catch(err => {
        console.error(err);
      });

    setUrls([...urls, { tiny: res.data.shortUrl.short, full: url }]);

  };

  const urlUpdated = ({ target: { value } }) => {
    setUrl(value);
  };

  const getAllURLs = async () => {
    const res = await axios.get("http://localhost:5000/")
      .catch(err => {
        console.error(err);
      });
    if (res.data !== "No URLs") {
      setUrls(res.data.shortUrls.map((url) => {
        return { tiny: url.short, full: url.full }
      }))
    }
  };

  useEffect(() => {
    getAllURLs()
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Box sx={{ display: 'flex', m: 1, p: 1, }}>
          <Typography variant="h4" color="primary" testid="MyHeader">
            Tiny URL
          </Typography>
        </Box>
        <div>
          <Box sx={{ display: 'flex', m: 1, p: 1, }}>
            <FCTextField urlUpdated={urlUpdated} />
            <FCButton longURLHandler={longURLHandler} />
          </Box>
        </div>
      </header>
      <div>
        <FCTable urls={urls} />
      </div>
      <footer>
        <Typography variant="h6" color="primary" >
          Omer Tzafrir
        </Typography>
      </footer>
    </div>
  );
}


export default App;
