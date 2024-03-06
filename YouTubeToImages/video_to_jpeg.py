import os
import subprocess


def download_video(youtube_url, output_path="demo_1.mp4", start_time=None, duration=None):
    format_code = '22'
    postprocessor_args = []
    
    if start_time is not None and duration is not None:
        postprocessor_args = [f"--postprocessor-args",
                              f"-ss {start_time} -t {duration}"]
        
    cmd = ['yt-dlp', '-f', format_code, '-o', output_path, youtube_url] + postprocessor_args
    
    # Use the list form of the command to avoid shell=True for better security
    subprocess.run(cmd, check=True)
    return output_path


def extract_frames(video_path, frame_numbers, output_folder="frames"):
    """Extract specific frames from the video."""
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for frame_number in frame_numbers:
        output_path = os.path.join(output_folder, f"1_frame_{frame_number}.jpg")
        # ffmpeg command to extract a specific frame
        cmd = f"ffmpeg -i {video_path} -vf \"select='eq(n,{frame_number})'\" -vframes 1 {output_path}"
        subprocess.run(cmd, shell=True, check=True)

if __name__ == "__main__":
    # Example YouTube video URL
    youtube_url = "https://www.youtube.com/watch?v=tH4I1fnYq8U"
    frame_numbers = [200, 300, 400, 500, 800, 1100, 1500, 2000, 2500, 4000]  # Example frame numbers to extract

    # Step 1: Download the YouTube video
    downloaded_video_path = download_video(youtube_url,start_time="0",duration="300")

    # Step 2: Extract frames from the downloaded video
    extract_frames(downloaded_video_path, frame_numbers)
