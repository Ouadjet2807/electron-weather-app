import React, { useEffect, useState } from "react";

export default function Forecast({ data, loading }) {
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

  const renderIcon = (code) => {
    // console.log(code);

    switch (code) {
      case 1000:
        return "Sunny";
      case 1003:
        return "Partly-Cloudy";
      case 1006:
        return "Cloudy";
      case 1009:
      case 1030:
      case 1063:
        return "Scattered-Showers";
      case 1066:
      case 1069:
      case 1072:
      case 1087:
      case 1114:
      case 1117:
      case 1135:
      case 1147:
      case 1150:
      case 1153:
      case 1168:
      case 1171:
      case 1180:
      case 1183:
      case 1186:
      case 1189:
      case 1192:
      case 1195:
      case 1198:
      case 1201:
      case 1204:
      case 1207:
      case 1210:
      case 1213:
      case 1216:
      case 1219:
      case 1222:
      case 1225:
      case 1237:
      case 1240:
      case 1243:
      case 1246:
      case 1249:
      case 1252:
      case 1255:
      case 1258:
      case 1261:
      case 1264:
      case 1273:
      case 1276:
      case 1279:
      case 1282:
        return "ThunderSnow";
    }
  };


  return (
    <div className="forecast-container">
      {!loading &&
        data.forecastday.map((day) => {
          return (
            <div className="day">
              <div className="day-date">
                <h2>{new Date(day.date).toDateString().slice(0, 4)}</h2>
                <h2 className="h2-outline">
                  {new Date(day.date).toDateString().slice(0, 4)}
                </h2>
              </div>
              <div className="icon">
                <img
                  src={`../Assets/Icons/weather_icons/${renderIcon(day.day.condition.code)}.gif`}
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
