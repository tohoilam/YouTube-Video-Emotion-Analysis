import React, { useEffect, useState, useRef } from 'react'

import { Grid, Typography, Paper, Box, Button, useTheme, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

import { tokens } from '../../theme';

import BarChart from '../../common/Charts/BarChart'
import LineChart from '../../common/Charts/LineChart';
import BumpChart from '../../common/Charts/BumpChart';

export const HomeMusicRecommendation = ({
    setIsLoading,
    setExpandedInfo,
    setMusicInfoToDisplay,
    setSpeechInfo,
    speechInfo,
    recommendMode,
    setRecommendMode,
    setAudioScatterData,
    infoRef,
    setLoadTime,
    predictionLoaded,
    setPredictionLoaded,
    mode,
    setMode
  }) => {

  const [youTubeLinkPlaceholder, setYouTubeLinkPlaceholder] = useState("");
  const [youTubeID, setYouTubeID] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  

  const moreInfo = (selectedMusic) => {
    setExpandedInfo(true);
    setTimeout(() => {
      infoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, "300");
  }


  const setYouTube = (e) => {
    setYouTubeLinkPlaceholder(e.target.value);
  }

  const predictEmotion = () => {
    setIsLoading(true);
    if (youTubeLinkPlaceholder === "https://www.youtube.com/watch?v=IFj4v7niPRI") {
      setMode("1");
    }
    else if (youTubeLinkPlaceholder === "https://www.youtube.com/watch?v=YvPerZLPnm4") {
      setMode("2");
    }
    const videoID = youTubeLinkPlaceholder.split("v=")[1];
    setYouTubeID(videoID);

    setTimeout(() => {
      setPredictionLoaded(true);
      setIsLoading(false);
    }, 3000);
  }

  return (
    <Grid container spacing={3} sx={{height: "100%", pt: "20px"}} alignItems="stretch" justifyContent="space-between" >
      <Grid item xs={12} sm={4} xl={3} sx={{ height: "100%", overflowY: "auto"}}  >
        <Paper variant="outlined" sx={{ bgcolor: theme.palette.background.paper, borderRadius: "6px", p: 2, overflowY: "auto" }}>
          <Grid container alignItems="flex-start" justifyContent="space-between" spacing={1} sx={{  p:1 }}>
            <Grid item xs={12} sx={{height: "100px", minWidth: "84px", m: 0}}>
              <TextField fullWidth id="outlined-basic" label="YouTube Link" variant="outlined" onChange={setYouTube} />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  height: "45px",
                }}
                onClick={predictEmotion}
                startIcon={<FaceRetouchingNaturalIcon />}
              >
                PREDICT
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper variant="outlined" sx={{backgroundColor: colors.background.paper, height: "120px", p: 2, pt: 2, mt: 3, height: "71.5%", borderRadius: "6px"}}>
          <Typography variant="h3" color={colors.grey[100]} align="center" >
            Overall emotion
          </Typography>
          {
            (predictionLoaded)
            ? <BarChart mode={mode} />
            : ""
          }
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8} xl={9} sx={{ height: "100%"}} >
        <Paper variant="outlined" sx={{ height: "100%", maxHeight: "100%", bgcolor: theme.palette.background.paper, borderRadius: "6px", px: 2, py: 1, overflowY: "auto" }}>
          {
            (predictionLoaded)
              ? <Grid item xs={12} sx={{height: "100%", width: "100%", m: 0}}>
                  <Grid item xs={12} sx={{height: "400px", width: "900px", m: 0}}>
                    <iframe width="900" height="400"
                      src={`https://www.youtube.com/embed/${youTubeID}`}>
                    </iframe>-=
                  </Grid>
                  <Grid item xs={12} sx={{height: "160px", width: "900px", m: 0}}>
                    <LineChart mode={mode} />
                  </Grid>
                  <Grid item xs={12} sx={{height: "180px", width: "900px", m: 0}}>
                    <BumpChart mode={mode} />
                  </Grid>
                </Grid>
              : ""
          }
        </Paper>
      </Grid>
     </Grid>
  )
}
