from flask import Blueprint, request, jsonify
import openai
import os
from routes.services.parser import parse_answer

answers_bp = Blueprint('answers', __name__)

def generate_answer(question: str):
    system = "You are a world-class assistant specialized in solving student test tasks."
    prompt = (
        "# GOAL\n\n"
        "Solve the following problem and return valid JSON with both the final answer and a detailed step-by-step solution.\n\n"
        "# FORMAT\n\n"
        "{\n"
        '  "answer": "<final answer>",\n'
        '  "steps": ["<step 1>", "<step 2>", ...]\n'
        "}\n\n"
        "# INPUT\n\n"
        f"{question}\n"
    )
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    resp = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system},
            {"role": "user",   "content": prompt}
        ],
        temperature=0.7,
        max_tokens=700
    )
    return resp.choices[0].message.content.strip()

@answers_bp.route('/problems/answer', methods=['POST'])
def answer():
    data = request.get_json()
    question = data.get('question')
    include_steps = bool(data.get('include_steps', False))

    if not question:
        return jsonify({"error": "No question provided"}), 400

    try:
        raw = generate_answer(question, include_steps)
        parsed = parse_answer(raw, include_steps)
        return jsonify(parsed), 200

    except ValueError as ve:
        return jsonify({"error": f"Parsing error: {ve}"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
