from flask import Blueprint, request, jsonify
from routes.transcript import get_transcript
import openai
import os

problems_bp = Blueprint('problems', __name__)

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_problems(transcript):
    prompt = (
        "Create 5 challenging problem set questions (with answers) based on the following transcript. "
        "Each problem should be clear and relevant to the content. Provide the answer after each question.\n\n"
        f"Transcript:\n{transcript}\n\nProblems:"
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that creates problem sets."},
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