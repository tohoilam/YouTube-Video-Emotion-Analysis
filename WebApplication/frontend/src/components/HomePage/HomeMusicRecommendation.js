import React, { useEffect, useState, useRef } from 'react'

import { Grid, Typography, Paper, Box, Button, useTheme, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';

import { RecordButton } from '../../common/RecordButton/RecordButton'
import MRApi from '../../routes/MRApi'
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

  // const [recordedAudio, setRecordedAudio] = useState(null);
  // const [withText, setWithText] = useState(true);
  // const [recommendedMusic, setRecommendedMusic] = useState([]);
  // const [genre, setGenre] = useState("pop");
  // const [numOfSongs, setNumOfSongs] = useState(20);
  // const [selectedMode, setSelectedMode] = useState('audio');

  // const [dropActive, setDropActive] = useState([]);
	// const audioFileInputRef= useRef(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  

  const moreInfo = (selectedMusic) => {
  //   setMusicInfoToDisplay(selectedMusic);
    
  //   const selectedMusicPoints = [{
  //     "x": selectedMusic["audio"]["valence"],
  //     "y": selectedMusic["audio"]["arousal"]
  //   }]

  //   const nonSelectedMusicPoints = recommendedMusic
  //                                   .filter(music => music['spotify_id'] !== selectedMusic['spotify_id'] )
  //                                   .map(music => {
  //                                     return ({
  //                                       "x": music["audio"]["valence"],
  //                                       "y": music["audio"]["arousal"]
  //                                     })
  //                                   })

  //   const va = emotionPercentagesToVA(speechInfo["audio"]["percentage"]);

  //   const speechPoints = [{
  //     "x": va["valence"],
  //     "y": va["arousal"]
  //   }];

  //   setAudioScatterData([
  //     {
  //       "id": "Other Songs",
  //       "data": nonSelectedMusicPoints
  //     },
  //     {
  //       "id": "Speech",
  //       "data": speechPoints
  //     },
  //     {
  //       "id": "Selected Song",
  //       "data": selectedMusicPoints
  //     }
  //   ]);


    setExpandedInfo(true);
    setTimeout(() => {
      infoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, "300");
  }


  // useEffect(() => {
  //   console.log(recordedAudio);
  // }, [recordedAudio])


  // const EmotionItem = () => {
  //   let emotionText = "";
  //   let percentage = 0;

  //   if (recommendMode === 'audio') {
  //     if (speechInfo && 'audio' in speechInfo) {
  //       emotionText = speechInfo['audio']['emotion'];
  //       percentage = speechInfo['audio']['percentage'][emotionText];
  //     }
  //   }
  //   else {
  //     if (speechInfo && 'combined' in speechInfo) {
  //       emotionText = speechInfo['combined']['emotion'];
  //       percentage = speechInfo['combined']['percentage'][emotionText];
  //     }
  //   }

  //   if (emotionText && percentage) {
  //     const text = emotionText + " (" + toPercentageFormat(percentage).toString() + "%)"

  //     return (
  //       <Paper variant="outlined" sx={{ bgcolor: colors.emotion[emotionText], borderRadius: "20px", height: "100%" }}>
  //         <Typography variant="h3" align="center" sx={{pt: "5px"}}>{text}</Typography>
  //       </Paper>
  //     )
  //   }
  //   else {
  //     return "";
  //   }
  // }

  const setYouTube = (e) => {
    setYouTubeLinkPlaceholder(e.target.value);
  }

  const predictEmotion = () => {
    setIsLoading(true);
    if (youTubeLinkPlaceholder === "https://www.youtube.com/watch?v=IFj4v7niPRI") {
      setMode("1");
    }
    else if (youTubeLinkPlaceholder === "https://www.youtube.com/watch?v=odzKEGe_iuk") {
      setMode("2");
    }
    const videoID = youTubeLinkPlaceholder.split("v=")[1];
    setYouTubeID(videoID);

    setTimeout(() => {
      setPredictionLoaded(true);
      setIsLoading(false);
    }, 1000);
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
