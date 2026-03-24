import React, { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [play, setPlay] = useState(true);
  const [loop, setLoop] = useState(true);
  const [doubleLoop, setDoubleLoop] = useState(false);
  const [duration, setDuration] = useState({ minutes: 0, seconds: 0 });
  const [currentTime, setCurrentTime] = useState({ minutes: 0, seconds: 0 });
  const [volume, setVolume] = useState(0.5);
  const [progressValue, setProgressValue] = useState(0);
  const [showVolumeBar, setShowVolumeBar] = useState(false);

  const songs = [
    {
      title: "Alternate Skies - &猫シ Corp. Tomorrow's Forecast",
      file: "Alternate_Skies_Corp_Tomorrow_s_Forecast.mp3",
    },
    {
      title: "Alternate Skies - Where's The Week Ahead",
      file: "Alternate_Skies_Where_s_The_Week_Ahead.mp3",
    },
    {
      title: "Colin Kiddy - European Partners De Wolfe Music",
      file: "Colin_Kiddy_European_Partners_De_Wolfe_Music.mp3",
    },
    {
      title: "D0ppler Radar 夕暮れ",
      file: "D0ppler_Radar.mp3",
    },
    {
      title: "Mabisyo - What Is Your Dream",
      file: "Mabisyo_What_Is_Your_Dream.mp3",
    },
    {
      title: "New Development",
      file: "New_Development.mp3",
    },
    {
      title: "Trammell Starks - Reflections In Time",
      file: "Trammell_Starks_Reflections_In_Time_WeatherscanRemastered.mp3",
    },
    {
      title: "Where Are You Now",
      file: "Where_Are_You_Now.mp3",
    },
  ];



  const audioplayerRef = useRef();
  const progressRef = useRef();

  const renderVolumeIcon = () => {
    switch (true) {
      case volume == 1:
        return "volume-lvl3";
      case volume < 1 && volume > 0.5:
        return "volume-lvl2";
      case volume < 0.5 && volume > 0:
        return "volume-lvl1";
      case volume == 0:
        return "no-volume";
      default:
        return "volume-lvl3";
    }
  };

  const handleLoop = () => {
    if (doubleLoop) {
      setLoop(false);
      setDoubleLoop(false);
    } else if (loop) {
      setDoubleLoop(true);
    } else {
      setLoop(true);
    }
  };

  const handleVolume = (e) => {
    console.log(e.target.value / 100);
    audioplayerRef.current.volume = e.target.value / 100;
    setVolume(e.target.value / 100);
  };

  const handleProgress = (e) => {
    let pos = e.clientX - e.target.offsetLeft;
    let max = e.target.offsetWidth;

    let newPos = (100 * pos) / max;

    console.log(audioplayerRef.current.duration * (newPos / 100));
    audioplayerRef.current.currentTime =
      audioplayerRef.current.duration * (newPos / 100);
    setCurrentTime({
      minutes: Math.floor(
        (audioplayerRef.current.duration * (newPos / 100)) / 60,
      ),
      seconds: Math.floor(
        (audioplayerRef.current.duration * (newPos / 100)) % 60,
      ),
    });
    // console.log((duration * 60) + );

    setProgressValue();
  };

  const playPause = () => {
    if (!audioplayerRef.current.paused) {
      audioplayerRef.current.pause();
    } else {
      audioplayerRef.current.play();
    }
    setPlay(!audioplayerRef.current.paused);
  };

  useEffect(() => {
    audioplayerRef.current.play();
    setPlay(true);
    const interval = setInterval(() => {
      let durationSeconds = audioplayerRef.current.duration;
      let currentTimeSeconds = audioplayerRef.current.currentTime;
      setDuration({
        minutes: Math.floor(durationSeconds / 60),
        seconds: Math.floor(durationSeconds % 60),
      });
      setCurrentTime({
        minutes: Math.floor(currentTimeSeconds / 60),
        seconds: Math.floor(currentTimeSeconds % 60),
      });
      setProgressValue((100 * currentTimeSeconds) / durationSeconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [audioplayerRef.current]);

  useEffect(() => {
    let tuneEnded =
      currentTime.minutes == duration.minutes &&
      currentTime.seconds == duration.seconds;

    if (!tuneEnded) return;

    if (doubleLoop) {
      audioplayerRef.current.currentTime = 0;
      console.log("doubleloop");
    }
    if (!doubleLoop && loop && currentSongIndex == songs.length) {
      console.log("no double loop, loop");

      setCurrentSongIndex(0);
    } else if (!doubleLoop && !loop && currentSongIndex < songs.length) {
      console.log("no loop");
      setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    }
  }, [currentTime]);

  useEffect(() => {
    audioplayerRef.current.volume = 0.1
    // audioplayerRef.current.play();
  }, []);

  console.log(currentSongIndex);

  return (
    <div className="audioplayer-container">

      <audio
        ref={audioplayerRef}
        src={`/Assets/Weather Channel Titles/${songs[currentSongIndex].file}`}
        controls
        volume={volume}
        loop={doubleLoop}
      ></audio>

      <div className="player">
        <div className="left-container">
          <h4>Currently playing:</h4>
          <div className="controls">
            <div
              className="previous"
              style={{
                backgroundImage: `url(/Assets/Icons/previous-button.png`,
                cursor: `${currentSongIndex == 0 ? "not-allowed" : "pointer"}`,
                opacity: `${currentSongIndex == 0 ? "0.5" : "1"}`,
              }}
              onClick={() =>
                setCurrentSongIndex((currentSongIndex - 1) % (songs.length - 1))
              }
            ></div>
            <div
              className="play"
              style={{
                backgroundImage: `url(/Assets/Icons/${play ? "pause" : "play"}-button.png`,
              }}
              onClick={() => playPause()}
            ></div>
            <div
              className="next"
              style={{
                backgroundImage: `url(/Assets/Icons/next-button.png`,
                cursor: `${currentSongIndex == songs.length - 1 && !loop ? "not-allowed" : "pointer"}`,
                opacity: `${currentSongIndex == songs.length - 1 && !loop ? "0.5" : "1"}`,
              }}
              onClick={() =>
                setCurrentSongIndex((currentSongIndex + 1) % songs.length)
              }
            ></div>
            <div
              className={`${showVolumeBar ? "bar-active" : ""} volume`}
              style={{
                backgroundImage: `url(/Assets/Icons/${renderVolumeIcon()}.png`,
              }}
              onClick={() => setShowVolumeBar(!showVolumeBar)}
            >
              {showVolumeBar && (
                <input
                  type="range"
                  onChange={(e) => handleVolume(e)}
                  id=""
                  min={0}
                  value={volume * 100}
                  max={100}
                />
              )}
            </div>
            <div
              className="loop"
              style={{
                backgroundImage: `url(/Assets/Icons/${doubleLoop ? "loop-active" : "loop"}-button.png`,
                opacity: `${loop ? "1" : "0.5"}`,
                width: "5vw",
              }}
              onClick={() => handleLoop()}
            ></div>
          </div>
          <div className="timer">
            <div className="current-time">
              {currentTime.minutes < 10 && "0"}
              {currentTime.minutes}:{currentTime.seconds < 10 && "0"}
              {currentTime.seconds}
            </div>
            /
            <div className="duration">
              {duration.minutes < 10 && "0"}
              {duration.minutes}:{duration.seconds < 10 && "0"}
              {duration.seconds}
            </div>
          </div>
        </div>
        <div className="tracker">
          <div className="player-marquee">
            <div className="marquee-container">
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
            </div>
            <div className="marquee-outline">
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
              <p>{songs[currentSongIndex].title}</p>
            </div>
          </div>
          <progress
            ref={progressRef}
            onClick={(e) => handleProgress(e)}
            max="100"
            value={progressValue}
          ></progress>
        </div>
      </div>
    </div>
  );
}
