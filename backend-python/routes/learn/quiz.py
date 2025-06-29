from flask import Blueprint, request, jsonify
from routes.services.transcript import get_transcript
from routes.services.parser import parse_quiz
import openai
import os

quiz_bp = Blueprint('quiz', __name__)

def generate_quiz(transcript):
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    prompt = (
        "# GOAL\n\n"
        "You will now write a quiz based on the input specified in the \"INPUT\" section with the specified format."
        "# FORMAT\n\n"
        "Return **only valid JSON**: a single array of objects with keys \"question\", \"choice1\", \"choice2\", \"choice3\", \"choice4\", and \"answer\"."
        "# INPUT\n\n"
        f"{transcript}\n"
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a world-class professor with deep knowledge in quiz creation."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=700,
        temperature=0.7,
    )
    return response.choices[0].message.content.strip()

@quiz_bp.route('/quiz', methods=['POST'])
def quiz():
    data = request.get_json() or {}
    link = data.get('link')
    if not link:
        return jsonify({'error': 'No link provided'}), 400

    try:
        transcript = get_transcript(link)
        raw = generate_quiz(transcript)
        quiz_list = parse_quiz(raw)
        return jsonify({'quiz': quiz_list}), 200

    except ValueError as ve:
        return jsonify({'error': f'Could not parse quiz: {ve}'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500