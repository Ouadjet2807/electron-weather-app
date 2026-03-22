import React, { useEffect, useState } from "react";
import axios from "axios";
import Forecast from "./components/Forecast";
import { publicIp, publicIpv4, publicIpv6 } from "public-ip";

export default function App() {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState();

  const success = (pos) => {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  };

  useEffect(() => {
    console.log(navigator.geolocation.getCurrentPosition(success));
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString().slice(0, 10));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const getLocation = async () => {
    const IP = await publicIpv4()

    try {
        const response = await axios.get(`http://ip-api.com/json/${IP}`)
        return response.data.city
    }
    catch (error) {
        console.log(error);
    }

    }
    const fetchWeatherData = async () => {

      const city = await getLocation()
      console.log(city);

      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=ad411884f54a440c90c120644262103&q=${city}&days=3`,
        );
        setWeatherData(response.data);
        setLoading(false);
        // temperatureValue.innerText = response.data.current.temp_c
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchWeatherData();
  }, []);

  console.log(weatherData);

  return (
    <div>
      {!loading ? (
        <>
          <div className="header">
            <img
              className="logo"
              src="/Assets/The_Weather_Channel-Logo.png"
              alt=""
            />
            <div className="title">
              <h2>
                {weatherData.location.name} - {weatherData.location.region} -{" "}
                {""}
                {weatherData.location.country}
              </h2>
            </div>
            <div className="datetime">
              <h3 className="time">{currentTime}</h3>
              <h3 className="date">
                {new Date().toDateString().slice(0, 10)}
              </h3>
            </div>
          </div>
          <Forecast data={weatherData.forecast} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
