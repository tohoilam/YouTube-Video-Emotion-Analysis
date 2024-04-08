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
          "y": 29.89
        },
        {
          "x": "Fear",
          "y": 27.34
        },
        {
          "x": "Disgust",
          "y": 7.67
        },
        {
          "x": "Sadness",
          "y": 7.44
        },
        {
          "x": "Neutral",
          "y": 1.82
        },
        {
          "x": "Happiness",
          "y": 4.23
        },
        {
          "x": "Surprise",
          "y": 21.61
        },
      ]
    },
    {
      "id": "Image 2",
      "data": [
        {
          "x": "Anger",
          "y": 11.07
        },
        {
          "x": "Fear",
          "y": 19.32
        },
        {
          "x": "Disgust",
          "y": 8.61
        },
        {
          "x": "Sadness",
          "y": 15.37
        },
        {
          "x": "Neutral",
          "y": 13.88
        },
        {
          "x": "Happiness",
          "y": 2.27
        },
        {
          "x": "Surprise",
          "y": 29.48
        },
      ]
    },
    {
      "id": "Image 1",
      "data": [
        {
          "x": "Anger",
          "y": 33.81
        },
        {
          "x": "Fear",
          "y": 16.46
        },
        {
          "x": "Disgust",
          "y": 19.67
        },
        {
          "x": "Sadness",
          "y": 16.38
        },
        {
          "x": "Neutral",
          "y": 9.89
        },
        {
          "x": "Happiness",
          "y": 2.62
        },
        {
          "x": "Surprise",
          "y": 1.17
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
          "y": 9.31
        },
        {
          "x": "Fear",
          "y": 0
        },
        {
          "x": "Disgust",
          "y": 0
        },
        {
          "x": "Sadness",
          "y": 0
        },
        {
          "x": "Neutral",
          "y": 0
        },
        {
          "x": "Happiness",
          "y": 12.41
        },
        {
          "x": "Surprise",
          "y": 78.28
        },
      ]
    },
    {
      "id": "Audio 2",
      "data": [
        {
          "x": "Anger",
          "y": 0.00
        },
        {
          "x": "Fear",
          "y": 17.55
        },
        {
          "x": "Disgust",
          "y": 0.00
        },
        {
          "x": "Sadness",
          "y": 82.34
        },
        {
          "x": "Neutral",
          "y": 0.01
        },
        {
          "x": "Happiness",
          "y": 0.00
        },
        {
          "x": "Surprise",
          "y": 0.00
        },
      ]
    },
    {
      "id": "Audio 1",
      "data": [
        {
          "x": "Anger",
          "y": 0.01
        },
        {
          "x": "Fear",
          "y": 4.60
        },
        {
          "x": "Disgust",
          "y": 0.01
        },
        {
          "x": "Sadness",
          "y": 0.02
        },
        {
          "x": "Neutral",
          "y": 44.42
        },
        {
          "x": "Happiness",
          "y": 50.93
        },
        {
          "x": "Surprise",
          "y": 0.01
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
          "y": 53.26
        },
        {
          "x": "Fear",
          "y": 1.39
        },
        {
          "x": "Disgust",
          "y": 0.01
        },
        {
          "x": "Sadness",
          "y": 0.00
        },
        {
          "x": "Neutral",
          "y": 45.22
        },
        {
          "x": "Happiness",
          "y": 0.00
        },
        {
          "x": "Surprise",
          "y": 0.12
        },
      ]
    },
    {
      "id": "Audio 2",
      "data": [
        {
          "x": "Anger",
          "y": 31.94
        },
        {
          "x": "Fear",
          "y": 2.57
        },
        {
          "x": "Disgust",
          "y": 6.05
        },
        {
          "x": "Sadness",
          "y": 14.25
        },
        {
          "x": "Neutral",
          "y": 42.66
        },
        {
          "x": "Happiness",
          "y": 1.30
        },
        {
          "x": "Surprise",
          "y": 1.23
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
			"value": 10.29,
			"color": colors.emotion['Anger']
		},
		{
			"id": "Fear",
			"label": "Fear",
			"value": 11.37,
			"color": colors.emotion['Fear']
		},
		{
			"id": "Disgust",
			"label": "Disgust",
			"value": 8.61,
			"color": colors.emotion['Disgust']
		},
		{
			"id": "Sadness",
			"label": "Sadness",
			"value": 15.34,
			"color": colors.emotion['Sadness']
		},
		{
			"id": "Neutral",
			"label": "Neutral",
			"value": 29.03,
			"color": colors.emotion['Neutral']
		},
		{
			"id": "Happiness",
			"label": "Happiness",
			"value": 17.14,
			"color": colors.emotion['Happiness']
		},
		{
			"id": "Surprise",
			"label": "Surprise",
			"value": 8.22,
			"color": colors.emotion['Surprise']
		},
	];

	const textEmotionDonutData2 = [
		{
			"id": "Anger",
			"label": "Anger",
			"value": 13.28,
			"color": colors.emotion['Anger']
		},
		{
			"id": "Fear",
			"label": "Fear",
			"value": 4.92,
			"color": colors.emotion['Fear']
		},
		{
			"id": "Disgust",
			"label": "Disgust",
			"value": 1.49,
			"color": colors.emotion['Disgust']
		},
		{
			"id": "Sadness",
			"label": "Sadness",
			"value": 2.70,
			"color": colors.emotion['Sadness']
		},
		{
			"id": "Neutral",
			"label": "Neutral",
			"value": 74.94,
			"color": colors.emotion['Neutral']
		},
		{
			"id": "Happiness",
			"label": "Happiness",
			"value": 1.82,
			"color": colors.emotion['Happiness']
		},
		{
			"id": "Surprise",
			"label": "Surprise",
			"value": 0.85,
			"color": colors.emotion['Surprise']
		},
	];

	const textTranscript1 = "Hello hello my name is Anya and welcome to my calls decisions reactions video so all about me I am 17 years old I'm a senior in high school from Berkeley California which is right outside of San Francisco I applied to 19 schools my safety schools were University of Washington Seattle University of Wisconsin-Madison UC Davis UC Santa Cruz and Drexel my target schools were Oberlin Boston University Miguel and UC San Diego and then my reach schools were Columbia Georgetown UCLA Brown upon Yale Washington and Harvard of those schools I visited Columbia Gorge Town UCLA brown stand for San Diego University of Washington and UC Santa Cruz so I visited the majority of the schools that I applied to but I didn't personally for any of them because it was covid of those schools I interviewed for Georgetown Columbia Yale Harvard University's or any of that in this video but if you would like to see a video with my stats extracurriculars or my essays or like any tips about high school application process let me know in the comments and maybe I'll make one I can promise you this will not be one of those boring videos like I'm an emotional person so I can promise that there will be some interesting reactions and that serves as a warning to my headphone users out there you've been working I hope you enjoy this video I enjoyed filming it and making it ready clothing";
	const textTranscript2 = "Three deposits tonight. And he did like he was told, buffed those shoes to a high mirror shine. The guard simply didn't notice, neither did I. I mean, seriously, how often do you really look at a man's shoes? Thank you. I don't know what to do with this. I don't know what to do with this. And he crawled to freedom through 500 yards of shit -smelling foulness I can't even imagine. Or maybe I just don't want to. 500 yards. That's the length of 500 yards. football fields, just shy of half a mile. The next morning, right about the time Raquel was spilling her little secret, a man nobody ever laid eyes on before strolled into the Maine National Bank. Until that moment, he didn't exist, except on paper. May I help you? He had all the proper ID, driver's license, birth certificate, social security card, and the signature was a spot -on match. I must say, I'm sorry to be losing your business. I hope you'll enjoy living abroad. Thank you. I'm sure I will. ";

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


