
# whisper demo for web

简体中文 | [English](./README_EN.md)

基于 WebRCT + whisper 的语音识别 demo

## 技术栈
web
- 构建工具：```vite```
- 框架：```React```
- 组件库：```antd```
- 语音采集：```recordrtc```, ```webm-to-wav-converter```

python
- 服务器框架：```uvicorn```，```fastapi```
- 音频处理：```librosa```
- 字词转换：```zhconv```

## 运行

### 安装 whisper 依赖
```
pip3 install -U openai-whisper
```
更多细节请查阅 [whisper官网](https://github.com/openai/whisper)

### 前端环境
```
cd ./web
pnpm install
pnpm run dev
```

### 服务端环境
```
cd ./python
pip3 install -r requirements.txt
python main.py
```

## 预览
在浏览器中访问 http://localhost:5173/

## 实现思路

掘金 -> https://juejin.cn/post/7342506460206645248

公众号 -> 前端研习圈