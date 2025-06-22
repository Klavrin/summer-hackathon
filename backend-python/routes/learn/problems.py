from flask import Blueprint, request, jsonify
from routes.services.transcript import get_transcript
from routes.services.parser import parse_test, parse_answer, parse_grade
from routes.learn.answers import generate_answer
import json
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
        model="gpt-3.5-turbo", #update to gpt-4 for demo
        messages=[
            {"role": "system", "content": "You are a world-class assistant specialised in creating tests for students."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=700, # update to 1000-2000 for gpt-4
        temperature=0.7,
    )
    return response.choices[0].message.content.strip()

def grade_problem_answer(question: str, user_answer: str) -> str:
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    prompt = (
        "# GOAL\n\n"
        "Grade the student's answer to the given question.\n\n"
        "# FORMAT\n\n"
        "Return **only valid JSON** with the following keys:\n"
        "- \"score\": integer from 0 to 100\n"
        "- \"feedback\": string (concise evaluation and suggestions)\n\n"
        "# INPUT\n\n"
        f"Question: {question}\n"
        f"Student Answer: {user_answer}\n"
    )
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are an expert instructor. Provide an objective score and feedback for student answers."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=700,
        temperature=0.0,
    )
    return response.choices[0].message.content.strip()


@problems_bp.route('/problems', methods=['POST'])
def problems():
    data = request.get_json() or {}
    link = data.get('link')
    if not link:
        return jsonify({'error': 'No link provided'}), 400

    try:
        transcript    = get_transcript(link)
        raw_problems  = generate_problems(transcript)
        problems_list = parse_test(raw_problems)

        items = []
        for q in problems_list:
            raw_ans = generate_answer(q)
            ans_obj = parse_answer(raw_ans, include_steps=True)
            items.append({
                "question": q,
                **ans_obj
            })

        return jsonify({"items": items}), 200

    except ValueError as ve:
        return jsonify({'error': f'Parsing error: {ve}'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@problems_bp.route('/grade', methods=['POST'])
def grade():
    data = request.get_json() or {}
    question = data.get('question')
    user_answer = data.get('answer')
    if not question or user_answer is None:
        return jsonify({'error': 'Both question and answer are required'}), 400

    try:
        raw_grade = grade_problem_answer(question, user_answer)
        grade_obj = parse_grade(raw_grade)
        return jsonify(grade_obj), 200

    except ValueError as ve:
        return jsonify({'error': f'Parsing error: {ve}'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
