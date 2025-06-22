from flask import Blueprint, request, jsonify, abort
from routes.services.supabase_client import get_supabase
from routes.services.transcript import get_transcript
from routes.learn.problems import generate_problems
from routes.services.parser import parse_test
import uuid, os, openai

conv_bp = Blueprint('conversation', __name__)

@conv_bp.route('/start_session', methods=['POST'])
def start_session():
    data = request.get_json() or {}
    link = data.get('link')
    if not link:
        abort(400, description="Missing 'link' in request body")

    transcript = get_transcript(link)
    raw = generate_problems(transcript)
    problems = parse_test(raw)

    supabase = get_supabase()
    session_id = str(uuid.uuid4())
    resp = supabase.table('sessions').insert({'id': session_id}).execute()
    if resp.status_code >= 300:
        abort(500, description=f"Supabase insert session failed (status {resp.status_code})")

    questions_out = []
    for idx, text in enumerate(problems, start=1):
        qid = str(uuid.uuid4())
        questions_out.append({'question_id': qid, 'text': text})
        resp_q = supabase.table('questions').insert({
            'id': qid,
            'session_id': session_id,
            'text': text,
            'order': idx
        }).execute()
        if resp_q.status_code >= 300:
            abort(500, description=f"Supabase insert question failed (status {resp_q.status_code})")

    return jsonify(session_id=session_id, questions=questions_out), 201

@conv_bp.route('/session/<session_id>/questions', methods=['GET'])
def list_questions(session_id):
    supabase = get_supabase()
    resp = supabase.table('questions') \
                   .select('id, text, "order"') \
                   .eq('session_id', session_id) \
                   .order('order', {'ascending': True}) \
                   .execute()
    if resp.status_code >= 300:
        abort(500, description=f"Supabase select questions failed (status {resp.status_code})")
    return jsonify(questions=resp.data), 200

@conv_bp.route('/session/<session_id>/messages', methods=['GET'])
def list_messages(session_id):
    supabase = get_supabase()
    resp = supabase.table('messages') \
                   .select('role, content, question_id, created_at') \
                   .eq('session_id', session_id) \
                   .order('created_at', {'ascending': True}) \
                   .execute()
    if resp.status_code >= 300:
        abort(500, description=f"Supabase select messages failed (status {resp.status_code})")
    return jsonify(messages=resp.data), 200

@conv_bp.route('/session/<session_id>/question/<question_id>/act', methods=['POST'])
def question_action(session_id, question_id):
    data = request.get_json() or {}
    action = data.get('action')
    user_answer = data.get('user_answer')
    if action not in ('answer','steps','grade'):
        abort(400, description="Invalid action, must be 'answer', 'steps', or 'grade'")

    supabase = get_supabase()
    hist = supabase.table('messages') \
                  .select('role,content') \
                  .eq('session_id', session_id) \
                  .order('created_at', {'ascending': True}) \
                  .execute()
    if hist.status_code >= 300:
        abort(500, description=f"Supabase select history failed (status {hist.status_code})")
    history = hist.data

    qres = supabase.table('questions') \
                   .select('text') \
                   .eq('id', question_id) \
                   .single() \
                   .execute()
    if qres.status_code >= 300 or not qres.data:
        abort(404, description="Question not found or fetch failed")
    question_text = qres.data['text']

    if action == 'answer':
        prompt = f"What is the final answer to: \"{question_text}\"?"
    elif action == 'steps':
        prompt = f"Provide a step-by-step solution to: \"{question_text}\"."
    else:  # grade
        if not user_answer:
            abort(400, description="Missing 'user_answer' for grading")
        # store student's answer
        resp_u = supabase.table('messages').insert([{
            'session_id': session_id,
            'question_id': question_id,
            'role': 'user',
            'content': user_answer
        }]).execute()
        if resp_u.status_code >= 300:
            abort(500, description=f"Supabase insert user answer failed (status {resp_u.status_code})")
        prompt = (
            f"Grade the student's answer for: \"{question_text}\".\n"
            f"Student answer:\n{user_answer}\n"
            "Provide a brief score and constructive feedback."
        )

    # call OpenAI
    try:
        client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        messages = [{ 'role': m['role'], 'content': m['content'] } for m in history]
        messages.append({'role':'user','content':prompt})
        ai_resp = client.chat.completions.create(
            model='gpt-4',
            messages=messages,
            temperature=0.7
        )
        reply = ai_resp.choices[0].message.content.strip()
    except Exception as e:
        abort(500, description=f"OpenAI error: {str(e)}")

    # persist assistant reply
    resp2 = supabase.table('messages').insert([{
        'session_id': session_id,
        'question_id': question_id,
        'role': 'assistant',
        'content': reply
    }]).execute()
    if resp2.status_code >= 300:
        abort(500, description=f"Supabase insert assistant reply failed (status {resp2.status_code})")

    return jsonify(reply=reply), 200
