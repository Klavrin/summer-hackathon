from flask import Blueprint, request, jsonify
from routes.transcript import get_transcript
import openai
import os

flashcards_bp = Blueprint('flashcards', __name__)

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_flashcards(transcript):
    prompt = (
        ""
        "Format each flashcard as 'Q: ... A: ...'.\n\n"
        f"Transcript:\n{transcript}\n\nFlashcards:"
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that creates flashcards."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=700,
        temperature=0.7,
    )
    return response.choices[0].message.content.strip()

@flashcards_bp.route('/flashcards', methods=['POST'])
def flashcards():
    data = request.get_json()
    link = data.get('link')
    if not link:
        return jsonify({'error': 'No link provided'}), 400
    try:
        transcript = get_transcript(link)
        flashcards_text = generate_flashcards(transcript)
        return jsonify({'flashcards': flashcards_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500