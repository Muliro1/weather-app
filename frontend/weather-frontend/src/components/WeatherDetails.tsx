import React from 'react';
import { WeatherData } from '../types/weather';

interface WeatherDetailsProps {
  weather: WeatherData | null;
  unit: 'C' | 'F';
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather, unit }) => {
  if (!weather) {
    return <div>No weather data available.</div>;
  }

  const temperature = unit === 'C' ? weather.temperature : weather.temperature;
  const date = new Date(weather.date).toLocaleDateString();

  return (
    <div className="weather-details">
      <h2>{weather.location}</h2>
      <p>{date}</p>
      <p className="temperature">{temperature}°{unit}</p>
      <p className="description">{weather.description}</p>
      <img src={weather.icon} alt={weather.description} />
    </div>
  );
};

export default WeatherDetails;
