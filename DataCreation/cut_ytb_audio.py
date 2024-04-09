from pydub import AudioSegment
import os

base_directory = 'video_to_audio'

# List all MP3 files in the base_directory
mp3_files = [file for file in os.listdir(base_directory) if file.endswith('.mp3')]

# Loop over each MP3 file
for mp3_file in mp3_files:
    # Load the MP3 file
    audio = AudioSegment.from_file(os.path.join(base_directory, mp3_file))
    
    # Extract the first 5 minutes (300,000 milliseconds)
    five_minutes_audio = audio[:300000]
    
    # Create a new directory for the segments
    segments_directory = os.path.join(base_directory, mp3_file.replace('.mp3', '_segments'))
    os.makedirs(segments_directory, exist_ok=True)
    
    # Split into 10-second segments (15,000 milliseconds)
    for i in range(0, len(five_minutes_audio), 10000):
        segment = five_minutes_audio[i:i+10000]
        segment_filename = f'segment_{i//10000}.mp3'
        segment_path = os.path.join(segments_directory, segment_filename)
        
        # Save the segment
        segment.export(segment_path, format='mp3')

    print(f'Processed {mp3_file}')






