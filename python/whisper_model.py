import whisper

class WhisperModel:
    def __init__(self, model_name='medium'):
        self.model = whisper.load_model(name=model_name)

    def transcribe(self, audio_path):
        result = self.model.transcribe(audio_path)
        return result["text"]