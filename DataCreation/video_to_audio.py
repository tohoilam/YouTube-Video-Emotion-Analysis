import subprocess

def download_video(youtube_url, output_path):
    format_code = '22'
    postprocessor_args = []
    cmd = ['yt-dlp', '-f', format_code, '-o', output_path, youtube_url] + postprocessor_args
    # Use the list form of the command to avoid shell=True for better security
    subprocess.run(cmd, check=True)
    return output_path


def extract_audio(video_path, output_audio_path):
    cmd = f"ffmpeg -i {video_path} -vn -acodec libmp3lame -q:a 2 {output_audio_path}"
    subprocess.run(cmd, shell=True, check=True)


if __name__ == "__main__":
    video_idx = 1
    with open('video_urls.txt', 'r') as file:
        for line in file:
            youtube_url = line.strip()
            #process_video(youtube_url)
            output_prefix = "youtube" + str(video_idx)
            print("--------------Processing video: " + str(video_idx) + " ------------------------")
        
            # Step 1: Download the YouTube video
            video_name = output_prefix + ".mp4"
            downloaded_video_path = download_video(youtube_url,video_name)

            # Step 2: Extract audio from the downloaded video
            audio_name = output_prefix + ".mp3"
            extract_audio(downloaded_video_path, output_audio_path=audio_name)

            video_idx += 1