import "./micSystem.css";
import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { saveAs } from "file-saver";

const MicSystem = () => {
    const [script, setScript] = useState([]);
    const [micState, setMicState] = useState(true);

    const {
        listening,
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        clearBlobUrl
    } = useReactMediaRecorder({audio: true});

    const switchMic = () => {
        setMicState((preStatus) => {
            return !preStatus;
        });

        if (micState === true){
            start(); 
        } else if (micState === false) {
            stop();
        }
    }

    const start = () => {
        startRecording();
        SpeechRecognition.startListening({
            continuous: true
        });
    }

    const stop = async () => {
        stopRecording();
        SpeechRecognition.stopListening();

        // we set a time dealy of 20 sec, so that the module can process the voice
        // and produce the transcript.
        setTimeout(() => {
            setScript([...script, transcript]);
            console.log("20 sec passed, transcript processing might be completed.");
        }, 20000);
    }

    const clear = () => {  
        saveAs(mediaBlobUrl, "SpeechAudio.wav");
        resetTranscript();
        clearBlobUrl();
    }

    const log = () => { 
        console.log(script);
    }

    if(!browserSupportsSpeechRecognition) {
        return (<span>Unsupported Browser</span>);
    }

    return (
        <>
            <div className="my-container">
                <div className="my-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-6">
                            <audio src={mediaBlobUrl} controls autoPlay /><br />
                                {mediaBlobUrl}<br />
                                <button className="btn btn-primary" onClick={switchMic}><span className="fa-solid fa-microphone fa-5x"></span></button>
                                <h4>Microphone: {listening ? 'On' : 'Off'} & <small>{status.toUpperCase()}</small></h4>
                                <p>{transcript === "" ? <br /> : transcript }</p>
                                <button className="btn btn-sm btn-danger mx-3 px-3" onClick={clear}>Clear</button>
                                <button className="btn btn-sm btn-primary mx-3 px-3" onClick={log}>Show Log</button>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MicSystem;