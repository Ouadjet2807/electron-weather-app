import React, { use, useEffect, useState } from "react";

export default function Forecast({
  data,
  loading,
  setSelectedDay,
  renderIcon,
}) {

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
                {day.day.maxwind_kph > 25 && (
                  <div className="windy">
                    <img src={"../Assets/Icons/weather_icons/Windy.gif"} />
                  </div>
                )}
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
