
# whisper demo for web

English | [简体中文](./README.md)

## introduce
web
- build tool：```vite```
- framework：```React```
- UI：```antd```
- other libs：```recordrtc```, ```webm-to-wav-converter```

python
- framework：```uvicorn```，```fastapi```
- audio processing：```librosa```
- word processing：```zhconv```

## run
### setup whisper
[-> whisper](https://github.com/openai/whisper)

```
pip3 install -U openai-whisper
```

### web
```
cd ./web
pnpm install
pnpm run dev
```

### python
```
cd ./python
pip3 install -r requirements.txt
python main.py
```

## preview
open http://localhost:5173/ in browser