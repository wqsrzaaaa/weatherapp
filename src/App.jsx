import React, { useState, useEffect } from "react";
import MyLoc from "./Myweather/MyLoc";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import cloudImage from './assets/cloud.png';
import rain from './assets/rain.webp'
import Clear from './assets/clear.webp'
import snow from './assets/snow.webp'
import fog from './assets/fog.webp'

const App = () => {
  const [CityName, setCityName] = useState("");
  const [Weather, setWeather] = useState(null);
  const [chartData, setChartData] = useState([]); 
  const [WeatherImg, setWeatherImg] = useState('')


 
 

  const ApiCall = async () => {
    try {
      const fetchData = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${CityName}&units=metric&appid=54155ab527fe0237fc06084e0c897daf`
      );
      const result = await fetchData.json();
     
      if (result.city) {
        setWeather({
          city: result.city.name,
          country: result.city.country,
          temp: result.list[0].main.temp,
          humidity: result.list[0].main.humidity,
          wind: result.list[0].wind.speed,
          feels_like : result.list[0].main.feels_like,
          main : result.list[0].weather[0].description,
          pressure : result.list[0].main.pressure,
          temp_max : result.list[0].main.temp_max,
          temp_min : result.list[0].main.temp_min,
          img : result.list[0].weather[0].main,
        });
      }


      if (result.list) {
        const filteredData = result.list
          .map((entry) => ({
            time: new Date(entry.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
            temp: entry.main.temp,
          }))
          .filter((item) => {
            const hour = parseInt(item.time.split(":")[0]);
            return hour >= 8 && hour <= 17;
          });

        setChartData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  
  
  
  return (
    <div className="main">
      <div id="header">
        <h2>ClimateX</h2>
        <input
          type="text"
          value={CityName}
          onChange={(e) => setCityName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ApiCall()}
          id="Input-Field"
          placeholder="Enter Your Location"
        />
      </div>
      <div id="Loc-details">
        {Weather ? (
          <>
            <MyLoc
              city={Weather.city}
              country={Weather.country}
              temp={Math.floor(Weather.temp)}
              feelsLike={Math.floor(Weather.feels_like)}
              humidity={Math.floor(Weather.humidity)}
              wind={Math.floor(Weather.wind)}
            />
          </>
        ) : (
          <p id="Para">Enter a city name and press Enter to get weather data.</p>
        )}
        {chartData.length > 0 && (
         <div id="Location-charts">
              <ResponsiveContainer width='95%' height={250}>
                <LineChart  width={650} height={250} data={chartData}>
                  <Line type="monotone" dataKey="temp" stroke="#8884d8" strokeWidth={2} dot={false} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
        </div>
      )}
      </div>
      {Weather ? (
        <>
          <div id="Extra-dets">
            <div id="Each-div">
              <img src=
              {Weather.img === "Clear"  ? Clear : 
               Weather.img === "Clouds"  ? cloudImage :
               Weather.img === "Rain" || Weather.img === "Drizzle" || Weather.img === 'Thunderstorm' ? rain : 
               Weather.img === "Snow" ? snow :
               Weather.img === "Smoke" || Weather.img === "Haze" || Weather.img === "Fog" ? fog :
               ""
               }
               alt="" />
              <h3>{ Weather.main }</h3>
            </div>
            <div id="Each-div">
              <h3>Pressure</h3>
              <p><span id="pressure">{Weather.pressure}</span> hPa </p>
            </div>
          </div>
          <div id="Extra-dets">
            <div id="Each-div">
              <h3>Min Temprature</h3>
              <p id="min-temp">{Weather.temp_min} °C</p>
            </div>
            <div id="Each-div">
              <h3>Max Temprature</h3>
              <p id="max-temp">{Weather.temp_max} °C</p>
            </div>
          </div>
        </>
      ) : ""}
    </div>
  );
};

export default App;
