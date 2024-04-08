import os
import pytz
import tensorflow as tf
import tensorboard
from tensorflow.keras.layers import TimeDistributed, Bidirectional
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

tz = pytz.timezone('Asia/Hong_Kong')

# ( (D + 2 * padding - K) / stride ) + 1

class SERModel:
  def __init__(self, modelName, experimentName, ySize=9, optimizerChoice='adam', learning_rate=0.0001, decay=0.001, lossChoice='scce', input_shape=None, activation='relu', firstLayer=11, firstStride=4):
    self.experimentName = datetime.now(tz=tz).strftime("%m-%d %Hh%Mm%Ss ") + experimentName

    self.logDir = os.path.join(os.getcwd(), "IEMOCAP_ModelLog", self.experimentName)
    self.resultDir = os.path.join(os.getcwd(), "IEMOCAP_TrainedModel", self.experimentName)
    
    self.ySize = ySize
    
    self.firstLayer = firstLayer
    self.firstStride = firstStride
    
    if (modelName.upper() == "cnnModelA".upper()):
      model = self.cnnModelA()
    elif (modelName.upper() == "cnnModelB".upper()):
      model = self.cnnModelB()
    elif (modelName.upper() == "cnnModelBstft".upper()):
      model = self.cnnModelBstft(input_shape)
    elif (modelName.upper() == "cnnModelBstftRegL1".upper()):
      model = self.cnnModelBstftRegL1(input_shape)
    elif (modelName.upper() == "cnnModelBstftRegL2".upper()):
      model = self.cnnModelBstftRegL2(input_shape, activation=activation)
    elif (modelName.upper() == "bestCNNModel".upper()):
      model = self.bestCNNModel(input_shape, activation=activation)
    elif (modelName.upper() == "bestCNNModelLstm".upper()):
      model = self.bestCNNModelLstm(input_shape, activation=activation)
    elif (modelName.upper() == "bestCNNModelLstmB".upper()):
      model = self.bestCNNModelLstmB(input_shape, activation=activation)
    elif (modelName.upper() == "bestCNNModelLstmC".upper()):
      model = self.bestCNNModelLstmC(input_shape, activation=activation)
    elif (modelName.upper() == "bestCNNModelWideLstmC".upper()):
      model = self.bestCNNModelWideLstmC(input_shape, activation=activation)
    elif (modelName.upper() == "cnnModelC".upper()):
      model = self.cnnModelC()
    elif (modelName.upper() == "cnnModelD".upper()):
      model = self.cnnModelD()
    elif (modelName.upper() == "cnnModelE".upper()):
      model = self.cnnModelE()
    elif (modelName.upper() == "cnnLstmModelA".upper()):
      model = self.cnnLstmModelA()
    elif (modelName.upper() == "cnnLstmModelB".upper()):
      model = self.cnnLstmModelB()
    elif (modelName.upper() == "cnnLstmModelC".upper()):
      model = self.cnnLstmModelC()
    elif (modelName.upper() == "cnnLstmModelD".upper()):
      model = self.cnnLstmModelD()
    elif (modelName.upper() == "optimal".upper()):
      model = self.optimal()
    elif (modelName.upper() == "cnnLstmModelBstftRegL2".upper()):
      model = self.cnnLstmModelBstftRegL2(input_shape, activation=activation)
    elif (modelName.upper() == "cnnLstmModelBstftRegL2Repeat".upper()):
      model = self.cnnLstmModelBstftRegL2Repeat(input_shape, activation=activation)
    else:
      model = None
      raise NameError("modelName does not exist. Should be cnnModel{A-E} or cnnLstmModel{A-D}")
    
    self.tensorboard_callback = tf.keras.callbacks.TensorBoard(log_dir=self.logDir)
    
    if (optimizerChoice == 'adam'):
      optimizer= tf.keras.optimizers.Adam(learning_rate=learning_rate, decay=decay)
    elif (optimizerChoice == 'rmsprop'):
      optimizer = tf.keras.optimizers.RMSprop(learning_rate=learning_rate, decay=decay)
    elif (optimizerChoice == 'adagrad'):
      optimizer = tf.keras.optimizers.Adagrad(learning_rate=learning_rate, decay=decay)
    else:
      optimizer = None
      raise NameError("optimizerChoice does not exist.")
    
    if (lossChoice == 'scce'):
      loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
    elif (lossChoice == 'cce'):
      loss = tf.keras.losses.CategoricalCrossentropy(from_logits=True)
    else:
      loss = None
      raise NameError("lossChoice does not exist.")

    model.compile(optimizer=optimizer,
                  loss=loss,
                  metrics=['accuracy'])
    
    self.model = model
    
    # Information Log
    print('')
    print("########################################################")
    print("################### Training Section ###################")
    print("########################################################")
    print('')
    print("Model Information:")
    print(f"    Model Choice     : {modelName}")
    print(f"    Experiment Name  : {self.experimentName}")
    print(f"    Log Directory    : {self.logDir}")
    print(f"    Result Directory : {self.resultDir}")
    print(f"    Optimizer        : {optimizerChoice}")
    print(f"      Learning Rate  : {learning_rate}")
    print(f"      Decay          : {decay}")
    print(f"    Loss             : Sparse Categorical Crossentropy")
    print(f"    Metrics          : Accuracy")
    print('')
    
  
  def fit(self, x_train, y_train, epochs, validation_percent, batch_size=128, shuffle=True, early_stopping_patience=0, k_fold=0):
    print("Model Information:")
    print(f"    Epochs        : {epochs}")
    print(f"    x_train shape : {x_train.shape}")
    print(f"    y_train shape : {y_train.shape}")
    print(f"    Validation %  : {validation_percent}")
    print(f"    Batch size    : {batch_size}")
    print(f"    Shuffle       : {shuffle}")

    print('')
    print('Start training...')
    if (early_stopping_patience == 0):
      history = self.model.fit(x_train, y_train, batch_size=batch_size, epochs=epochs, validation_split=validation_percent, callbacks=[self.tensorboard_callback], shuffle=shuffle)
    else:
      callback = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=early_stopping_patience)
      history = self.model.fit(x_train, y_train, batch_size=batch_size, epochs=epochs, validation_split=validation_percent, callbacks=[self.tensorboard_callback, callback], shuffle=shuffle)
    self.model.save(self.resultDir)
    
    print('')
    print('Training Completed')
    print(f'    Result Model saved in : {self.resultDir}')
    print(f'    Model Log saved in    : {self.logDir}')
    
    return history
  
  ###################################################################################################################
  #################################################### CNN Model ####################################################
  ###################################################################################################################
  
  # Baseline Model
  def cnnModelA(self):
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation='relu', input_shape=(256, 256, 1)),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation='relu'),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(384, (3, 3), strides=(1, 1), activation='relu'),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Flatten(),
      tf.keras.layers.Dense(2048, activation='relu'),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(2048, activation='relu'),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model
  
  # Removed last layer of Conv2D and MaxPooling2D
  def cnnModelB(self):
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation='relu', input_shape=(256, 256, 1)),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation='relu'),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Flatten(),
      tf.keras.layers.Dense(2048, activation='relu'),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(2048, activation='relu'),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model
  
  # Use L1 Regularization
  def cnnModelBstftRegL1(self, input_shape):
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation='relu', input_shape=input_shape),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation='relu', kernel_regularizer=tf.keras.regularizers.l1(l=0.01)),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Flatten(),
      tf.keras.layers.Dense(2048, activation='relu', kernel_regularizer=tf.keras.regularizers.l1(l=0.01)),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(2048, activation='relu'),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model
  
  # Use L2 Regularization
  def cnnModelBstftRegL2(self, input_shape, activation='relu'):
    if (activation == 'leakyrelu'):
      activation = tf.keras.layers.LeakyReLU(alpha=0.01)
    
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation=activation, input_shape=input_shape),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Flatten(),
      tf.keras.layers.Dense(2048, activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(2048, activation=activation),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model
  
    # Use L2 Regularization
  def cnnModelBstftRegL2LayerExperiment(self, input_shape, activation='relu'):
    if (activation == 'leakyrelu'):
      activation = tf.keras.layers.LeakyReLU(alpha=0.01)
    
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (self.firstLayer, self.firstLayer), strides=(self.firstStride, self.firstStride), activation=activation, input_shape=input_shape),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Flatten(),
      tf.keras.layers.Dense(2048, activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(2048, activation=activation),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model

    # Use L2 Regularization
  def cnnModelBstftRegL2LayerExperiment(self, input_shape, activation='relu'):
    if (activation == 'leakyrelu'):
      activation = tf.keras.layers.LeakyReLU(alpha=0.01)
    
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (self.firstLayer, self.firstLayer), strides=(self.firstStride, self.firstStride), activation=activation, input_shape=input_shape),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(512, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(1024, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Flatten(),
      tf.keras.layers.Dense(2048, activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(2048, activation=activation),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model

  # Best CNN Model
  def bestCNNModel(self, input_shape, activation='relu'):
    if (activation == 'leakyrelu'):
      activation = tf.keras.layers.LeakyReLU(alpha=0.01)
    
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (3, 3), strides=(2, 2), activation=activation, input_shape=input_shape),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(512, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(1024, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Flatten(),
      tf.keras.layers.Dense(2048, activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(2048, activation=activation),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model
  
    # Best CNN Model
  def bestCNNModelLstm(self, input_shape, activation='relu'):
    if (activation == 'leakyrelu'):
      activation = tf.keras.layers.LeakyReLU(alpha=0.01)
    
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (3, 3), strides=(2, 2), activation=activation, input_shape=input_shape),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(512, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(1024, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Reshape((6, 2048)),
      tf.keras.layers.LSTM(1024, activation="tanh", return_sequences=False),
      tf.keras.layers.Dense(512, activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(128, activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model

    # Best CNN Model
  def bestCNNModelLstmB(self, input_shape, activation='relu'):
    if (activation == 'leakyrelu'):
      activation = tf.keras.layers.LeakyReLU(alpha=0.01)
    
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (3, 3), strides=(2, 2), activation=activation, input_shape=input_shape),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(512, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(1024, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Reshape((6, 2048)),
      Bidirectional(tf.keras.layers.LSTM(512, activation="tanh", return_sequences=False)),
      tf.keras.layers.Dense(256, activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(128, activation=activation),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model
  
  # Best CNN Model LSTM C
  def bestCNNModelLstmC(self, input_shape, activation='relu'):
    if (activation == 'leakyrelu'):
      activation = tf.keras.layers.LeakyReLU(alpha=0.01)
    
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (3, 3), strides=(2, 2), activation=activation, input_shape=input_shape),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(512, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(1024, (3, 3), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Reshape((6, 2048)),
      Bidirectional(tf.keras.layers.LSTM(256, activation="tanh", return_sequences=False)),
      tf.keras.layers.Dense(256, activation='relu'),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model

  # Best CNN Wide Model Lstm C
  def bestCNNModelWideLstmC(self, input_shape, activation='relu'):
    if (activation == 'leakyrelu'):
      activation = tf.keras.layers.LeakyReLU(alpha=0.01)
    
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation=activation, input_shape=input_shape),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Reshape((12, 1024)),
      Bidirectional(tf.keras.layers.LSTM(256, activation="tanh", return_sequences=False)),
      tf.keras.layers.Dense(256, activation=activation),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model
  
  # More Dropout
  def cnnModelC(self):
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation='relu', input_shape=(256, 256, 1)),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation='relu'),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(384, (3, 3), strides=(1, 1), activation='relu'),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Flatten(),
      tf.keras.layers.Dense(2048, activation='relu'),
      tf.keras.layers.Dropout(0.35),
      tf.keras.layers.Dense(2048, activation='relu'),
      tf.keras.layers.Dropout(0.35),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model
  
  # L1 Regularization
  def cnnModelD(self):
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation='relu', input_shape=(256, 256, 1)),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation='relu'),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(384, (3, 3), strides=(1, 1), activation='relu'),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Flatten(),
      tf.keras.layers.Dense(2048, activation='relu', kernel_regularizer='l1'),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(2048, activation='relu', kernel_regularizer='l1'),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model
  
  # Add 1 Dense and Dropout each
  def cnnModelE(self):
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation='relu', input_shape=(256, 256, 1)),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation='relu'),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(384, (3, 3), strides=(1, 1), activation='relu'),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Flatten(),
      tf.keras.layers.Dense(2048, activation='relu'),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(2048, activation='relu'),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(1024, activation='relu'),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model
  

  ####################################################################################################################
  ################################################## CNN LSTM Model ##################################################
  ####################################################################################################################
  
#   CNN LSTM Baseline from Article
#   def modelF(self):
#     model = tf.keras.Sequential([
#       tf.keras.layers.Conv2D(64, (3, 3), strides=(1, 1), activation='relu', input_shape=(256, 256, 1)), # 254, 254, 64
#       tf.keras.layers.BatchNormalization(axis=-1),
#       tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),                                             # 127, 127, 64
#       tf.keras.layers.Conv2D(64, (3, 3), strides=(1, 1), activation='relu'),                            # 125, 125, 64
#       tf.keras.layers.BatchNormalization(axis=-1),
#       tf.keras.layers.MaxPooling2D((4, 4), strides=(4, 4)),                                             # 31, 31, 64
#       tf.keras.layers.Conv2D(128, (3, 3), strides=(1, 1), activation='relu'),                           # 29, 29, 128
#       tf.keras.layers.BatchNormalization(axis=-1),
#       tf.keras.layers.MaxPooling2D((4, 4), strides=(4, 4)),                                             # 7, 7, 128
#       tf.keras.layers.Conv2D(128, (3, 3), strides=(1, 1), activation='relu'),                           # 5, 5, 128
#       tf.keras.layers.BatchNormalization(axis=-1),
#       tf.keras.layers.MaxPooling2D((4, 4), strides=(4, 4)),                                             # 1, 1, 128
#       tf.keras.layers.Reshape((1, 128)),
#       tf.keras.layers.LSTM(256, activation="tanh", return_sequences=True),
#       tf.keras.layers.Dense(self.ySize, activation='softmax')
#     ])
    
#     return model

  # CNN LSTM Baseline (From CNN Model A with BN in middle and Extra Conv2D at the end to reduce it to size of (1x1))
  def cnnLstmModelA(self):
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation='relu', input_shape=(256, 256, 1)), # 62, 62, 120
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),                                                # 30, 30, 120
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation='relu'),                              # 26, 26, 256
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),                                                # 12, 12, 256
      tf.keras.layers.Conv2D(384, (3, 3), strides=(1, 1), activation='relu'),                              # 10, 10, 384
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),                                                #  4,  4, 384
      tf.keras.layers.Conv2D(512, (4, 4), strides=(1, 1), activation='relu'),                              #  1,  1, 512
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.Reshape((1, 512)),                                                                   #      1, 512
      tf.keras.layers.LSTM(256, activation="tanh", return_sequences=True),                                 #      1, 256
      tf.keras.layers.Dense(self.ySize, activation='softmax')                                              #      1, ySize
    ])
    
    return model

  # CNN LSTM Baseline 2 (From CNN Model A with BN in middle and extra LSTM)
  def cnnLstmModelB(self):
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation='relu', input_shape=(256, 256, 1)), # 62, 62, 120
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),                                                # 30, 30, 120
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation='relu'),                              # 26, 26, 256
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),                                                # 12, 12, 256
      tf.keras.layers.Conv2D(384, (3, 3), strides=(1, 1), activation='relu'),                              # 10, 10, 384
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),                                                #  4,  4, 384
      tf.keras.layers.Reshape((1, 6144)),                                                                  #      1, 6144
      tf.keras.layers.LSTM(1024, activation="tanh", return_sequences=True),                                #      1, 1024
      tf.keras.layers.LSTM(256),                                                                           #      1, 256
      tf.keras.layers.Dense(self.ySize, activation='softmax')                                              #      1, ySize
    ])
    
    return model

  # CNN LSTM Baseline 3 (From CNN Model A with BN in middle and extra LSTM and Dense)
  def cnnLstmModelC(self):
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation='relu', input_shape=(256, 256, 1)), # 62, 62, 120
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),                                                # 30, 30, 120
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation='relu'),                              # 26, 26, 256
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),                                                # 12, 12, 256
      tf.keras.layers.Conv2D(384, (3, 3), strides=(1, 1), activation='relu'),                              # 10, 10, 384
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),                                                #  4,  4, 384
      tf.keras.layers.Reshape((1, 6144)),                                                                  #      1, 6144
      tf.keras.layers.LSTM(2048, activation="tanh", return_sequences=True),                                #      1, 2048
      tf.keras.layers.LSTM(1024),                                                                          #      1, 1024
      tf.keras.layers.Dense(512, activation='relu'),                                                       #      1, 512
      tf.keras.layers.Dense(256, activation='relu'),                                                       #      1, 256
      tf.keras.layers.Dense(self.ySize, activation='softmax')                                              #      1, ySize
    ])
    
    return model

  #  Add Time Distributed
  def cnnLstmModelD(self):
    model = tf.keras.Sequential([
      TimeDistributed(tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation='relu'), input_shape=(1, 256, 256, 1)), # 62, 62, 120
      TimeDistributed(tf.keras.layers.BatchNormalization(axis=-1)),
      TimeDistributed(tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2))),                        # 30, 30, 120
      TimeDistributed(tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation='relu')),      # 26, 26, 256
      TimeDistributed(tf.keras.layers.BatchNormalization(axis=-1)),
      TimeDistributed(tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2))),                        # 12, 12, 256
      TimeDistributed(tf.keras.layers.Conv2D(384, (3, 3), strides=(1, 1), activation='relu')),      # 10, 10, 384
      TimeDistributed(tf.keras.layers.BatchNormalization(axis=-1)),
      TimeDistributed(tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2))),                        #  4,  4, 384
      TimeDistributed(tf.keras.layers.Flatten()),                                                   #      1, 6144
      # tf.keras.layers.Reshape((6144, 1)),                                          #      1, 6144
      tf.keras.layers.LSTM(1024, activation="tanh", return_sequences=False),  #      1, 2048
      tf.keras.layers.LSTM(256),                                                                    #      1, 256
      # tf.keras.layers.Dense(256, activation='relu'),                                                       #      1, 256
      tf.keras.layers.Dense(self.ySize, activation='softmax')                                       #      1, ySize
    ])
    
    return model
  
  # Add Repeat Vector
  def cnnLstmModelBstftRegL2Repeat(self, input_shape, activation='relu'):
    if (activation == 'leakyrelu'):
      activation = tf.keras.layers.LeakyReLU(alpha=0.01)
    
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation=activation, input_shape=input_shape),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Flatten(),
      tf.keras.layers.RepeatVector(4),
      tf.keras.layers.LSTM(1024, activation="tanh", return_sequences=False),
      tf.keras.layers.Dense(2048, activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(2048, activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model
  
  # Add Repeat Vector
  def cnnLstmModelBstftRegL2(self, input_shape, activation='relu'):
    if (activation == 'leakyrelu'):
      activation = tf.keras.layers.LeakyReLU(alpha=0.01)
    
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(120, (11, 11), strides=(4, 4), activation=activation, input_shape=input_shape),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Conv2D(256, (5, 5), strides=(1, 1), activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.BatchNormalization(axis=-1),
      tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2)),
      tf.keras.layers.Reshape((4, 1024)),
      tf.keras.layers.LSTM(1024, activation="tanh", return_sequences=False),
      tf.keras.layers.Dense(2048, activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(2048, activation=activation, kernel_regularizer=tf.keras.regularizers.l2(l=0.01)),
      tf.keras.layers.Dropout(0.5),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model
  
  
  # # CNN LSTM Baseline from Article
  # def optimal(self):
  #   model = tf.keras.Sequential([
  #     tf.keras.layers.Conv2D(64, (3, 3), strides=(1, 1), padding="same", input_shape=(128, 251, 1)), # 254, 254, 64
  #     tf.keras.layers.BatchNormalization(axis=-1),
  #     tf.keras.layers.Activation('elu'),
  #     tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),                                             # 127, 127, 64
  #     tf.keras.layers.Conv2D(64, (3, 3), strides=(1, 1), padding="same"),                            # 125, 125, 64
  #     tf.keras.layers.BatchNormalization(axis=-1),
  #     tf.keras.layers.Activation('elu'),
  #     tf.keras.layers.MaxPooling2D((4, 4), strides=(4, 4)),                                             # 31, 31, 64
  #     tf.keras.layers.Conv2D(128, (3, 3), strides=(1, 1), padding="same"),                           # 29, 29, 128
  #     tf.keras.layers.BatchNormalization(axis=-1),
  #     tf.keras.layers.Activation('elu'),
  #     tf.keras.layers.MaxPooling2D((4, 4), strides=(4, 4)),                                             # 7, 7, 128
  #     tf.keras.layers.Conv2D(128, (3, 3), strides=(1, 1), padding="same"),                           # 5, 5, 128
  #     tf.keras.layers.BatchNormalization(axis=-1),
  #     tf.keras.layers.Activation('elu'),
  #     tf.keras.layers.MaxPooling2D((4, 4), strides=(4, 4)),                                             # 1, 1, 128
  #     tf.keras.layers.Reshape((1, 128)),
  #     tf.keras.layers.LSTM(256, activation="tanh", return_sequences=True),
  #     tf.keras.layers.Dense(self.ySize, activation='softmax')
  #   ])
    
  #   return model

  # CNN LSTM Baseline from Article
  def optimal(self):
    model = tf.keras.Sequential([
      tf.keras.layers.Conv2D(32, (3, 3), strides=(1, 1), padding="same", activation='relu', input_shape=(128, 251, 1)),
      tf.keras.layers.Conv2D(32, (3, 3), strides=(1, 1), padding="same", activation='relu', input_shape=(128, 251, 1)),
      tf.keras.layers.MaxPooling2D((2, 2), strides=(2, 2)),
      tf.keras.layers.Conv2D(64, (3, 3), strides=(1, 1), padding="same", activation='relu'),
      tf.keras.layers.Conv2D(64, (3, 3), strides=(1, 1), padding="same", activation='relu'),
      tf.keras.layers.MaxPooling2D((4, 4), strides=(4, 4)),
      tf.keras.layers.Flatten(),
      tf.keras.layers.Dense(256, activation='relu'),
      tf.keras.layers.Dense(self.ySize, activation='softmax')
    ])
    
    return model

  def summary(self, input_shape=()):
    if (input_shape != ()):
      self.model.build(input_shape)
    self.model.summary()
    
# ( (D + 2 * padding - K) / stride ) + 1
