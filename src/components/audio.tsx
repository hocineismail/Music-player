import React, { useRef, useState } from "react";
import { GrPlayFill, GrPauseFill } from "react-icons/gr";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { FaRandom } from "react-icons/fa";
import {
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
  BsFillVolumeDownFill,
} from "react-icons/bs";
type Props = {
  playList: string[];
  getCurrentItem: (e: any) => void;
  currentItemIndex: number;
};

export default function Audio({
  playList,
  getCurrentItem,
  currentItemIndex,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRandom, setisRandom] = useState(false);
  const [isMute, setisMute] = useState({
    mute: false,
    volume: 1,
  });
  const [vol, setVol] = useState(1);
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume: number = Number(event.target.value);

    if (audioRef.current) {
      if (isMute.mute) {
        setisMute({ ...isMute, mute: false });
      }
      audioRef.current.volume = volume / 100;
      setVol(volume / 100);
    }
  };

  const handleAudioEnded = () => {
    if (audioRef.current) {
      if (currentItemIndex < playList.length - 1) {
        if (isRandom) {
          const random = Math.floor(Math.random() * playList.length);
          console.log(random);
          getCurrentItem(random);
        } else {
          getCurrentItem(currentItemIndex + 1);
        }
      } else {
        // If it's the last audio, stop playing or perform desired action
        setIsPlaying(false);
      }
    }
  };

  const handleAudioNext = () => {
    if (currentItemIndex < playList.length - 1) {
      getCurrentItem(currentItemIndex + 1);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  };

  const handleAudioPrevious = () => {
    if (currentItemIndex !== 0) {
      getCurrentItem(currentItemIndex - 1);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  };
  const handleAudioMute = () => {
    if (isMute.mute) {
      setisMute({ ...isMute, mute: false });
      if (audioRef.current) {
        audioRef.current.volume = isMute.volume;
      }
    } else {
      setisMute({ volume: vol, mute: true });
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  };

  React.useEffect(() => {
    // if (playList.length - 1 === currentItemIndex) {

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleAudioEnded);
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleAudioEnded);
      }
    };

    // } else {
    //   console.log("should here");
    //   console.log(isPlaying);

    //   if (audioRef.current) {
    //     if (isPlaying) {
    //       audioRef.current.play();
    //     }
    //   }
    // }
  }, [currentItemIndex]);
  return (
    <div className="card-player">
      <h2 style={{ textAlign: "center" }}>Voice Number {currentItemIndex}</h2>
      <audio
        ref={audioRef}
        controls
        src={playList[currentItemIndex]}
        style={{ display: "none" }}
      />
      <button
        className="btn-navigation"
        style={{ position: "absolute", bottom: 0, zIndex: 2 }}
        onClick={() => setisRandom(!isRandom)}
      >
        <FaRandom size={20} color={isRandom ? "green" : "black"} />
      </button>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className="btn-navigation"
          onClick={handleAudioPrevious}
          disabled={currentItemIndex === 0}
        >
          <BiSkipPrevious size={20} />
        </button>
        <button
          className="btn-play"
          onClick={handlePlayPause}
          disabled={playList.length === 0}
        >
          {isPlaying ? <GrPauseFill size={23} /> : <GrPlayFill size={23} />}
        </button>

        <button
          className="btn-navigation"
          onClick={handleAudioNext}
          disabled={
            currentItemIndex === playList.length - 1 || playList.length === 0
          }
        >
          <BiSkipNext size={20} />
        </button>
      </section>
      <button
        className="btn-navigation"
        style={{ position: "absolute", bottom: 0, right: 0, zIndex: 2 }}
        onClick={handleAudioMute}
      >
        {isMute.mute ? (
          <BsFillVolumeMuteFill size={20} />
        ) : (
          <span>
            {vol < 0.5 ? (
              <BsFillVolumeDownFill size={20} />
            ) : (
              <BsFillVolumeUpFill size={20} />
            )}
          </span>
        )}

        {/* BsFillVolumeDownFill */}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        onChange={handleVolumeChange}
        className="volume"
      />
    </div>
  );
}
