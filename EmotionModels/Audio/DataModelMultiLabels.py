import os
import numpy as np

from pydub import AudioSegment, effects
import librosa
import IPython.display as ipd
from IPython.display import clear_output
import matplotlib.pyplot as plt
import pytz
import cv2
import random
# import copy

from sklearn.preprocessing import LabelEncoder, OneHotEncoder

import warnings
warnings.filterwarnings('ignore')

tz = pytz.timezone('Asia/Hong_Kong')

class DataModelMultiLabels:
  def __init__(self, labelsToInclude=[], mergeHappinessExcitement=False, splitDuration=8, ignoreDuration=1, transformByStft=False, hop_length=512, win_length=2048, n_mels=128, onehot=False, timeDistributed=False, timeShape=False):
    # Hyperparameter
    self.splitDuration = splitDuration
    self.ignoreDuration = ignoreDuration
    self.dimension = (256, 256)
    self.test_percent = 0.2
    self.test_amount = 1500
    self.validation_percent = 0.2
    self.transformByStft = transformByStft
    self.hop_length = hop_length
    self.win_length = win_length
    self.n_mels = n_mels
    self.onehot = onehot
    self.timeDistributed = timeDistributed
    self.timeShape = timeShape

    if (labelsToInclude == []):
      self.labels_name = ['Anger', 'Disgust', 'Excited', 'Fear', 'Frustration', 'Happiness', 'Neutral', 'Sadness', 'Surprise']
    else:
      self.labels_name = labelsToInclude
    
    self.labels_name.sort()
    
    self.mergeHappinessExcitement = mergeHappinessExcitement
    
    self.data = []
    # self.audio = []
    self.labels = []
    self.sampling_rates = []
    self.test_data = []
    self.test_labels = []
    self.test_sampling_rates = []
    self.x_train = None
    self.y_train = None
    self.sr_train = None
    self.x_test = None
    self.y_test = None
    self.sr_test = None
  
  ###############################
  ### Data Processing Methods ###
  ###############################
  def processData(self):
    if (self.data == [] or self.labels == [] or self.sampling_rates == []):
      print('Please call extractIEMOCAPData() and/or extractEmoDBData() before calling this method!')
    else:
      # Call data split if it is not callen (by data augmentation) before
      if (self.test_data == [] or self.test_labels == [] or self.test_sampling_rates == []):
        self.dataSplit()
      
      # Process Training Data
      self.melProcessing()
      self.labelProcessing()
      
      # Process Testing Data
      self.melProcessing(testing=True)
      self.labelProcessing(testing=True)
      
      # Assign Data
      self.x_train = self.data
      self.y_train = self.labels
      self.sr_train = self.sampling_rates
      self.x_test = self.test_data
      self.y_test = self.test_labels
      self.sr_test = self.test_sampling_rates
    
      print('Data Processing Completed!')
      print('  Data shapes:')
      print(f'    x_train  : {self.x_train.shape}')
      print(f'    y_train  : {self.y_train.shape}')
      print(f'    sr_train : {self.sr_train.shape}')
      print(f'    x_test   : {self.x_test.shape}')
      print(f'    y_test   : {self.y_test.shape}')
      print(f'    sr_test  : {self.sr_test.shape}')
      print('')
  
  def processTestingDataOnly(self):
    if (self.data == [] or self.labels == [] or self.sampling_rates == []):
      print('Please call extractIEMOCAPData() and/or extractEmoDBData() before calling this method!')
    else:
      # Call data split if it is not callen (by data augmentation) before
      if (self.test_data == [] or self.test_labels == [] or self.test_sampling_rates == []):
        self.dataSplit()
      
      # Process Testing Data
      self.melProcessing(testing=True)
      self.labelProcessing(testing=True)
      
      # Assign Data
      self.x_test = self.test_data
      self.y_test = self.test_labels
      self.sr_test = self.test_sampling_rates
    
      print('Data Processing Completed!')
      print('  Data shapes:')
      print(f'    x_test   : {self.x_test.shape}')
      print(f'    y_test   : {self.y_test.shape}')
      print(f'    sr_test  : {self.sr_test.shape}')
      print('')
  
  def extractIEMOCAPData(self):
    print('Loading and Extracting IEMOCAP Data...')
    
    labels_dict = {'neu': 'Neutral',
          'fru': 'Frustration',
          'ang': 'Anger',
          'sad': 'Sadness',
          'hap': 'Happiness',
          'exc': 'Excitement',
          'sur': 'Surprise',
          'dis': 'Disgust',
          'fea': 'Fear'}
    
    data = []
    labels = []
    sampling_rates = []

    count = 0

    # range 1 to 2 means loading Session 1 only
    # If want to load session 2, change to range 2 to 3
    # If want to load all sessions, change to 1 to 6
    for i in list(range(1, 6)):
      data_path = os.path.join(os.getcwd(), 'Data/IEMOCAP/Sentences/Session' + str(i))
      labels_dir = os.path.join(data_path, 'evaluation/')
      session = 'Session' + str(i)

      for dirname, _, filenames in os.walk(data_path):
        folderName = dirname.split("/")[-1]

        if (folderName != "evaluation" and folderName != "categorical"):
          for filename in filenames:

            if (filename == 'desktop.ini' or filename == 'desktop.in.txt' or filename == '.DS_Store' or filename == '.DS'):
              continue

            # Load Label
            recording_name = filename[:filename.rfind('_')]
            label_path = labels_dir + recording_name + '.txt'

            sentence_name = filename.split('.')[0]

            label_onehot = [ 0 for _ in self.labels_name ]
            merged_line = ""

            with open(label_path) as f:
              lineBlock = []
              for line in f.readlines():
                if (line == "\n"):
                  if (sentence_name in lineBlock[0]):
                    for k in range(1, len(lineBlock)):
                      currentLine = lineBlock[k]
                      if (currentLine[0] == "C"):
                        merged_line += currentLine
                    break
                  lineBlock = []

                else:
                  lineBlock.append(line)

              # line = [line.strip() for line in f.readlines() if sentence_name in line]

            for pos, label in enumerate(self.labels_name):
              if (label in merged_line):
                label_onehot[pos] = 1
              
              # Cater for Happiness and Excitement merge
              if (self.mergeHappinessExcitement and label == "Happiness" and "Excited" in currentLine):
                label_onehot[pos] = 1

            # if (len(line) == 0):
            #   continue
            # item = line[0].split('\t')
            # if (len(item) < 3):
            #   continue

            # label_code = line[0].split('\t')[2]
            # if (label_code in labels_dict):
            #   label = labels_dict[label_code]
            # else:
            #   label = 'Other'
            
            # # Merge Labels of Happiness and Excitement if needed
            # if (self.mergeHappinessExcitement):
            #   if (label == "Excitement"):
            #     label = "Happiness"
            
            # # Filter Labels
            # if (label not in self.labels_name):
            #   continue

            # Load Audio and x
            wav_path = os.path.join(dirname, filename)

            # Extract Data
            tempData, tempSamplingRates = self._extractData(wav_path)
            
            data.append(tempData)
            labels.append(label_onehot)
            sampling_rates.append(tempSamplingRates)

            count += 1
            if (count % 100 == 0):
              print(f'    Loaded and Extracted {len(data):5} data', end='\r')
     
    print(f'    Loaded and Extracted {len(data):5} data')
              
    self.data.extend(data)
    self.labels.extend(labels)
    self.sampling_rates.extend(sampling_rates)

    label_count = {'Neutral': 0, 'Frustration': 0, 'Anger': 0, 'Sadness': 0, 'Happiness': 0, 'Excited': 0, 'Surprise': 0, 'Disgust': 0, 'Fear': 0, 'Boredom': 0}
    for label in self.labels:
      for pos, label_item in enumerate(label):
        if (label_item == 1):
          label_count[self.labels_name[pos]] += 1
    
    print('\nData Extration Completed')
    print('    Number of data:', len(self.data))
    print(f"      Neutral     : {label_count['Neutral']}")
    print(f"      Frustration : {label_count['Frustration']}")
    print(f"      Anger       : {label_count['Anger']}")
    print(f"      Sadness     : {label_count['Sadness']}")
    print(f"      Happiness   : {label_count['Happiness']}")
    print(f"      Excited     : {label_count['Excited']}")
    print(f"      Surprise    : {label_count['Surprise']}")
    print(f"      Disgust     : {label_count['Disgust']}")
    print(f"      Fear        : {label_count['Fear']}")
    print(f"      Boredom     : {label_count['Boredom']}")
    print('')
   
  def extractEmoDBData(self):
    print('Loading and Extracting EmoDB Data...')
    
    labels_dict = {'N': 'Neutral',
          'A': 'Frustration',
          'W': 'Anger',
          'T': 'Sadness',
          'F': 'Happiness',
          'E': 'Disgust',
          'L': 'Boredom'}
    
    data = []
    labels = []
    sampling_rates = []
    
    count = 0
    
    data_path = os.path.join(os.getcwd(), 'Data/EmoDB')
    
    for dirname, _, filenames in os.walk(data_path):
      for filename in filenames:
        
        if (filename == 'desktop.ini' or filename == 'desktop.in.txt' or filename == '.DS_Store' or filename == '.DS'):
              continue
        
        # Load Label
        label_code = filename[5]
        label = labels_dict[label_code]
        
        # Filter Labels
        if (label not in self.labels_name):
          continue
        
        # Load Audio and x
        wav_path = os.path.join(dirname, filename)
        
        # Extract Data
        tempData, tempSamplingRates = self._extractData(wav_path)
        
        data.append(tempData)
        labels.append(label)
        sampling_rates.append(tempSamplingRates)

        count += 1
        if (count % 100 == 0):
          print(f'    Loaded and Extracted {len(data):5} data', end='\r')
          
    print(f'    Loaded and Extracted {len(data):5} data')
              
    self.data.extend(data)
    self.labels.extend(labels)
    self.sampling_rates.extend(sampling_rates)

    label_count = {'Neutral': 0, 'Frustration': 0, 'Anger': 0, 'Sadness': 0, 'Happiness': 0, 'Excitement': 0, 'Surprise': 0, 'Disgust': 0, 'Fear': 0, 'Boredom': 0}
    for label in self.labels:
      label_count[label] += 1
    
    print('\nData Extration Completed')
    print('    Number of data:', len(self.data))
    print(f"      Neutral     : {label_count['Neutral']}")
    print(f"      Frustration : {label_count['Frustration']}")
    print(f"      Anger       : {label_count['Anger']}")
    print(f"      Sadness     : {label_count['Sadness']}")
    print(f"      Happiness   : {label_count['Happiness']}")
    print(f"      Excitement  : {label_count['Excitement']}")
    print(f"      Surprise    : {label_count['Surprise']}")
    print(f"      Disgust     : {label_count['Disgust']}")
    print(f"      Fear        : {label_count['Fear']}")
    print(f"      Boredom     : {label_count['Boredom']}")
    print('')
    
  def _extractData(self, wav_path):
    audio = AudioSegment.from_file(wav_path)
    sr = audio.frame_rate

    # Process Audio
    audio = effects.normalize(audio, headroom = 5.0) # TODO: Try other head room
    processed_x = np.array(audio.get_array_of_samples(), dtype = 'float32')
    processed_x, _ = librosa.effects.trim(processed_x, top_db = 30)
    
    ### Noise reduction is SUPER SLOW
    # processed_x = nr.reduce_noise(processed_x, sr=sr)
    
    return processed_x, sr
  
  def dataAugmentation(self, multiply, pitchScaleSemitonesOffset=0.0, timeStretchOffset=0.0, randomGainOffset=0.0, addNoiseMaxFactor=0.0):
    if (multiply < 2):
      raise ValueError("Multiply parameter should be integer bigger than 1")
    
    if (pitchScaleSemitonesOffset == 0 and
        timeStretchOffset == 0 and
        randomGainOffset == 0 and
        addNoiseMaxFactor == 0):
      raise AttributeError("Must have some data augmentation configuration. Please set some optional arguments!")
    
    if (pitchScaleSemitonesOffset < 0):
      raise ValueError("Pitch scale semitones offset should be a positive number or zero. Offset of 0 means no pitch scale.")

    if (timeStretchOffset < 0):
      raise ValueError("Time stretch offset should be a positive number or zero. Offset of 0 means no time stretch.")

    if (timeStretchOffset >= 1):
      raise ValueError("Time stretch offset should be less than 1. Offset of 0 means no time stretch.")
    
    if (randomGainOffset < 0):
      raise ValueError("Random gain offset should be a positive number or zero. Offset of 0 means no random gain.")

    if (randomGainOffset >= 1):
      raise ValueError("Random gain offset should be less than 1. Offset of 0 means no random gain.")
    
    if (addNoiseMaxFactor < 0):
      raise ValueError("Noise factor should be positive number or zero. No noise means a value of 0.")
    
    # Execute Data Split
    self.dataSplit()
    # End Data Split
    
    print('Executing Data Augmentation Process...')
    
    extraAugmentedData = []
    extraAugmentedLabels = []
    extraAugmentedSR = []
    
    random.seed(None)
    
    for loopCount in range(multiply - 1):
      for i, x in enumerate(self.data):
        label = self.labels[i]
        sr = self.sampling_rates[i]
        
        # Pitch Scale (-3 to 3)
        if (pitchScaleSemitonesOffset != 0):
          pitchScaleSemitones = random.uniform(-pitchScaleSemitonesOffset, pitchScaleSemitonesOffset)
          x = self._pitchScale(x, sr, pitchScaleSemitones)

        # Time Stretch (0.8 to 1.2)
        if (timeStretchOffset != 0):
          timeStretchRate = random.uniform(1 - timeStretchOffset, 1 + timeStretchOffset)
          x = self._timeStretch(x, timeStretchRate)
        
        # Random Gain (0.8 to 1.2)
        if (randomGainOffset != 0):
          gainFactor = random.uniform(1 - randomGainOffset, 1 + randomGainOffset)
          x = self._randomGain(x, gainFactor)
        
        # Add Noise (0 to 0.2)
        if (addNoiseMaxFactor != 0):
          addNoiseFactor = random.uniform(0, addNoiseMaxFactor)
          x = self._addNoise(x, addNoiseFactor)
        
        extraAugmentedData.append(x)
        extraAugmentedLabels.append(label)
        extraAugmentedSR.append(sr)
        
        if (i != 0 and (i + 1) % 100 == 0):
          if (loopCount == 0):
            print(f"    Processed {i+1:5} data                                     ", end='\r')
          else:
            print(f"    Processed {i+1:5} data (Increased dataset size by {loopCount + 1:2} times)", end='\r')
    
    print(f"    Processed {len(self.data):5} data (Increased dataset size by {multiply:2} times)")
        
    self.data.extend(extraAugmentedData)
    self.labels.extend(extraAugmentedLabels)
    self.sampling_rates.extend(extraAugmentedSR)
    
    print('Data Augmentation Completed!')
    print('')
          
  def _pitchScale(self, x, sr, num_semitones):
    # Num of Semitones = positive or negative number, don't have to be integer
    # Positive number = scale go up
    # Negative number = scale do down
    # Ex. +1 semitones means go from C to D
    # Ex. -2 semitones means go from E to C
    return librosa.effects.pitch_shift(x, sr, num_semitones)

  def _timeStretch(self, x, stretch_rate):
    return librosa.effects.time_stretch(x, stretch_rate)

  def _randomGain(self, x, gain_factor):
    return x * gain_factor

  def _addNoise(self, x, noise_factor):
    noise = np.random.normal(0, x.std(), x.size) * noise_factor
    return x + noise
    
  def melProcessing(self, testing=False):
    if (not testing):
      print('Split or Add Padding for training data:')
    else:
      print('Split or Add Padding for testing data')
    print(f"    Split Duration  : {self.splitDuration}")
    print(f"    Ignore Duration : {self.ignoreDuration}")
    print('Processing...')
    
    if (not testing):
      thisData = self.data
      thisLabels = self.labels
      thisSR = self.sampling_rates
    else:
      thisData = self.test_data
      thisLabels = self.test_labels
      thisSR = self.test_sampling_rates
    
    ##################################################################
    ################### Splitting and Padding Data ###################
    ##################################################################
    # Split at or add padding to splitDuration (hyperparameter)
    #   if remaining duration is less than 1 sec, remove
    data = []
    labels = []
    sampling_rates = []
    
    for index, processed_x in enumerate(thisData):
      label = thisLabels[index]
      sr = thisSR[index]
      
      # Clear up memory:
      if (not testing):
        self.data = None
        self.labels = None
        self.sampling_rates = None
      else:
        self.test_data = None
        self.test_labels = None
        self.test_sampling_rates = None
      
      duration = len(processed_x) / sr
      size = sr * self.splitDuration

      if (duration < self.splitDuration):
        processed_x = np.pad(processed_x, (0, size - len(processed_x)), 'constant')
        
        data.append(processed_x)
        labels.append(label)
        sampling_rates.append(sr)
      elif (duration > self.splitDuration):

        for j in range(0, len(processed_x), size):
          splitSection = processed_x[j:j+size]

          # Check if it is longer than ignoreDuration
          if (len(splitSection) > self.ignoreDuration * sr):

            # Pad audio that is shorter than splitDuration
            if (len(splitSection) < size):
              padded_x = np.pad(splitSection, (0, size - len(splitSection)), 'constant')
              
              data.append(padded_x)
              labels.append(label)
              sampling_rates.append(sr)
            else:
              data.append(splitSection)
              labels.append(label)
              sampling_rates.append(sr)
      
      if (index != 0 and (index + 1) % 100 == 0):
        print(f'    Processed {len(data):5} data split and padding', end='\r')
    
    if (not testing):
      self.data = data
      self.labels = labels
      self.sampling_rates = sampling_rates
      
      print(f'    Processed {len(self.data):5} data split and padding')
      print('Data Splitting and Padding For Training Completed!')
    else:
      self.test_data = data
      self.test_labels = labels
      self.test_sampling_rates = sampling_rates
      
      print(f'    Processed {len(self.test_data):5} data split and padding')
      print('Data Splitting and Padding For Testing Completed!')
    
    thisData = data
    thisLabels = labels
    thisSR = sampling_rates
    # self.audio = copy.deepcopy(thisData)
      
    print('')
    
    ##################################################################
    ######################## Mel Spectrogram #########################
    ##################################################################
    
    if (not testing):
      print('Processing training data to Mel Spectrogram...')
    else:
      print('Processing testing data to Mel Spectrogram...')
    
    # Convert to Mel-Spectrogram
    x_images = []

    for i, x in enumerate(thisData):
      # Extract Mel-Sectrogram
      if (self.transformByStft == True):
        mel_spec = librosa.feature.melspectrogram(y=x, sr=thisSR[i], hop_length=self.hop_length, win_length=self.win_length, n_mels=self.n_mels)
        # mel_spec = librosa.amplitude_to_db(mel_spec, ref=np.max)
      else:
        mel_spec = librosa.feature.melspectrogram(y=x, sr=thisSR[i])
        # mel_spec = librosa.amplitude_to_db(mel_spec, ref=np.max)

        # Force Resize Mel-Spectrogram using image
        mel_spec = cv2.resize(mel_spec, self.dimension, interpolation=cv2.INTER_CUBIC)
      
      # Free up memory from data
      thisData[i] = None
      
      if (self.timeShape):
        mel_spec = mel_spec.T

      x_images.append(mel_spec)
      
      if (i != 0 and (i + 1) % 100 == 0):
        print(f"    Processed {i+1:5} Mel Spectrogram", end='\r')

    print(f"    Processed {len(x_images):5} Mel Spectrogram")

    x_images = [ x for x in x_images ]
    x_images = np.asarray(x_images)
    if (self.timeDistributed):
      x_images = x_images.reshape(1, x_images.shape[0], x_images.shape[1], x_images.shape[2], 1)
    else:
      x_images = x_images.reshape(x_images.shape[0], x_images.shape[1], x_images.shape[2], 1)
    thisData = x_images
    
    if (not testing):
      self.data = np.asarray(thisData)
      
      print('Mel Spectrogram Processing For Training Completed')
      print('    Shape of training images:', self.data.shape)
    else:
      self.test_data = np.asarray(thisData)
      
      print('Mel Spectrogram Processing For Testing Completed')
      print('    Shape of testing images:', self.test_data.shape)
      
    print('')
  
  def labelProcessing(self, testing=False):
    if (not testing):
      print('Processing training labels...')
      
      # # Label Encoding
      # encoder = LabelEncoder()
      # encoder.fit(self.labels_name)
      # self.labels = encoder.transform(self.labels)
      
      # if (self.onehot):
      #   # One Hot Encoding
      #   encoder = OneHotEncoder()
      #   self.labels = encoder.fit_transform(self.labels.reshape(-1,1)).toarray()
      
      self.labels = [ np.asarray(label) for label in self.labels ]
      self.labels = np.asarray(self.labels)
      self.sampling_rates = np.asarray(self.sampling_rates)
      
      print('Label Processing For Training Completed')
    else:
      print('Processing testing labels...')
      
      # # Label Encoding
      # encoder = LabelEncoder()
      # encoder.fit(self.labels_name)
      # self.test_labels = encoder.transform(self.test_labels)
      
      self.test_labels = [ np.asarray(label) for label in self.test_labels ]
      self.test_labels = np.asarray(self.test_labels)
      self.test_sampling_rates = np.asarray(self.test_sampling_rates)
    
      print('Label Processing For Testing Completed')
    
    
    print('')
 
  def dataSplit(self):
    print('Splitting data...')
    
    # test_amount if percentage of test_amount / self.data is less than test_percent
    if (len(self.data) > self.test_amount * (1/self.test_percent)):
      test_size = self.test_amount
    else:
      test_size = np.floor(len(self.data) * self.test_percent).astype(int)
    training_size = len(self.data) - test_size
    
    zippedData = list(zip(self.data, self.labels, self.sampling_rates))
    
    np.random.seed(0)
    np.random.shuffle(zippedData)
    
    self.data, self.labels, self.sampling_rates = zip(*zippedData)
    del zippedData[:]
    
    self.test_data = list(self.data[training_size:])
    self.test_labels = list(self.labels[training_size:])
    self.test_sampling_rates = list(self.sampling_rates[training_size:])
    self.data = list(self.data[:training_size])
    self.labels = list(self.labels[:training_size])
    self.sampling_rates = list(self.sampling_rates[:training_size])
    
    print('Train Test Split Completed')
    print(f"    Training Size : {len(self.data)}")
    print(f"    Testing Size  : {len(self.test_data)}")
    print('')

  #############################
  ### Visualization Methods ###
  #############################
  def plotAudio(self, x, sr, title):
    plt.figure(figsize=(12,1))
    librosa.display.waveplot(x, sr)
    plt.title(title)

  def playAudio(self, x, sr):
    ipd.display(ipd.Audio(data = x, rate=sr))

  def visualizeMelSpec(self, mel_spectrogram, sr):
    librosa.display.specshow(mel_spectrogram, sr=sr, x_axis='time', y_axis='mel')
    plt.colorbar(format='%+2.0f dB')
  