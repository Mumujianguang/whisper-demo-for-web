import { fetchAudioToText } from "./service";

export default class AudioAI {
    toText(audio: Blob) {
        return fetchAudioToText(audio)
    }
}