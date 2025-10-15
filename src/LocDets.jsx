import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import MyLoc from "./Myweather/MyLoc";

const LocDets = ({Weather , chartData}) => {

    const [WeatherImg, setWeatherImg] = useState('')

  return (
    <div id="Loc-details" className='w-full mt-10 justify-evenly flex flex-wrap gap-5 items-center '>
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
              <p className='w-full h-screen flex !p-6 items-center justify-center text-white'>Enter a city name and press Enter to get weather data.</p>
            )}
            {chartData.length > 0 && (
             <div className='lg:w-1/2 w-full h-fit rounded-xl bg-zinc-900'>
                  <ResponsiveContainer width='95%' height={280}>
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
  )
}

export default LocDets