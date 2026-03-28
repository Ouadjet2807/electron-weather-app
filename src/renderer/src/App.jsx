import React, { useEffect, useState } from "react";
import axios from "axios";
import Forecast from "./components/Forecast";
import { publicIp, publicIpv4, publicIpv6 } from "public-ip";
import AudioPlayer from "./components/AudioPlayer";
import CurrentTime from "./components/CurrentTime";
import Day from "./components/Day";
import Sunny from "./assets/Icons/weather_icons/Sunny.gif"
import Clear from "./assets/Icons/weather_icons/Clear.gif"
import Cloudy from "./assets/Icons/weather_icons/Cloudy.gif"
import PartlyCloudy from "./assets/Icons/weather_icons/Partly-Cloudy.gif"
import PartlyClear from "./assets/Icons/weather_icons/Partly-Clear.gif"
import BlowingSnow from "./assets/Icons/weather_icons/Blowing-Snow.gif"
import Fog from "./assets/Icons/weather_icons/Fog.gif"
import FreezingRainSleet from "./assets/Icons/weather_icons/Freezing-Rain-Sleet.gif"
import FreezingRain from "./assets/Icons/weather_icons/Freezing-Rain.gif"
import HeavySnow from "./assets/Icons/weather_icons/Heavy-Snow.gif"
import IceSnow from "./assets/Icons/weather_icons/Ice-Snow.gif"
import IsolatedTStorms from "./assets/Icons/weather_icons/Isolated-Tstorms.gif"
import LightSnow from "./assets/Icons/weather_icons/Light-Snow.gif"
import MostlyClear from "./assets/Icons/weather_icons/Mostly-Clear.gif"
import MostlyCloudy from "./assets/Icons/weather_icons/Mostly-Cloudy.gif"
import RainSnow from "./assets/Icons/weather_icons/Rain-Snow.gif"
import Rain from "./assets/Icons/weather_icons/Rain.gif"
import ScatteredShowers from "./assets/Icons/weather_icons/Scattered-Showers.gif"
import ScatteredSnowShowers from "./assets/Icons/weather_icons/Scattered-Snow-Showers.gif"
import ScatteredTStorms from "./assets/Icons/weather_icons/Scattered-Tstorms.gif"
import Showers from "./assets/Icons/weather_icons/Showers.gif"
import Sleet from "./assets/Icons/weather_icons/Sleet.gif"
import SnowSleet from "./assets/Icons/weather_icons/Snow-Sleet.gif"
import SnowToRain from "./assets/Icons/weather_icons/Snow-to-Rain.gif"
import Thunder from "./assets/Icons/weather_icons/Thunder.gif"
import Thunderstorm from "./assets/Icons/weather_icons/Thunderstorms.gif"
import Windy from "./assets/Icons/weather_icons/Windy.gif"
import WintryMix from "./assets/Icons/weather_icons/Wintry-Mix.gif"
import CloudOne from "./assets/Icons/cloud_1.png"
import CloudTwo from "./assets/Icons/cloud_2.png"
import CloudThree from "./assets/Icons/cloud_3.png"
import Logo from "./assets/logo.png"





