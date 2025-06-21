from youtube_transcript_api import YouTubeTranscriptApi
from pytube import extract

def extract_video_id(link):
    id=extract.video_id(link)
    return id

def get_transcript(link):
    id = extract_video_id(link)
    transcript = YouTubeTranscriptApi.get_transcript(id, languages=['en-US'])
    text_only = [entry['text'] for entry in transcript]
    full_text = ' '.join(text_only)
    return full_text

'''Execute get_trancript(link), receive long ass string with transcript'''