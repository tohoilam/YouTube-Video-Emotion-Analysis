import tkinter as tk
from tkinter import scrolledtext, ttk
import threading
from transformers import pipeline
import os
import csv
# Initialize the sentiment analysis model
classifier = pipeline("sentiment-analysis", model="michellejieli/emotion_text_classifier", return_all_scores=True)

# Function to analyze sentiment of the input text
def analyze_sentiment():
    base_directory = 'process_audio/text'  # Update to the correct path
    results_file = 'all_texts_emotion.csv'
    
    # Headers for the CSV file based on the number of labels expected from the classifier
    csv_headers = ['File'] + [f'Label {i+1}' for i in range(8)] + [f'Score {i+1}' for i in range(8)]
    
    # Open the CSV file in write mode
    with open(results_file, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(csv_headers)  # Write the headers to the CSV file

        # Process each text file
        for filename in os.listdir(base_directory):
            if filename.endswith('.txt'):
                filepath = os.path.join(base_directory, filename)
                with open(filepath, 'r') as file:
                    input_text = file.read()
                    if input_text:
                        # Use the model to analyze sentiment of the text
                        results = classifier(input_text)
                        top_results = sorted(results[0], key=lambda x: x['score'], reverse=True)[:8]
                        
                        # Prepare the row for the CSV file
                        row = [filename]
                        for res in top_results:
                            row.append(res['label'])
                            row.append(f"{res['score']*100:.2f}%")
                        csvwriter.writerow(row)

analyze_sentiment()
