import React, { useEffect, useState, useRef } from 'react'

import { RecordButton } from '../../common/RecordButton/RecordButton'
import { HomeMusicRecommendation } from './HomeMusicRecommendation'
import { HomeMusicGeneration } from './HomeMusicGeneration'
import { MusicRecommendationInfo } from '../Info/MusicRecommendationInfo'
import { EmotionInfo } from '../Info/EmotionInfo'
import DonutChart from '../../common/Charts/DonutChart'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import MGApi from '../../routes/MGApi'
import MRApi from '../../routes/MRApi'
import { tokens } from '../../theme'


import './HomePage.css'
import { ThemeProvider, Container, Typography, Paper, Box, Tab, Button, Grid, Accordion, AccordionSummary, AccordionDetails, CircularProgress, TextField } from '@mui/material'
import { useTheme } from '@mui/material';

import { TabContext, TabList, TabPanel } from '@mui/lab'
import { MusicGenerationInfo } from '../Info/MusicGenerationInfo'

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAudioList, setGeneratedAudioList] = useState([]);
  const [expandedInfo, setExpandedInfo] = useState(false);
  const [musicInfoToDisplay, setMusicInfoToDisplay] = useState(null);
  const [generatedMusicInfoToDisplay, setGeneratedMusicInfoToDisplay] = useState(null);
  const [speechInfo, setSpeechInfo] = useState(null);
  const [audioScatterData, setAudioScatterData] = useState([]);
  const [recommendMode, setRecommendMode] = useState('audio');
  const [generateMode, setGenerateMode] = useState('monophonic');
  const [tab, setTab] = React.useState('1');
  const [loadTime, setLoadTime] = React.useState('15');
  const [predictionLoaded, setPredictionLoaded] = useState(false);
  const [mode, setMode] = useState("1");

  const infoRef = useRef(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const closeInfo = () => {
    setExpandedInfo(false);
  }

  const openInfo = () => {
    if (predictionLoaded === true) {
      setExpandedInfo(true);
    }
  }
  

  const handleChange = (event, newValue) => {
    setTab(newValue);
    // console.log(newValue);

    setExpandedInfo(false);
    setSpeechInfo(null);
  };

  useEffect(() => {
    console.log(musicInfoToDisplay);
  }, [musicInfoToDisplay]);

  useEffect(() => {
    console.log(tab)
    if (tab === "2") {
      document.body.style.backgroundImage = "linear-gradient(45deg, rgb(17, 27, 52), rgb(104, 51, 82) 50%, rgb(20, 32, 81))";
    }
    else {
      document.body.style.backgroundImage = "linear-gradient(45deg, rgb(5 71 75), rgb(140 95 95) 50%, rgb(9 75 77))";
    }
  }, [tab])


  return (
    // <ThemeProvider theme={theme}>
    <TabContext id="home-page" value={tab}>
      <Box sx={{ height: "100vh", width: "100%"}}>
        {
          (isLoading)
          ? <Box align="center" sx={{ width: "100%", height: "100%", position: "fixed", bgcolor: "rgba(0, 0, 0, 0.6)", zIndex: "100"}}>
              <CircularProgress size={50} thickness={3} sx={{mt: "45vh"}}></CircularProgress>
              <Typography variant="h4" color={colors.primary[500]}>analyzing...</Typography>
              {
                (tab === "1")
                  ? (loadTime == "60")
                      ? <Typography variant="text" color={colors.primary[600]}>(approx. 1 minute)</Typography>
                      : <Typography variant="text" color={colors.primary[600]}>(approx. {loadTime} seconds)</Typography>
                  : <Typography variant="text" color={colors.primary[600]}>(approx. 1 minute)</Typography>
              }
            </Box>
          : ""
        }
        {/* <Grid item xs={1}> */}
          <Typography
            variant="h1"
            sx={{ height: "70px", textAlign: "center", pt: "20px"}}
            color={colors.grey[100]}
          >
            YouTube Emotion Detection
          </Typography>
        {/* </Grid> */}
        {/* <Grid item xs={1}> */}
          {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
            {/* <TabList
              onChange={handleChange}
              TabIndicatorProps={{ color: colors.primary[100] }}
              aria-label="music recommendation or music generation"
              centered
              
            >
              <Tab 
                sx={{ 
                  height: "2px",
                  py: "0px",
                  // color: 
                  '.Mui-selected' : {
                    color: colors.primary[200],
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: 'red'
                  }
                }}
                textColor={colors.primary[200]}
                indicatorColor={colors.primary[200]}
                label=""
                value="1"
              />
              <Tab sx={{ height: "2px", py: "0px"}} label="" value="2" />
            </TabList> */}
          {/* </Box> */}
        {/* </Grid> */}
        {/* <Grid item xs={10} sx={{ height: "80%"}} > */}
          <Container id="tabs" maxWidth="1600px" sx={{height: "calc(100% - 110px)", width: "100%" }}>
            <TabPanel value="1" sx={{height: "100%", pt: 0}}>
              <HomeMusicRecommendation
                  setIsLoading={setIsLoading}
                  setExpandedInfo={setExpandedInfo}
                  setMusicInfoToDisplay={setMusicInfoToDisplay}
                  setSpeechInfo={setSpeechInfo}
                  speechInfo={speechInfo}
                  recommendMode={recommendMode}
                  setRecommendMode={setRecommendMode}
                  setAudioScatterData={setAudioScatterData}
                  infoRef={infoRef}
                  setLoadTime={setLoadTime}
                  predictionLoaded={predictionLoaded}
                  setPredictionLoaded={setPredictionLoaded}
                  mode={mode}
                  setMode={setMode}
              ></HomeMusicRecommendation>
              <Paper 
                sx={{
                  bgcolor: theme.palette.background.paper,
                  borderRadius: "6px",
                  mt: 3,
                  backgroundImage: "none",
                  border: "1px solid rgba(255, 255, 255, 0.12)"}
                }
                ref={infoRef}
              >
                <Accordion expanded={expandedInfo} square sx={{height: "100%", bgcolor: "rgba(0,0,0,0)", backgroundImage: "none", cursor: "default"}}>
                  <AccordionSummary
                    sx={{borderRadius: "100px", bgcolor: "rgba(0,0,0,0)", cursor: "default"}}
                    // expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography id="more-info" onClick={openInfo} sx={{ textAlign: "center", width: "100%", pt: "7px", pb: "3px", fontSize: "0.9rem"}}>MORE INFO</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* <Typography> */}
                      {
                        <EmotionInfo mode={mode} />
                      }
                      <Button
                        variant="text"
                        align="center"
                        sx={{bgcolor: colors.grey[800], width: "100%", height: "25px"}}
                        onClick={closeInfo}
                      >
                        close info
                      </Button>
                    {/* </Typography> */}
                  </AccordionDetails>
                </Accordion>
              </Paper>
              
            </TabPanel>
            <TabPanel value="2" sx={{height: "100%", pt: 0}}>
              <HomeMusicGeneration
                    setIsLoading={setIsLoading}
                    setExpandedInfo={setExpandedInfo}
                    setGeneratedMusicInfoToDisplay={setGeneratedMusicInfoToDisplay}
                    setSpeechInfo={setSpeechInfo}
                    speechInfo={speechInfo}
                    generateMode={generateMode}
                    setGenerateMode={setGenerateMode}
                    infoRef={infoRef}
                    setLoadTime={setLoadTime}
                ></HomeMusicGeneration>
                <Paper 
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    borderRadius: "6px",
                    mt: 3,
                    backgroundImage: "none",
                    border: "1px solid rgba(255, 255, 255, 0.12)"}
                  }
                  ref={infoRef}
                >
                  <Accordion expanded={expandedInfo} square sx={{height: "100%", bgcolor: "rgba(0,0,0,0)", backgroundImage: "none", cursor: "default"}}>
                    <AccordionSummary
                      sx={{borderRadius: "100px", bgcolor: "rgba(0,0,0,0)", cursor: "default"}}
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography sx={{ textAlign: "center", width: "100%", pt: "7px", pb: "3px", fontSize: "0.9rem"}}>MORE INFO</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <Typography> */}
                        {
                          <TextField fullWidth id="outlined-basic" label="YouTube Link" variant="outlined" />
                        }
                        <Button
                          variant="text"
                          align="center"
                          sx={{bgcolor: colors.grey[800], width: "100%", height: "25px"}}
                          onClick={closeInfo}
                        >
                          close info
                        </Button>
                      {/* </Typography> */}
                    </AccordionDetails>
                  </Accordion>
                </Paper>
            </TabPanel>
          </Container>
        {/* </Grid> */}
      </Box>
    </TabContext>
    // </ThemeProvider>

  );

  // return (
  //   <TabContext id="home-page" value={tab}>
  //     <header>Emotion-based Music Provider</header>
  //     <section id="EBMP-main">
  //       <Box id="tabsMenu" sx={{ borderBottom: 1, borderColor: 'divider' }}>
  //         <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
  //           <Tab label="Music Recommendation" value="1" />
  //           <Tab label="Music Generation" value="2" />
  //         </TabList>
  //       </Box>
  //       <div id="tabs">
  //         <TabPanel value="1">
  //           <HomeMusicRecommendation setIsLoading={setIsLoading} ></HomeMusicRecommendation>
  //         </TabPanel>
  //         <TabPanel value="2">Item Two</TabPanel>
  //       </div>
        
  //     </section>

  //     {
  //       (isLoading === true)
  //       ? <div id="loading">
  //           <div id="loader"></div>
  //         </div>
  //       : <div id="loading" className='not-loading'>
  //           <div id="loader"></div>
  //         </div>
  //     }
  //   </TabContext>
  // );
}