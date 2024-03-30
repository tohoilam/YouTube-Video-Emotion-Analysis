# """
# package requirements:
# SpeechRecognition
# PyAudio
# """
# import numpy as np
# import speech_recognition as sr
# import io

# def predict(x, model_path):
#     return "testing"

# def audio_speech_to_text(audio):

#     wavIO=io.BytesIO()
#     audio.export(wavIO, format="wav")

#     response = {"success": True,
#                 "error": None,
#                 "results": None}
#     recognizer = sr.Recognizer()
#     audio_file = sr.WavFile(wavIO)
#     with audio_file as source:
#         audio_file = recognizer.record(source) # can specift duration. e.g. r.record(source, duraiton = 5.0)
#         try: 
#             response["results"] = recognizer.recognize_google(audio_data=audio_file)
#         except sr.RequestError:
#             response["success"] = False
#             response["error"] = "API unavailable"
#         except sr.UnknownValueError:
#             response["success"] = False
#             response["error"] = "Unable to recognize speech"
#     # return a dictionary, indicating whether transcription is successful and its results
#     return response

# def evaluateTextInSpeech(audio_path, model_path, audio_happiness, audio_anger, audio_sadness, audio_calmness):
#     result = {"success": True,
#                 "error": None,
#                 "percentage": None,
#                 "text": None}

#     audio_probability = {"happiness": audio_happiness,
#                                "anger": audio_anger,
#                                "sadness": audio_sadness,
#                                "calmness": audio_calmness
#             }
#     response = audio_speech_to_text(audio_path)
#     if response['success'] == False:
#         result['success'] = False
#         result['error'] = f"Failed to convert to text, {response['error']}"
#         return result
#     else:
#         result["text"] = response['results']
#         text_result = predict(result["text"], model_path)[0]
#         text_prbability = {"Happiness": float(text_result[0]),
#                             "Anger": float(text_result[1]),
#                             "Sadness": float(text_result[2]),
#                             "Calmness": float(text_result[3])
#         }
#         result['percentage'] = text_prbability

#     return result
