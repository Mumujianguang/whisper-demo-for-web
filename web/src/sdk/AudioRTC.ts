import RecordRTC from 'recordrtc';
import { getWaveBlob } from 'webm-to-wav-converter'

export default class AudioRTC {
    stream!: MediaStream;

    recorder!: RecordRTC

    /**
     * 开始录制
     */
    async startRecording() {
        if (!this.recorder) {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })

            this.recorder = new RecordRTC(this.stream, {
                type: 'audio'
            })
        }

        this.recorder.startRecording()
    }

    /**
     * 结束录制
     * @returns 
     */
    stopRecording(): Promise<Blob> {
        if (!this.recorder) {
            return Promise.reject('Recorder is not initialized')
        }

        return new Promise((resolve) => {
            this.recorder.stopRecording(() => {
                const blob = this.recorder.getBlob()

                resolve(blob)
            })
        })
    }

    /**
     * 获取 blob
     * @returns 
     */
    getWaveBlob() {
        const blob = this.recorder.getBlob()

        return getWaveBlob(blob, false);
    }
}