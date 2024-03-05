import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
})

export const fetchAudioToText = async (audio: Blob) => {
    const formData = new FormData()

    formData.append('audio', audio)
    formData.append('timestamp', String(+new Date()))

    return api.post('/audioToText', formData)
}