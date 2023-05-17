import React from "react";
import { FiMic } from "react-icons/fi";

let chunks: any[] = [];

interface Props {
  getVoiceRecorded: (voice: any) => void;
}

const Recorder: React.FC<Props> = ({ getVoiceRecorded }: Props) => {
  const [recorder, setRecorder] = React.useState<any>(null);
  const [stop, setStop] = React.useState<any>(false);
  const [recording, setRecording] = React.useState<any>(false);

  React.useEffect(() => {
    const startRecording = async () => {
      chunks = [];
      try {
        setStop(false);
        setRecording(true);
        recorder.start();
        console.log("recorder started");
        recorder.ondataavailable = function (e: any) {
          chunks.push(e.data);
        };
      } catch (error) {
        console.log(error);
      }
    };

    if (recorder) {
      startRecording();
    }
  }, [recorder]);

  React.useEffect(() => {
    const stopRecording = () => {
      if (recorder) {
        recorder.stop();
        recorder.onstop = (e: any) => {
          let audio = document.createElement("audio");
          audio.controls = true;
          let blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          let audioURL: string = window.URL.createObjectURL(blob);
          audio.src = audioURL;
          chunks = [];

          getVoiceRecorded(audioURL);
          setRecorder(null);
          setRecording(false);
          setStop(false);
          recorder.stream.getAudioTracks().forEach((track: any) => {
            track.stop();
            console.log(track);
          });
        };
      }
    };

    if (stop) {
      stopRecording();
    }
  }, [stop, getVoiceRecorded, recorder]);

  const init = async () => {
    if (recording) {
      setStop(true);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      setRecorder(new MediaRecorder(stream));
    }
  };

  return (
    <div style={{ display: "inline", width: "40px" }}>
      <button
        style={{ marginRight: "5px" }}
        className={`btn-mic ${recording ? "recording Rec" : "notRec"}`}
        onClick={init}
      >
        <FiMic size={20} color={"white"} />
      </button>
    </div>
  );
};

export default Recorder;
