from youtube_transcript_api import YouTubeTranscriptApi

transcript = YouTubeTranscriptApi.get_transcript('3mRvCF4qyTA')

text_only = [entry['text'] for entry in transcript]
full_text = ' '.join(text_only)
print(full_text)