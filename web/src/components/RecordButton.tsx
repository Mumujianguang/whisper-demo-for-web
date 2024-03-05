import React, { useState } from 'react';
import { Button, Spin } from 'antd';
import AudioRTC from "../sdk/AudioRTC";
import AudioAI from '../sdk/AudioAI';

// 定义识别结果
export type Result = {
    // 识别内容 or 错误信息
    text: string
    // 识别耗时
    transcribe_time?: number
}

type Props = {
    // 识别完成事件
    onResult?: (result: Result) => void;
}

// 状态枚举
enum Status {
    // 空闲
    IDLE = 'idle',
    // 记录中
    RECORDING = 'recording',
}

// 文本映射
const labelMapper = {
    [Status.IDLE]: '开始录音',
    [Status.RECORDING]: '停止录音',
}

// 过程转换映射
const processStatusMapper = {
    [Status.IDLE]: Status.RECORDING,
    [Status.RECORDING]: Status.IDLE,
}

// 初始化AudioAI
const audioAI = new AudioAI(); 
// 初始化AudioRTC
const audioRTC = new AudioRTC(); 

export default function RecordButton(props: Props) {
    const [status, setStatus] = useState(Status.IDLE);
    const [loading, setLoading] = useState(false);

    // 点击事件
    const onClick = async () => {
        if (status === Status.IDLE) {
            // 开始录制
            audioRTC.startRecording();
        }

        if (status === Status.RECORDING) {
            // 结束录制
            await audioRTC.stopRecording();
            // 获取 wav 格式的 blob
            const waveBlob = await audioRTC.getWaveBlob();

            try {
                setLoading(true);

                // 调用接口 - 语音识别
                const response = await audioAI.toText(waveBlob)

                props.onResult?.(response);
            } catch (error) {
                props.onResult?.({ text: `${error}` });
            } finally {
                setLoading(false)
            }
        }

        setStatus(processStatusMapper[status]);
    }

    return (
        <>
            <Button onClick={onClick}>{labelMapper[status]}</Button>
            {
                loading &&
                <Spin tip="识别中..." size="small">
                    <span className="content" />
                </Spin>
            }
        </>
    )
}