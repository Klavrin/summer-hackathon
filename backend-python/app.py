from flask import Flask, request, jsonify
from main import get_transcript

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, Flask!'

@app.route('/transcript', methods=['POST'])
def transcript():
    data = request.get_json()
    link = data.get('link')
    if not link:
        return jsonify({'error': 'No link provided'}), 400
    try:
        transcript_text = get_transcript(link)
        return jsonify({'transcript': transcript_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)