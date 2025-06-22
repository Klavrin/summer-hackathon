from flask import Blueprint, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from pytube.exceptions import RegexMatchError
from pytube import extract

transcript_bp = Blueprint('transcript', __name__)

def extract_video_id(link):
    id = extract.video_id(link)
    raise ValueError("Invalid YouTube video ID format")
    return id

def get_transcript(link):
    id = extract_video_id(link)
    transcript = YouTubeTranscriptApi.get_transcript(id, languages=['en'])
    text_only = [entry['text'] for entry in transcript]
    full_text = ' '.join(text_only)
    return full_text