export default function App() {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState();
  const [title, setTitle] = useState([]);
  const [timeOfDay, setTimeOfDay] = useState("day");
  const [hour, setHour] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null)
  

  const renderStars = () => {

    let divs = []

     for (let i = 1; i < Math.round(Math.random() * (200 - 150) + 150); i++) {
      let width = Math.round(Math.random() * (0.6 - 0.3)) + 0.3;
      let height = width;
      let top = Math.round(Math.random() * window.innerHeight) - height;
      let left = Math.round(Math.random() * (window.innerWidth - width));
      let opacity = Math.random() * (1 - 0.8) + 0.8;  
      let brightness = Math.random() * (5 - 1) + 1;
       let animation_delay = Math.random() * (0.5- 0.1) + 0.1;
       let animation_duration = Math.random() * (3 - 1) + 1;


      let star = {
        width: width,
        height: height,
        top: top,
        left: left,
        opacity: opacity,
        brightness: brightness,
        animation_delay: animation_delay,
        animation_duration: animation_duration
      };
      divs.push(star);
    }

    return divs.map((star) => {
      return (
        <div
          className="star"
          style={{
            width: `${star.width}vw`,
            height: `${star.height}vw`,
            top: `${star.top}px`,
            left: `${star.left}px`,
            filter: `brightness(${star.brightness})`,
            opacity: star.opacity,
            animationDelay: `${star.animation_delay}s`,
            animationDuration: `${star.animation_duration}s`,
          }}
        ></div>
      );
    });

  }

  const renderClouds = () => {

    let divs = [];

    const clouds = [CloudOne, CloudTwo, CloudThree]

    let cloud_number = weatherData.current.cloud;
    let wind_speed = weatherData.current.wind_kph;
    let saturation = 0;

    switch (true) {
      case hour >= 18 && hour < 22:
        saturation = saturation = 1 / (hour / 10);
        break;
      case hour >= 9 && hour < 18:
        saturation = 0;
        break;
      case hour > 5 && hour < 9:
        saturation = 1 / (hour / 10);
        break;
      default:
        saturation = 0;
    }

    for (let i = 1; i < cloud_number; i++) {
      let width = Math.round(Math.random() * (60 - 15)) + 15;
      let height = Math.round(Math.random() * (20 - 8)) + 8;
      let top = Math.round(Math.random() * window.innerHeight) - height;
      let left = Math.round(Math.random() * (window.innerWidth - width));
      let opacity = Math.random() * (0.5 - 0) + 0;
      let brightness = Math.random() * (5 - 1) + 1;
      let animation_duration =
        (Math.random() * (30 - 5) + 5) / (wind_speed / 10);

      let cloud = {
        width: width,
        height: height,
        top: top,
        left: left,
        opacity: opacity,
        brightness: brightness,
        animation_duration: animation_duration,
        animation_name: weatherData.current.wind_dir == "W" ? "wind_w" : "wind_e"
      };
      divs.push(cloud);
    }

    return divs.map((cloud) => {
      return (
        <img
          className="cloud"
          style={{
            width: `${cloud.width}vw`,
            height: `${cloud.height}vw`,
            top: `${cloud.top}px`,
            left: `${cloud.left}px`,
            animationDuration: `${cloud.animation_duration}s`,
            filter: `brightness(${cloud.brightness}) saturate(${saturation})`,
            opacity: cloud.opacity,
            animationName: cloud.animation_name
          }}
          src={clouds[Math.round(Math.random() * (2 - 0)) + 0]}
        ></img>
      );
    });
  };

  const renderIcon = (code, is_day) => {


    switch (true) {
      case code == 1000 && (is_day == null || is_day == 1):
          return Sunny;
      case code == 1000 && is_day == 0:
        return  Clear
      case code == 1003 && (is_day == null || is_day == 1):
        return PartlyCloudy
      case code == 1003 && is_day == 0:
        return MostlyClear
      case code == 1006:
        return Cloudy
      case code == 1009 && (is_day == null || is_day == 1):
        return MostlyCloudy
      case code == 1009 && is_day == 0:
        return PartlyClear
      case code == 1030:
      case code == 1063:
      case code == 1180:
      case code == 1240:
      case code == 1186:
        return ScatteredShowers
      case code == 1066:
      case code == 1210:
        return ScatteredSnowShowers
      case code == 1069:
      case code == 1237:
        return SnowSleet
      case code == 1072:
      case code == 1087:
      case code == 1114:
      case code == 1117:
        return BlowingSnow
      case code == 1135:
        return Fog
      case code == 1147:
      case code == 1150:
      case code == 1189:
        return Showers
      case code == 1153:
      case code == 1168:
      case code == 1198:
        return FreezingRain
      case code == 1171:
      case code == 1183:
      case code == 1192:
      case code == 1195:
      case code == 1243:
      case code == 1246:
        return Rain
      case code == 1201:
      case code == 1204:
      case code == 1207:
      case code == 1252:
      case code == 1264:
        return FreezingRainSleet

      case code == 1213:
        return LightSnow
      case code == 1216:
      case code == 1219:
      case code == 1222:
      case code == 1225:
        return HeavySnow
      case code == 1249:
      case code == 1261:
        return Sleet
      case code == 1255:
        return RainSnow
      case code == 1258:
        return WintryMix
      case code == 1273:
        return IsolatedTStorms
      case code == 1276:
        return ScatteredTStorms
      case code == 1279:
      case code == 1282:
        return ThunderSnow
    }
  };

  useEffect(() => {
    setHour(new Date().toTimeString().slice(0,2))
    const getLocation = async () => {
      const IP = await publicIpv4();

      try {
        const response = await axios.get(`http://ip-api.com/json/${IP}`);
        return response.data.city;
      } catch (error) {
        console.log(error);
      }
    };
    const fetchWeatherData = async () => {
      const city = await getLocation();
      // let city = "Giromagny"
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=ad411884f54a440c90c120644262103&q=${city}&days=3`,
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchWeatherData();
  }, []);

  useEffect(() => {
    if (Object.keys(weatherData).length == 0) return;
    setTitle([]);
    let titleStr = ` ${weatherData.location.name}, ${weatherData.location.region} - ${weatherData.location.country} | `;
    for (let i = 0; i < 10; i++) {
      setTitle((prev) => [...prev, titleStr]);
    }
  }, [weatherData]);

  useEffect(() => {

    switch (true) {
      case hour >= 22 && hour < 24:
      case hour >= 0 && hour < 5:
        setTimeOfDay("night");
        return;
      case hour >= 18 && hour < 22:
        setTimeOfDay("evening");
        return;
      case hour >= 9 && hour < 18:
        setTimeOfDay("day");
        return;
      case hour >= 5 && hour < 9:
        setTimeOfDay("morning");
        return;
      default:
        setTimeOfDay("day");
        return;
    }
  }, [hour]);

    useEffect(() => {
    const interval = setInterval(() => {
      setHour(new Date().toTimeString().slice(0,2))
    }, 3600000);
    return () => {
      clearInterval(interval);
    };
  }, [hour]);

  useEffect(() => {

    if (timeOfDay == "morning") {
      document.querySelector("body").style.background =
        `linear-gradient(0deg, #ff006b7d ${hour}%, #ff440087 ${hour * 3}%, #0000ff8f ${Math.pow(hour, 2)}%)`;
    } else if (timeOfDay == "day") {
      document.querySelector("body").style.background =
        `linear-gradient(0deg, #5f7efa8f ${hour}%, #4800ff8f ${hour * 3}%, #004dffab ${Math.pow(hour, 2) / 2.5}%)`;
    } else if (timeOfDay == "evening") {
        document.querySelector("body").style.background =
          `linear-gradient(0deg, #ff008b9e ${24-hour}%, #a400ffa1 ${(24-hour) * 3}%, #1f00ff8f ${Math.pow(hour, 2) / 3}%)`;
        } else if (hour < 22 && timeOfDay == "night") {
        document.querySelector("body").style.background =
          `linear-gradient(0deg, #0a005a8f ${15 + Math.pow(hour, 2)}%, #1600428f ${30 + Math.pow(hour, 2)}%, #1e00f28f ${90 + (hour * 2)}%)`;
    } else {
             document.querySelector("body").style.background =
          `linear-gradient(0deg, #0a005a8f ${24-hour}%, #1600428f ${(24-hour) * 3}%, #1e00f28f ${80 + Math.sqrt(hour)}%)`;
    }
  }, [timeOfDay, hour]);

  

  return (
    <div className="app">
      {!loading ? (
        <>
          <div className="clouds">{renderClouds()}</div>
          <div className="stars" style={{opacity: `${timeOfDay == 'day' ? 0 : (timeOfDay !== 'day' && (hour > 10 && hour < 24)) ? (0.2 * (hour / 10)) : (1 / hour)}`}}>{renderStars()}</div>
          <div className="header">
            <img
              className="logo"
              src={Logo}
              alt=""
            />
            <div className="title">
              {title.length > 0 && (
                <>
                  <div className="marquee">
                    {title.map((text) => {
                      return <h2>{text}</h2>;
                    })}
                  </div>
                  <div className="outline">
                    {title.map((text) => {
                      return <h2>{text}</h2>;
                    })}
                  </div>
                </>
              )}
            </div>
            <div className="datetime">
              <div className="datetime-text">
                <CurrentTime outline={false} />
                <h3 className="date">
                  {new Date().toDateString().slice(0, 10)}
                </h3>
              </div>
              <div className="datetime-outline">
                <CurrentTime outline={true} />
                <h3 className="date-outline">
                  {new Date().toDateString().slice(0, 10)}
                </h3>
              </div>
            </div>
          </div>
          {selectedDay == null ? 
          <Forecast data={weatherData.forecast} setSelectedDay={setSelectedDay} renderIcon={renderIcon}/>

          :

          <Day current={weatherData.current} hours={weatherData.forecast.forecastday[selectedDay]} renderIcon={renderIcon} setSelectedDay={setSelectedDay}/>
          }
          <AudioPlayer />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
