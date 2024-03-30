FROM python:3.8.7
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6 -y
RUN apt-get install fluidsynth -y
RUN apt-get install build-essential libasound2-dev libjack-dev portaudio19-dev -y
RUN python -m spacy download en_core_web_sm
RUN python -m spacy download en_core_web_md
RUN --mount=type=cache,target=/root/.cache/pip \
  pip uninstall -y Werkzeug && \
  pip install Werkzeug==2.3.6
COPY . .

CMD ["python", "app.py"]
