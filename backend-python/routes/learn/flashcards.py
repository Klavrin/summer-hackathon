from flask import Blueprint, request, jsonify
from routes.services.transcript import get_transcript
from routes.services.parser import parse_flashcards
import openai
import os
import json

flashcards_bp = Blueprint('flashcards', __name__)

def generate_flashcards(transcript):
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    prompt = (
        "# GOAL\n\n"
        "You will now write flashcards based on the input specified in the \"INPUT\" section with the specified format in the \"FORMAT\" section."
        "# FORMAT\n\n"
        "SHOULD BE A PARSABLE DICTIONARY PYTHON TYPE SUCH THAT IT CAN BE DIRECTLY READ BY PYTHON AND SHOULD CONTAIN A LIST OF:\n"    
        "\'front\'\n"
        "\'backshot\'\n"
        "# INPUT\n\n"
        "MUST BE VALID JSON: an array of objects, each with exactly two string fields:\n"
        "  • front: the question side\n"
        "  • backshot: the answer side\n"
        f"Transcript:\n{transcript}\n\n"
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an expert psychologist specialised in enhancing learning. You are profficient in flashcards creation."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=1000,
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
        
        
        flashcards_list = parse_flashcards(flashcards_text)
        
        return jsonify({'flashcards': flashcards_list}), 200

    except ValueError as ve:
        return jsonify({'error': f'Could not parse flashcards: {ve}'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500