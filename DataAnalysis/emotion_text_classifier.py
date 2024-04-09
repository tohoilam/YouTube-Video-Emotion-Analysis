from transformers import pipeline

# Initialize the sentiment analysis model
classifier = pipeline("sentiment-analysis", model="michellejieli/emotion_text_classifier", return_all_scores=True)

# Function to analyze sentiment of the input text
def analyze_sentiment(input_text):
    if input_text:
        # Use the model to analyze sentiment of the text
        results = classifier(input_text)
        # Sort the results based on score and take the top 3
        top_results = sorted(results[0], key=lambda x: x['score'], reverse=True)[:3]
        # Prepare the top 3 emotions and their confidence levels for display
        display_text = "\n".join([f" {res['label']} : {res['score']*100:.2f}%" for res in top_results])
        return display_text
    else:
        # Return a message if the text input is empty
        return "No text provided"

# Example usage
if __name__ == "__main__":
    input_text = "I feel bad"  # Replace "Your text here" with actual text to analyze
    print(analyze_sentiment(input_text))
