import os
import subprocess
import json

def download_video(youtube_url, output_path):
    format_code = '22'
    postprocessor_args = []
    cmd = ['yt-dlp', '-f', format_code, '-o', output_path, youtube_url] + postprocessor_args
    # Use the list form of the command to avoid shell=True for better security
    subprocess.run(cmd, check=True)
    return output_path

def get_video_info(video_path):
    """Get video information using ffprobe."""
    cmd = f"ffprobe -v quiet -print_format json -show_streams {video_path}"
    result = subprocess.run(cmd, shell=True, check=True, text=True, capture_output=True)
    return json.loads(result.stdout)

def extract_frames(video_path, output_folder):
    """Extract specific frames from the video."""
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    video_info = get_video_info(downloaded_video_path)
    total_frames = int(video_info['streams'][0]['nb_frames'])
    frame_numbers = range(200, total_frames, 300)

    for frame_number in frame_numbers:
        output_path = os.path.join(output_folder, f"frame_{frame_number}.jpg")
        # ffmpeg command to extract a specific frame
        cmd = f"ffmpeg -i {video_path} -vf \"select='eq(n,{frame_number})'\" -vframes 1 {output_path}"
        subprocess.run(cmd, shell=True, check=True)


if __name__ == "__main__":

    # YouTube video URL
    youtube_url = "https://www.youtube.com/watch?v=zuG4A3_AmK0"
    video_idx = 1
    output_folder_name = "youtube" + str(video_idx)
    video_idx += 1

    #Step 1: Download the YouTube video
    video_name = output_folder_name + ".mp4"
    downloaded_video_path = download_video(youtube_url,video_name)

    # Step 2: Extract frames from the downloaded video
    extract_frames(downloaded_video_path, output_folder=output_folder_name)

    