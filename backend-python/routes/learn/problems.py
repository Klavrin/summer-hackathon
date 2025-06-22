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
        model="gpt-3.5-turbo", #update to gpt-4 for demo
        messages=[
            {"role": "system", "content": "You are a world-class assistant specialised in creating tests for students."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=700, # update to 1000-2000 for gpt-4
        temperature=0.7,
    )
    return response.choices[0].message.content.strip()

def check_answ(problems, user_answers):
    """
    Evaluate user answers against the correct solutions and provide feedback.

    Args:
        problems (list): List of problem descriptions
        user_answers (list): List of user answers corresponding to the problems

    Returns:
        dict: Dictionary containing evaluation results for each answer
    """
    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    prompt = (
        "# GOAL\n\n"
        "Evaluate the user's answers against the correct solutions for these problems. "
        "For each answer, provide:\n"
        "1. A correctness score (0-100%)\n"
        "2. Detailed feedback on what's wrong (if anything)\n"
        "3. The correct answer or approach\n\n"
        "# FORMAT\n\n"
        "Return **only valid JSON**: an array of objects with these fields:\n"
        "- problem: The original problem description\n"
        "- user_answer: The user's answer\n"
        "- correctness: Score (0-100)\n"
        "- feedback: Detailed feedback\n"
        "- correct_answer: The correct answer\n\n"
        "# PROBLEMS AND ANSWERS\n\n"
    )

    for i, (problem, answer) in enumerate(zip(problems, user_answers)):
        prompt += f"Problem {i + 1}: {problem}\n"
        prompt += f"User Answer {i + 1}: {answer}\n\n"

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a world-class educator specialized in evaluating student answers."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=1000,
        temperature=0.3,
    )

    try:
        return json.loads(response.choices[0].message.content.strip())
    except json.JSONDecodeError:
        return {"error": "Could not parse evaluation response"}

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

@problems_bp.route('/check_answers', methods=['POST'])
def check_answers():
    """
    Endpoint to check user answers against problems
    Expects JSON with:
    {
        "problems": ["problem1", "problem2", ...],
        "answers": ["answer1", "answer2", ...]
    }
    """
    data = request.get_json()
    problems = data.get('problems')
    answers = data.get('answers')

    if not problems or not answers:
        return jsonify({'error': 'Both problems and answers are required'}), 400
    if len(problems) != len(answers):
        return jsonify({'error': 'Number of problems and answers must match'}), 400

    try:
        evaluation = check_answ(problems, answers)
        return jsonify(evaluation), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500