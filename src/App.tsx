import "./App.css";
import PlayList from "./components/playList";

function App() {
  return (
    <div data-test-id="component-app" className="container">
      <h1>🚀 Recorder and music Player 💨</h1>
      <p>
        {" "}
        A versatile audio player that lets you record and add your own audio to
        the playlist. Easily upload your favorite music from your desktop for
        seamless integration. Enjoy full control with volume adjustment, mute
        option, play/pause, and navigate through tracks. Experience dynamic
        playback with random track selection for a unique listening experience.
      </p>
      <h3>🚀 You can upload your favorite music </h3>
      <div className="flex">
        <PlayList />
      </div>
      {/* {voiceRecoreded ? <audio controls src={voiceRecoreded} /> : "NOT UPLOADED"} */}
    </div>
  );
}

export default App;
