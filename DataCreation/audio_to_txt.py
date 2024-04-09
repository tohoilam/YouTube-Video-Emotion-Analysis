import os
import speech_recognition as sr
from pydub import AudioSegment

base_directory = 'video_to_audio'

# Initialize the recognizer
recognizer = sr.Recognizer()

# Function to transcribe audio
def transcribe_audio(audio_path):
    with sr.AudioFile(audio_path) as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
        return text
    


# Process each MP3 file
for mp3_filename in os.listdir(base_directory):
    if mp3_filename.endswith('.mp3'):
        mp3_path = os.path.join(base_directory, mp3_filename)
        
        # Load the MP3 file and convert to WAV
        audio = AudioSegment.from_mp3(mp3_path)
        # Extract the first 5 minutes
        audio_segment = audio[:300000]  # 300,000 ms is 5 minutes
        
        # Export the segment as WAV
        wav_path = mp3_path.replace('.mp3', '.wav')
        audio_segment.export(wav_path, format="wav")
        
        # Transcribe the audio to text
        try:
            print(f"Transcribing {mp3_filename}...")
            transcribed_text = transcribe_audio(wav_path)
            
            # Save the transcribed text to a .txt file
            txt_filename = mp3_filename.replace('.mp3', '.txt')
            txt_path = os.path.join(base_directory, txt_filename)
            with open(txt_path, 'w') as txt_file:
                txt_file.write(transcribed_text)
                
            print(f"Transcription saved: {txt_filename}")
            
        except sr.UnknownValueError:
            print("Google Web Speech API could not understand the audio")
        except sr.RequestError as e:
            print(f"Could not request results from Google Web Speech API; {e}")
        
        # Remove the WAV file
        os.remove(wav_path)

