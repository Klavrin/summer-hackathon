from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from routes.home import home_bp
from routes.services.transcript import transcript_bp
from routes.learn.quiz import quiz_bp
from routes.learn.flashcards import flashcards_bp
from routes.learn.problems import problems_bp
from routes.learn.answers import answers_bp

load_dotenv()

app = Flask(__name__)
CORS(app)
app.register_blueprint(home_bp)
app.register_blueprint(transcript_bp)
app.register_blueprint(quiz_bp)
app.register_blueprint(flashcards_bp)
app.register_blueprint(problems_bp)
app.register_blueprint(answers_bp)

if __name__ == '__main__':
    app.run(debug=True)