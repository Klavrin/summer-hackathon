from flask import Blueprint, request, jsonify
from routes.transcript import get_transcript
import openai
import os

quiz_bp = Blueprint('quiz', __name__)

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_quiz(transcript):
    prompt = (
        "Answer only with a generated quiz based on the theme of the following transcript."
        "Transcript:\n\n"
        f"{transcript}\n\n"
        "Quiz:"
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that creates quizzes."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=700,
        temperature=0.7,
    )
    return response.choices[0].message.content.strip()

@quiz_bp.route('/quiz', methods=['POST'])
def quiz():
    data = request.get_json()
    link = data.get('link')
    if not link:
        return jsonify({'error': 'No link provided'}), 400
    try:
        transcript = get_transcript(link)
        quiz_text = generate_quiz(transcript)
        return jsonify({'quiz': quiz_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500