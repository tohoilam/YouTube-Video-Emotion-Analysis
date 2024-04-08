import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import { Grid, Box, Typography, Paper, useTheme } from '@mui/material'
import { tokens } from '../../theme'

import DonutChart from '../../common/Charts/DonutChart'
import ImageChart from '../../common/Charts/ImageChart'
import AudioChart from '../../common/Charts/AudioChart'
import RadialChart from '../../common/Charts/RadialChart'
import Header from '../../common/Header'

export const EmotionInfo = ({mode}) => {

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

  const [imageEmotionRadialData1, setImageEmotionRadialData1] = useState([]);
  const [imageEmotionRadialData2, setImageEmotionRadialData2] = useState([]);
  const [audioEmotionRadialData1, setAudioEmotionRadialData1] = useState([]);
  const [audioEmotionRadialData2, setAudioEmotionRadialData2] = useState([]);
  const [textEmotionDonutData1, setTextEmotionDonutData1] = useState([]);
  const [textEmotionDonutData2, setTextEmotionDonutData2] = useState([]);
  const [textTranscript1, setTextTranscript1] = useState("");
  const [textTranscript2, setTextTranscript2] = useState("");


  const getData = (youtubeUrl) => {
    fetch(youtubeUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setImageEmotionRadialData1(data['image1']);
      setImageEmotionRadialData2(data['image2']);
      setAudioEmotionRadialData1(data['audio1']);
      setAudioEmotionRadialData2(data['audio2']);
      setTextEmotionDonutData1(data['textEmotion1']);
      setTextEmotionDonutData2(data['textEmotion2']);
      setTextTranscript1(data['text1']);
      setTextTranscript2(data['text2']);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

	return (
		<Grid
			container
			spacing={3}
			direction="row"
			justify="flex-start"
			alignItems="flex-start"
			alignContent="stretch"
			sx={{p: 1}}
		>

			{/* Image Modality */}
			<Grid item xs={12} >
				<Typography variant="h1">
					Modality: Image
				</Typography>
			</Grid>

			<Grid item xs={6}>
				<RadialChart data={(mode === "1") ? imageEmotionRadialData1 : imageEmotionRadialData2} height="276px" title="Image Emotion" />
			</Grid>

			{
				// Loop from 1 to 3
				[1, 2, 3].map((index) => (
					<Grid item xs={6}>
						<ImageChart imageName={mode + "_image_" + index + ".png"} height="275px" title={"Image " + index} />
					</Grid>
				))
			}


			<Grid item xs={12} mt={5} >
				<Typography variant="h1">
					Modality: Audio
				</Typography>
			</Grid>

			<Grid item xs={6}>
			<RadialChart data={(mode === "1") ? audioEmotionRadialData1 : audioEmotionRadialData2} height="275px" title="Audio Emotion" />
			</Grid>

			<Grid item xs={6}>
				<AudioChart mode={mode} audioNames={[1, 2, 3]} height="263px" title={"Audio Data"} />
			</Grid>



			<Grid item xs={12} mt={5} >
				<Typography variant="h1">
					Modality: Text
				</Typography>
			</Grid>

			<Grid item xs={6}>
				<DonutChart data={(mode === "1") ? textEmotionDonutData1 : textEmotionDonutData2} height="300px" title="Text Emotion" />
			</Grid>

			<Grid item xs={6}>
				<Paper
					variant="outlined"
					sx={{
						backgroundColor: colors.greenAccent[800],
						background: `linear-gradient(45deg, ${colors.primary[700]}, ${colors.purplePinkAccent[800]})`,
						p: 2,
						borderRadius: "6px",
						height: "372px"
					}}
					m="20px"
				>
					<Header title="Text Transcript" subtitle="Text transcribed from audio" titleAlign='center' subtitleAlign='center'></Header>
					<Paper variant="outlined" sx={{backgroundColor: colors.blueAccent[900], p: 2, borderRadius: "6px", height: "252px", mt: "20px", overflow: "auto"}} mt="10px" >
						<Typography variant="h5">{(mode === "1" ? textTranscript1 : textTranscript2)}</Typography>
					</Paper>
				</Paper>
			</Grid>
		</Grid>
	)
}


