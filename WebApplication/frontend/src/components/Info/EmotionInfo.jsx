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

	const imageEmotionRadialData1 = [
    {
      "id": "Image 3",
      "data": [
        {
          "x": "Anger",
          "y": 2.33
        },
        {
          "x": "Fear",
          "y": 9.34
        },
        {
          "x": "Disgust",
          "y": 5.67
        },
        {
          "x": "Sadness",
          "y": 13.37
        },
        {
          "x": "Neutral",
          "y": 9.78
        },
        {
          "x": "Happiness",
          "y": 20.63
        },
        {
          "x": "Surprise",
          "y": 39.22
        },
      ]
    },
    {
      "id": "Image 2",
      "data": [
        {
          "x": "Anger",
          "y": 4.09
        },
        {
          "x": "Fear",
          "y": 3.32
        },
        {
          "x": "Disgust",
          "y": 40.87
        },
        {
          "x": "Sadness",
          "y": 14.37
        },
        {
          "x": "Neutral",
          "y": 29.86
        },
        {
          "x": "Happiness",
          "y": 4.27
        },
        {
          "x": "Surprise",
          "y": 3.22
        },
      ]
    },
    {
      "id": "Image 1",
      "data": [
        {
          "x": "Anger",
          "y": 1.07
        },
        {
          "x": "Fear",
          "y": 0.36
        },
        {
          "x": "Disgust",
          "y": 0.89
        },
        {
          "x": "Sadness",
          "y": 0.34
        },
        {
          "x": "Neutral",
          "y": 2.39
        },
        {
          "x": "Happiness",
          "y": 46.62
        },
        {
          "x": "Surprise",
          "y": 48.33
        },
      ]
    }
  ]

	const imageEmotionRadialData2 = [
    {
      "id": "Image 3",
      "data": [
        {
          "x": "Anger",
          "y": 5
        },
        {
          "x": "Fear",
          "y": 5
        },
        {
          "x": "Disgust",
          "y": 5
        },
        {
          "x": "Sadness",
          "y": 5
        },
        {
          "x": "Neutral",
          "y": 5
        },
        {
          "x": "Happiness",
          "y": 5
        },
        {
          "x": "Surprise",
          "y": 70
        },
      ]
    },
    {
      "id": "Image 2",
      "data": [
        {
          "x": "Anger",
          "y": 5
        },
        {
          "x": "Fear",
          "y": 5
        },
        {
          "x": "Disgust",
          "y": 5
        },
        {
          "x": "Sadness",
          "y": 5
        },
        {
          "x": "Neutral",
          "y": 5
        },
        {
          "x": "Happiness",
          "y": 5
        },
        {
          "x": "Surprise",
          "y": 70
        },
      ]
    },
    {
      "id": "Image 1",
      "data": [
        {
          "x": "Anger",
          "y": 5
        },
        {
          "x": "Fear",
          "y": 5
        },
        {
          "x": "Disgust",
          "y": 5
        },
        {
          "x": "Sadness",
          "y": 5
        },
        {
          "x": "Neutral",
          "y": 5
        },
        {
          "x": "Happiness",
          "y": 5
        },
        {
          "x": "Surprise",
          "y": 70
        },
      ]
    }
  ]

	const audioEmotionRadialData1 = [
    {
      "id": "Audio 3",
      "data": [
        {
          "x": "Anger",
          "y": 10
        },
        {
          "x": "Fear",
          "y": 10
        },
        {
          "x": "Disgust",
          "y": 10
        },
        {
          "x": "Sadness",
          "y": 10
        },
        {
          "x": "Neutral",
          "y": 20
        },
        {
          "x": "Happiness",
          "y": 20
        },
        {
          "x": "Surprise",
          "y": 20
        },
      ]
    },
    {
      "id": "Audio 2",
      "data": [
        {
          "x": "Anger",
          "y": 10
        },
        {
          "x": "Fear",
          "y": 10
        },
        {
          "x": "Disgust",
          "y": 10
        },
        {
          "x": "Sadness",
          "y": 10
        },
        {
          "x": "Neutral",
          "y": 20
        },
        {
          "x": "Happiness",
          "y": 20
        },
        {
          "x": "Surprise",
          "y": 20
        },
      ]
    },
    {
      "id": "Audio 1",
      "data": [
        {
          "x": "Anger",
          "y": 10
        },
        {
          "x": "Fear",
          "y": 10
        },
        {
          "x": "Disgust",
          "y": 10
        },
        {
          "x": "Sadness",
          "y": 10
        },
        {
          "x": "Neutral",
          "y": 20
        },
        {
          "x": "Happiness",
          "y": 20
        },
        {
          "x": "Surprise",
          "y": 20
        },
      ]
    }
  ]

	const audioEmotionRadialData2 = [
    {
      "id": "Audio 3",
      "data": [
        {
          "x": "Anger",
          "y": 5
        },
        {
          "x": "Fear",
          "y": 5
        },
        {
          "x": "Disgust",
          "y": 5
        },
        {
          "x": "Sadness",
          "y": 5
        },
        {
          "x": "Neutral",
          "y": 5
        },
        {
          "x": "Happiness",
          "y": 5
        },
        {
          "x": "Surprise",
          "y": 70
        },
      ]
    },
    {
      "id": "Audio 2",
      "data": [
        {
          "x": "Anger",
          "y": 5
        },
        {
          "x": "Fear",
          "y": 5
        },
        {
          "x": "Disgust",
          "y": 5
        },
        {
          "x": "Sadness",
          "y": 5
        },
        {
          "x": "Neutral",
          "y": 5
        },
        {
          "x": "Happiness",
          "y": 5
        },
        {
          "x": "Surprise",
          "y": 70
        },
      ]
    },
    {
      "id": "Audio 1",
      "data": [
        {
          "x": "Anger",
          "y": 5
        },
        {
          "x": "Fear",
          "y": 5
        },
        {
          "x": "Disgust",
          "y": 5
        },
        {
          "x": "Sadness",
          "y": 5
        },
        {
          "x": "Neutral",
          "y": 5
        },
        {
          "x": "Happiness",
          "y": 5
        },
        {
          "x": "Surprise",
          "y": 70
        },
      ]
    }
  ]

	const textEmotionDonutData1 = [
		{
			"id": "Anger",
			"label": "Anger",
			"value": 0.2,
			"color": colors.emotion['Anger']
		},
		{
			"id": "Fear",
			"label": "Fear",
			"value": 0.2,
			"color": colors.emotion['Fear']
		},
		{
			"id": "Disgust",
			"label": "Disgust",
			"value": 0.2,
			"color": colors.emotion['Disgust']
		},
		{
			"id": "Sadness",
			"label": "Sadness",
			"value": 0.1,
			"color": colors.emotion['Sadness']
		},
		{
			"id": "Neutral",
			"label": "Neutral",
			"value": 0.1,
			"color": colors.emotion['Neutral']
		},
		{
			"id": "Happiness",
			"label": "Happiness",
			"value": 0.1,
			"color": colors.emotion['Happiness']
		},
		{
			"id": "Surprise",
			"label": "Surprise",
			"value": 0.1,
			"color": colors.emotion['Surprise']
		},
	];

	const textEmotionDonutData2 = [
		{
			"id": "Anger",
			"label": "Anger",
			"value": 0.05,
			"color": colors.emotion['Anger']
		},
		{
			"id": "Fear",
			"label": "Fear",
			"value": 0.05,
			"color": colors.emotion['Fear']
		},
		{
			"id": "Disgust",
			"label": "Disgust",
			"value": 0.05,
			"color": colors.emotion['Disgust']
		},
		{
			"id": "Sadness",
			"label": "Sadness",
			"value": 0.05,
			"color": colors.emotion['Sadness']
		},
		{
			"id": "Neutral",
			"label": "Neutral",
			"value": 0.05,
			"color": colors.emotion['Neutral']
		},
		{
			"id": "Happiness",
			"label": "Happiness",
			"value": 0.05,
			"color": colors.emotion['Happiness']
		},
		{
			"id": "Surprise",
			"label": "Surprise",
			"value": 0.7,
			"color": colors.emotion['Surprise']
		},
	];

	const textTranscript1 = "text transcript 1 fdshjfisdhfjosdhfjsdfnjknsdfjknsdjfnjksdnfjksdnjknsdjkfnsjkfndsjnfjkndsjfkndjnfjksndjfnsdkf dsnf jnsdjkfnsdjkf njksdnfjksd ";
	const textTranscript2 = "text transcript 2 fdshjfisdhfjosdhfjsdfnjknsdfjknsdjfnjksdnfjksdnjknsdjkfnsjkfndsjnfjkndsjfkndjnfjksndjfnsdkf dsnf jnsdjkfnsdjkf njksdnfjksd ";

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


