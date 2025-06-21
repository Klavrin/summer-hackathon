from flask import Blueprint, request, jsonify
from routes.services.transcript import get_transcript
from routes.services.parser import parse_test
import openai
import os

problems_bp = Blueprint('problems', __name__)

def generate_problems(transcript):
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    prompt = (
        "# GOAL\n\n"
        "Create a set of practical test tasks based on the transcript below.\n\n"
        "# FORMAT\n\n"
        "Return **only valid JSON**: a single array of strings.  Example:\n"
        "[\n"
        "  \"Task 1 description\",\n"
        "  \"Task 2 description\",\n"
        "  \"Task 3 description\"\n"
        "]\n\n"
        "# INPUT\n\n"
        f"{transcript}\n"
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
        raw = generate_problems(transcript)
        problems_list = parse_test(raw)
        return jsonify({'problems': problems_list}), 200

    except ValueError as ve:
        return jsonify({'error': f'Could not parse problems: {ve}'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500