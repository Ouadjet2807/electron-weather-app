import React, { useEffect, useRef, useState } from "react";
import PlayButton from "../assets/Icons/play-button.png"
import PauseButton from "../assets/Icons/pause-button.png"
import NextButton from "../assets/Icons/next-button.png"
import PreviousButton from "../assets/Icons/previous-button.png"
import LoopButton from "../assets/Icons/loop-button.png"
import LoopActiveButton from "../assets/Icons/loop-active-button.png"
import NoVolumeButton from "../assets/Icons/no-volume.png"
import VolumeOneButton from "../assets/Icons/volume-lvl1.png"
import VolumeTwoButton from "../assets/Icons/volume-lvl2.png"
import VolumeThreeButton from "../assets/Icons/volume-lvl3.png"
import CorpTomorrowsForecast from "../assets/Weather Channel Titles/Alternate_Skies_Corp_Tomorrow_s_Forecast.mp3"
import WhereTheWeekAhead from "../assets/Weather Channel Titles/Alternate_Skies_Where_s_The_Week_Ahead.mp3"
import EuropeanPartners from "../assets/Weather Channel Titles/Colin_Kiddy_European_Partners_De_Wolfe_Music.mp3"
import DopplerRadar from "../assets/Weather Channel Titles/D0ppler_Radar.mp3"
import WhatIsYourDream from "../assets/Weather Channel Titles/Mabisyo_What_Is_Your_Dream.mp3"
import NewDevelopment from "../assets/Weather Channel Titles/New_Development.mp3"
import ReflectionsInTime from "../assets/Weather Channel Titles/Trammell_Starks_Reflections_In_Time_WeatherscanRemastered.mp3"
import WhereAreYouNow from "../assets/Weather Channel Titles/Where_Are_You_Now.mp3"


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
      file: CorpTomorrowsForecast,
    },
    {
      title: "Alternate Skies - Where's The Week Ahead",
      file: WhereTheWeekAhead,
    },
    {
      title: "Colin Kiddy - European Partners De Wolfe Music",
      file: EuropeanPartners,
    },
    {
      title: "D0ppler Radar 夕暮れ",
      file: DopplerRadar,
    },
    {
      title: "Mabisyo - What Is Your Dream",
      file: WhatIsYourDream,
    },
    {
      title: "New Development",
      file: NewDevelopment,
    },
    {
      title: "Trammell Starks - Reflections In Time",
      file: ReflectionsInTime,
    },
    {
      title: "Where Are You Now",
      file: WhereAreYouNow,
    },
  ];

  const audioplayerRef = useRef();
  const progressRef = useRef();

  const closeVolumeBar = (e) => {
    console.log(e);
    
    if(!showVolumeBar) return 

    console.log(showVolumeBar);
    
    setShowVolumeBar(false)
  }

  const handleVolumeBar = (e) => {
    e.stopPropagation()
    console.log("change");
    
    if (showVolumeBar && volume > 0) {
      audioplayerRef.current.volume = 0;
      setVolume(0);
      setShowVolumeBar(false);
    } else if (showVolumeBar && volume == 0) {
      audioplayerRef.current.volume = 0.5;
      setVolume(0.5);
      setShowVolumeBar(false);
    } else {
      setShowVolumeBar(true)
    }
  };

  const renderVolumeIcon = () => {
    switch (true) {
      case volume == 1:
        return VolumeOneButton;
      case volume < 1 && volume > 0.5:
        return VolumeTwoButton;
      case volume < 0.5 && volume > 0:
        return VolumeOneButton;
      case volume == 0:
        return NoVolumeButton;
      default:
        return VolumeThreeButton;
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
    e.stopPropagation()
    console.log(e.target.value / 100);
    audioplayerRef.current.volume = e.target.value / 100;
    setVolume(e.target.value / 100);
  };

  const handleProgress = (e) => {
    let pos = e.clientX - e.target.offsetLeft;
    let max = e.target.offsetWidth;

    let newPos = (100 * pos) / max;

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
    }
    if (!doubleLoop && loop && currentSongIndex == songs.length) {
      setCurrentSongIndex(0);
    } else if (!doubleLoop && currentSongIndex < songs.length) {
      setCurrentSongIndex((currentSongIndex + 1) % songs.length);
    }
  }, [currentTime]);

  useEffect(() => {
    audioplayerRef.current.play();
  }, [currentSongIndex]);

  useEffect(() => {
    audioplayerRef.current.volume = 0.1;
  }, []);

  return (
    <div className="audioplayer-container" onClick={(e) => closeVolumeBar(e)} >
      <audio
        ref={audioplayerRef}
        src={songs[currentSongIndex].file}
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
                backgroundImage: `url(${PreviousButton})`,
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
                backgroundImage: `url(${play ? PauseButton : PlayButton})`,
              }}
              onClick={() => playPause()}
            ></div>
            <div
              className="next"
              style={{
                backgroundImage: `url(${NextButton})`,
                cursor: `${currentSongIndex == songs.length - 1 && !loop ? "not-allowed" : "pointer"}`,
                opacity: `${currentSongIndex == songs.length - 1 && !loop ? "0.5" : "1"}`,
              }}
              onClick={() =>
                setCurrentSongIndex((currentSongIndex + 1) % songs.length)
              }
            ></div>
            <div
              className={`${showVolumeBar ? "bar-active" : ""} volume`}
              
            >
              <div className="volume-icon" style={{
                backgroundImage: `url(${renderVolumeIcon()})`,
              }} onClick={(e) => handleVolumeBar(e)}></div>
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
                backgroundImage: `url(${doubleLoop ? LoopActiveButton : LoopButton})`,
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
