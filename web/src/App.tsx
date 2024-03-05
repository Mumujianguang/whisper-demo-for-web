import { useState } from 'react'
import './App.css'
import RecordButton, { Result } from './components/RecordButton'
import { Divider, List, Typography } from 'antd'

function App() {
    const [list, setList] = useState<Result[]>([])

    const onResult = (result: Result) => {
        setList((prev) => [...prev, result])
    }

    return (
        <div className="App">
            <RecordButton onResult={onResult} />

            <Divider orientation="left">识别记录</Divider>
            <List
                bordered
                dataSource={list}
                renderItem={(item, index) => (
                    <List.Item style={{ justifyContent: 'flex-start' }}>
                        {/* 序号 */}
                        <span>[{index + 1}]</span>
                        {/* 耗时 */}
                        <Typography.Text mark style={{ margin: '0 6px' }}>
                            识别耗时：{item.transcribe_time}s
                        </Typography.Text>
                        {/* 内容 */}
                        <span style={{ margin: '0 6px' }}>{item.text}</span>
                    </List.Item>
                )}
            />
            
        </div>
    )
}

export default App