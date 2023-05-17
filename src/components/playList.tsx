import React from "react";
import { FiMusic } from "react-icons/fi";
import Audio from "./audio";
import Recorder from "./recorder";

export default function PlayList() {
  const [playList, setPlayList] = React.useState<string[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0);
  const getVoiceRecorded = (voice: string) => {
    setPlayList([...playList, voice]);
  };
  function handleAudioUpload(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    const files: FileList | null = fileInput.files;

    if (files) {
      const promises: Promise<string>[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const promise = new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            const result = e.target?.result;
            if (result instanceof ArrayBuffer) {
              const blob = new Blob([result], { type: file.type });
              const url = URL.createObjectURL(blob);
              resolve(url);
            }
          };
          reader.readAsArrayBuffer(file);
        });

        promises.push(promise);
      }

      Promise.all(promises)
        .then((urls: string[]) => {
          const updatedPlaylist = [...urls, ...playList];
          setPlayList(updatedPlaylist);
          console.log("Array of URLs:", updatedPlaylist);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }

  return (
    <>
      <div className="card-playList">
        <div>
          <Recorder getVoiceRecorded={getVoiceRecorded} />
          <label htmlFor="audio-upload" style={{ display: "none" }}>
            <input
              type="file"
              accept="audio/*"
              id="audio-upload"
              multiple
              onChange={handleAudioUpload}
            />
          </label>

          <button
            className="btn-navigation"
            onClick={() => document.getElementById("audio-upload")?.click()}
          >
            <FiMusic size={23} />
          </button>

          <div
            style={{
              height: "250px",
              overflow: "auto",
            }}
          >
            {playList.map((item, index) => (
              <div
                id={item}
                className={`item-audio-list ${
                  index === currentItemIndex ? " active-audio" : ""
                }`}
                onClick={() => setCurrentItemIndex(index)}
              >
                Track ({index + 1})
              </div>
            ))}
          </div>
        </div>
        <div>
          <Audio
            playList={playList}
            currentItemIndex={currentItemIndex}
            getCurrentItem={(currentIndex: number) => {
              setCurrentItemIndex(currentIndex);
            }}
          />
        </div>
      </div>
    </>
  );
}
