import React, { useState } from 'react';
import { Button } from 'antd';
import AudioRTC from "../sdk/AudioRTC";
import AudioAI from '../sdk/AudioAI';

enum Status {
    IDLE = 'idle',
    RECORDING = 'recording',
}

const labelMapper = {
    [Status.IDLE]: '开始录音',
    [Status.RECORDING]: '停止录音',
}

const processStatusMapper = {
    [Status.IDLE]: Status.RECORDING,
    [Status.RECORDING]: Status.IDLE,
}

const audioAI = new AudioAI(); // 初始化AudioAI
const audioRTC = new AudioRTC(); // 初始化AudioRTC

export default function RecordButton() {
    const [file, setFile] = useState<File>();
    const [status, setStatus] = useState(Status.IDLE);

    const onClick = async () => {
        if (status === Status.IDLE) {
            audioRTC.startRecording();
        }

        if (status === Status.RECORDING) {
            const blob = await audioRTC.stopRecording();

            console.log('webm', blob)

            const waveBlob = await audioRTC.getWaveBlob();

            console.log('waveBlob', waveBlob)

            audioAI.toText(waveBlob)

            // audioRTC.recorder.save(+new Date() + '.wav')
        }

        setStatus(processStatusMapper[status]);
    }

    return (
        <>
            <Button onClick={onClick}>{labelMapper[status]}</Button>
            <input type='file' onChange={(e) => {
                const file = e.target.files![0];
                setFile(file);
            }} />
        </>
        
    )
}