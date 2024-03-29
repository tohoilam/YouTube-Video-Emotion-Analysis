import tkinter as tk
from tkinter import *
from tkinter import filedialog
from transformers import AutoModelForAudioClassification, Wav2Vec2FeatureExtractor
import numpy as np
from pydub import AudioSegment
import pygame

pygame.mixer.init()
model1 = AutoModelForAudioClassification.from_pretrained("ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition")
feature_extractor = Wav2Vec2FeatureExtractor.from_pretrained("facebook/wav2vec2-large-xlsr-53")

def predict_emotion(audio_file=None):
    if not audio_file:
        audio_file = 'anger_grounded.mp3'
    sound = AudioSegment.from_file(audio_file)
    sound = sound.set_frame_rate(16000)
    sound_array = np.array(sound.get_array_of_samples())

    input = feature_extractor(
        raw_speech=sound_array,
        sampling_rate=16000,
        padding=True,
        return_tensors="pt")

    result = model1.forward(input.input_values.float())

    id2label = {
        "0": "angry",
        "1": "calm",
        "2": "disgust",
        "3": "fearful",
        "4": "happy",
        "5": "neutral",
        "6": "sad",
        "7": "surprised"
    }
    interp = dict(zip(id2label.values(), list(round(float(i),4) for i in result[0][0])))
    return interp

# Create the main window
root = tk.Tk()
root.title("Audio Emotion Detection")
root.geometry("400x300")  # Set the window size
root.configure(bg="#f0f0f0")  # Set the window background color

def UploadAction(event=None):
    mp3File = filedialog.askopenfilename(filetypes=[("Audio Files", "*.mp3")])
    
    # Play Music
    def play():
        pygame.mixer.music.load(mp3File)
        pygame.mixer.music.play(loops=0)
    
    play_button = tk.Button(root, text="Play Audio", command=play)
    play_button.pack()


    # Predict Emotion
    prediction = predict_emotion(mp3File)
    
    # Create a label to display the analysis results, using ttk.Label to enhance appearance
    result_text = tk.StringVar()
    result_label = tk.Label(root, textvariable=result_text, justify=tk.LEFT, background="#f0f0f0", font=("Arial", 12))
    result_label.pack(pady=20)

    if prediction:
        # Convert Text
        sorted_emotion_prediction = [(k, v) for k, v in sorted(prediction.items(), key=lambda item: item[1], reverse=True) if v > 0]
        prediction_text = [f'{k:10}: {v}' for k, v in sorted_emotion_prediction]
        text = '\n'.join(prediction_text)
        result_text.set(text)
    else:
        result_text.set("")


# Create a text input box for multi-line text input
button = tk.Button(root, text='Upload Audio File', command=UploadAction)
button.pack(pady=20)

root.mainloop()
