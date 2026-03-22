import React, { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {

    const [currentSongIndex, setCurrentSongIndex] = useState(0)

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

  useEffect(() => {
        audioplayerRef.current.play()
  }, [audioplayerRef.current])

  return (
    <div className="audioplayer-container">
      <audio ref={audioplayerRef} src={`/Assets/Weather Channel Titles/${songs[currentSongIndex].file}`} controls></audio>
      <div className="controls"></div>
    </div>
  );
}
