import React from 'react';
import { ForecastData } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface ForecastProps {
  forecast: ForecastData[];
}

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  return (
    <div className="forecast-container">
      <h2 className="text-lg font-bold">3-Day Weather Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item p-4 border rounded shadow">
            <h3 className="font-semibold">{day.date}</h3>
            <WeatherIcon icon={day.icon} />
            <p className="text-xl">{day.temperature.min}° / {day.temperature.max}°</p>
            <p className="text-sm">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
