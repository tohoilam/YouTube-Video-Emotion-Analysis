import io
import os
import copy
import json
from flask import Flask, request
from flask import Blueprint
from flask_cors import cross_origin



speech_emotion_recognition_blueprint = Blueprint('speech_emotion_recognition', __name__)

PATH_DIR_NAME = '/speech-emotion-recognition'

# MODEL_PATH = os.path.join('components', 'speech_emotion_recognition')
# MODEL_CONFIG_PATH = os.path.abspath(os.path.join('components', 'speech_emotion_recognition', 'models.json'))
# DATA_PATH = os.path.abspath(os.path.join('components', 'speech_emotion_recognition', 'audio_data'))

@speech_emotion_recognition_blueprint.errorhandler(413)
def too_large(e):
    return "File is too large", 413


@speech_emotion_recognition_blueprint.route(PATH_DIR_NAME + '/models')
@cross_origin()
def models():
  return {'data': 'ok', 'status': 'ok', 'errMsg': ''}
