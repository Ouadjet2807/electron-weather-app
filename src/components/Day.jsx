import React from "react";

export default function Day({ current, hours, renderIcon, setSelectedDay }) {
  console.log(hours);

  return (
    <div className="day-container">
      <div className="current-weather">
        <div className="header">
          <button className="back" onClick={() => setSelectedDay(null)}>
            {" "}
            <div className="text">Retour</div>{" "}
            <div className="outline">Retour</div>
          </button>
          <div className="date">
            <h2>
              {new Date(current.last_updated).toDateString().slice(0, 10)}
            </h2>
            <h2 className="h2-outline">
              {new Date(current.last_updated).toDateString().slice(0, 10)}
            </h2>
          </div>
        </div>
          <div div className="icon-current">
            <div className="icon">
              <img
                src={`../Assets/Icons/weather_icons/${renderIcon(current.condition.code, current.is_day)}.gif`}
              />
            </div>
          </div>
        <div className="condition"><h2>{current.condition.text}</h2></div>
        <div className="temp_plus_wind">
          <h2 className="temp">{current.temp_c}°</h2>
          <h2 className="wind">{current.wind_kph}km/h</h2>
        </div>
      </div>
      <div className="hours">
        <div className="half">
          {hours.hour
            .sort((a, b) => a.time - b.time)
            .toSpliced(12, 23)
            .map((h) => {
              return (
                <div className="hour">
                  <div className="time">
                    <div className="text">{h.time.slice(11, 16)}</div>
                    <div className="outline">{h.time.slice(11, 16)}</div>
                  </div>
                  <div className="temp">
                    <div className="text">{h.temp_c}°</div>
                    <div className="outline">{h.temp_c}°</div>
                  </div>
                  <div className="icon">
                    <img
                      src={`../Assets/Icons/weather_icons/${renderIcon(h.condition.code, h.is_day)}.gif`}
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="half">
          {hours.hour
            .sort((a, b) => a.time - b.time)
            .toSpliced(0, 12)
            .map((h) => {
              return (
                <div className="hour">
                  <div className="time">
                    <div className="text">{h.time.slice(11, 16)}</div>
                    <div className="outline">{h.time.slice(11, 16)}</div>
                  </div>
                  <div className="temp">
                    <div className="text">{h.temp_c}°</div>
                    <div className="outline">{h.temp_c}°</div>
                  </div>
                  <div className="icon">
                    <img
                      src={`../Assets/Icons/weather_icons/${renderIcon(h.condition.code, h.is_day)}.gif`}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
