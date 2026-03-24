import React, { useEffect, useState } from "react";

export default function Forecast({ data, loading, setSelectedDay , renderIcon}) {
  const icons = [
    { name: "Cloudy", file: "../Assets/1992 EF/Cloudy.gif" },
    { name: "Fog", file: "../Assets/1992 EF/Fog.gif" },
    { name: "Freezing Rain", file: "../Assets/1992 EF/Freezing-Rain.gif" },
    { name: "Heavy Snow", file: "../Assets/1992 EF/Heavy-Snow.gif" },
    {
      name: "Isolated Tstorms",
      file: "../Assets/1992 EF/Isolated-Tstorms.gif",
    },
    { name: "Light Snow", file: "../Assets/1992 EF/Light-Snow.gif" },
    { name: "Mostly Cloudy", file: "../Assets/1992 EF/Mostly-Cloudy.gif" },
    { name: "Partly Cloudy", file: "../Assets/1992 EF/Partly-Cloudy.gif" },
    { name: "Rain Snow", file: "../Assets/1992 EF/Rain-Snow.gif" },
    { name: "Rain", file: "../Assets/1992 EF/Rain.gif" },
    {
      name: "Scattered Showers",
      file: "../Assets/1992 EF/Scattered-Showers.gif",
    },
    {
      name: "Scattered Snow Showers",
      file: "../Assets/1992 EF/Scattered-Snow-Showers.gif",
    },
    {
      name: "Scattered-Tstorms",
      file: "../Assets/1992 EF/Scattered-Tstorms.gif",
    },
    { name: "Showers", file: "../Assets/1992 EF/Showers.gif" },
    { name: "Snow to Rain", file: "../Assets/1992 EF/Snow-to-Rain.gif" },
    { name: "Sunny", file: "../Assets/1992 EF/Sunny.gif" },
    { name: "Thunderstorms", file: "../Assets/1992 EF/Thunderstorms.gif" },
    { name: "Thunderstorms", file: "../Assets/1992 EF/Thunder.gif" },
    { name: "Thunder Snow", file: "../Assets/1992 EF/ThunderSnow.gif" },
    { name: "Windy", file: "../Assets/1992 EF/Windy.gif" },
    { name: "Wintry Mix", file: "../Assets/1992 EF/Wintry-Mix.gif" },
  ];

  

  return (
    <div className="forecast-container">
      {!loading &&
        data.forecastday.map((day, index) => {
          return (
            <div className="day" onClick={() => setSelectedDay(index)}>
              <div className="day-date">
                <h2>{new Date(day.date).toDateString().slice(0, 4)}</h2>
                <h2 className="h2-outline">
                  {new Date(day.date).toDateString().slice(0, 4)}
                </h2>
              </div>
              <div className="icon">
                <img
                  src={`../Assets/Icons/weather_icons/${renderIcon(day.day.condition.code, null)}.gif`}
                />
              </div>
              <div className="condition">
                <h2>{day.day.condition.text}</h2>
              </div>
              <div className="temperatures">
                <div className="lo">
                  <h3>Lo</h3>
                  <h2>{Math.round(day.day.mintemp_c)}</h2>
                </div>
                <div className="hi">
                  <h3>Hi</h3>
                  <h2>{Math.round(day.day.maxtemp_c)}</h2>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
