import React from 'react';
import { WeatherData } from "../types/weather";

interface WindHumidityProps {
  windSpeed: number;
  humidity: number;
  weather: WeatherData;
}

const WindHumidity: React.FC<WindHumidityProps> = ({ windSpeed, humidity }) => {
  return (
    <div className="flex flex-col items-center sm:flex-row justify-between w-full p-4 bg-gray-100 rounded shadow">
      <div className="flex items-center">
        <span className="font-semibold">Wind Speed:</span>
        <span className="ml-2">{windSpeed} m/s</span>
      </div>
      <div className="flex items-center mt-2 sm:mt-0">
        <span className="font-semibold">Humidity:</span>
        <span className="ml-2">{humidity}%</span>
      </div>
    </div>
  );
};

export default WindHumidity;
