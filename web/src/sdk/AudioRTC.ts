import RecordRTC from 'recordrtc';
import { getWaveBlob } from 'webm-to-wav-converter'
 
const audioContext = new AudioContext();

export default class AudioRTC {
    stream!: MediaStream;

    recorder!: RecordRTC

    mediaRecorder!: MediaRecorder

    _waveData: Blob[] = []

    async startRecording() {
        if (!this.recorder) {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })

            // this.mediaRecorder = new MediaRecorder(this.stream);

            // this.mediaRecorder.ondataavailable = e => e.data.size && this._waveData.push(e.data);
            
            // this.mediaRecorder.onstop = () => {
            //     // For 16-bit audio
            //     this._waveData = getWaveBlob(data,false);
            // };

            this.recorder = new RecordRTC(this.stream, {
                type: 'audio',
                sampleRate: 44100
            } as any)
        }
        
        this._waveData = []
        this.recorder.startRecording()
    }

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

    getWaveBlob() {
        const blob = this.recorder.getBlob()

        return getWaveBlob(blob, false);
    }

    // getWaveform(buffer: ArrayBuffer): Promise<WaveformData> {
    //     return new Promise((resolve, reject) => {
    //         const options = {
    //             audio_context: audioContext,
    //             array_buffer: buffer
    //         };

    //         WaveformData.create(options, (err, waveform) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             else {
    //                 resolve(waveform);
    //             }
    //         });
    //     });
    // }
}