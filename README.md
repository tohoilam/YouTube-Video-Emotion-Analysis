# YouTube Emotion Detection Project

## Overview
This project explores the identification of emotions in YouTube videos to analyze viewer engagement and reaction patterns. It encompasses a comprehensive data science pipeline, including model development across text, audio, and image modalities, data extraction using the YouTube API, and a web application for displaying findings. The aim is to provide content creators with insights into optimizing content for enhanced viewer interaction and emotional engagement.

![Project Poster Less Clear](https://github.com/tohoilam/YouTube-Video-Emotion-Analysis/assets/61353084/af35dec3-dabf-40e3-b9b7-075ad3a8b3d5)

## Motivation
YouTube's vast landscape offers a unique opportunity for emotion detection, providing valuable insights for content creators, including YouTubers, film, and TV producers. By understanding emotional engagement, creators can design content that fosters a stronger connection with viewers, potentially leading to increased retention and engagement.

## Problem Statement
The project addresses three primary research questions:
1. Variation of emotions across different YouTube video genres.
2. Differences in emotion detection between text, audio, and image modalities.
3. Correlations between emotions and content features like views, likes, and comments.

## Data Science Pipeline
The project is divided into two phases:
1. **Development of emotion detection models** for image, audio, and text.
2. **Analysis of the impact of emotion** on YouTube video statistics using the developed models.

![Flow Chart](https://github.com/tohoilam/YouTube-Video-Emotion-Analysis/assets/61353084/5b5b1a19-8c6e-4ab7-9e06-e71e196d9b3e)

### Data Preparation and Processing
Selected YouTube videos across various genres were analyzed using:
- **Image input:** Frame extraction and organization into folders per video.
- **Audio input:** Conversion to mp3 format and segmentation for analysis.
- **Textual input:** Extraction from audio files for emotion detection.

### Models Used
- **Audio:** A CNN-LSTM model for capturing frequency information and time-series dependencies.
- **Image:** A DenseNet-121 model focusing on facial expressions for emotion detection.
- **Text:** A DistilRoBERTa-based model trained on diverse emotional content.

### Data Analysis and Methodology
- Use of YouTube API v3 for extracting video statistics.
- Spark for processing large volumes of comments for sentiment analysis.
- Visualization of correlations between emotions and content features.

## Results and Evaluation
Findings reveal distinct emotion patterns across genres, with audio and visual cues being more effective than text in conveying emotions. The intensity of emotions plays a crucial role in resonating with viewers, highlighting the importance of vocal tone and facial expressions in emotional communication.

## Data Product
A web application facilitates emotion detection across three modalities and visualizes emotion intensity changes over time. Users can input a YouTube URL to obtain detailed emotion analysis results.

![Web App 1](https://github.com/tohoilam/YouTube-Video-Emotion-Analysis/assets/61353084/e45a3bec-31e0-4091-8e8e-ce7f53d08fc7)

![Web App 2](https://github.com/tohoilam/YouTube-Video-Emotion-Analysis/assets/61353084/8f122886-e663-4534-a301-02b1f7926b44)

![Web App 3](https://github.com/tohoilam/YouTube-Video-Emotion-Analysis/assets/61353084/1a0830d5-c9de-4400-b5e3-ef64e5f87124)

## Future Work
Enhancements could include correlating emotional responses with viewership dynamics, provided the YouTube API supports more granular view count data.
