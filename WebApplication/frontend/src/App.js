import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { Helmet } from 'react-helmet';

import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

import './App.css'
import './Common.css'

import { HomePage } from './components/HomePage/HomePage'


function App() {

  const [theme, colorMode] = useMode();


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div>
          <Helmet>
            <title>Emotion-based Music Provider</title>
            <meta name='description' content='Emotion-based Music Provider Application' />
          </Helmet>
          <Routes>
            <Route path="/" element={<HomePage/>} />
          </Routes>
          <script src="https://open.spotify.com/embed-podcast/iframe-api/v1" async></script>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App