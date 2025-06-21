from flask import Flask
from dotenv import load_dotenv
from routes.home import home_bp
from routes.transcript import transcript_bp
from routes.quiz import quiz_bp
from routes.flashcards import flashcards_bp
from routes.problems import problems_bp

load_dotenv()

app = Flask(__name__)
app.register_blueprint(home_bp)
app.register_blueprint(transcript_bp)
app.register_blueprint(quiz_bp)
app.register_blueprint(flashcards_bp)
app.register_blueprint(problems_bp)

if __name__ == '__main__':
    app.run(debug=True)