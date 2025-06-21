from flask import Blueprint, request, jsonify
from routes.services.transcript import get_transcript
import openai
import os

problems_bp = Blueprint('problems', __name__)

def generate_problems(transcript):
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    prompt = (
        "# GOAL\n\n"
        "You will now write a test with practical tasks based on the input specified in the \"INPUT\" section with the specified format.\n"
        "# FORMAT:\n\n"
        "SHOULD BE A PARSABLE PYTHON TYPE SUCH THAT IT CAN BE DIRECTLY READ BY PYTHON AND SHOULD CONTAIN A LIST OF STRINGS\n"
        "# INPUT\n\n"
        f"Transcript:\n{transcript}\n\n"
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a world-class assistant specialised in creating tests for students."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=700,
        temperature=0.7,
    )
    return response.choices[0].message.content.strip()

@problems_bp.route('/problems', methods=['POST'])
def problems():
    data = request.get_json()
    link = data.get('link')
    if not link:
        return jsonify({'error': 'No link provided'}), 400
    try:
        transcript = get_transcript(link)
        problems_text = generate_problems(transcript)
        return jsonify({'problems': problems_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500