// index.tsx
"use client";

const API_KEY = process.env.NEXT_PUBLIC_GEO_CODING_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log(API_URL, API_KEY);

import React, { useState } from 'react';

type WeatherData = {
  current: {
    temp: number;
    description: string;
    icon: string;
    wind: number;
    humidity: number;
    date: string;
    location: string;
  };
  forecast: Array<{
    date: string;
    temp: number;
    icon: string;
    description: string;
  }>;
};

export default function Home() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const query = `${city}, ${country}`;
      // 1. Geocode city name to lat/lon
      const geoRes = await fetch(
        `http://localhost:8000/api/weather/location?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&key=71ae855422498ce6949df8b983eb0a90`
      );
      const geoData = await geoRes.json();
      if (!Array.isArray(geoData) || geoData.length === 0) throw new Error('City not found');
      const { lat, lon } = geoData[0];

      // 2. Fetch weather from your backend
      const weatherRes = await fetch(
        `http://localhost:8000/api/weather?lat=${lat}&lon=${lon}&key=71ae855422498ce6949df8b983eb0a90`
      );
      const weatherJson = await weatherRes.json();
      setWeather(weatherJson);
    } catch (e: any) {
      setError(e.message || 'Error fetching weather');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h1>Weather App</h1>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter country code"
          value={country}
          onChange={e => setCountry(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          Search
        </button>
        <select value={unit} onChange={e => setUnit(e.target.value as 'metric' | 'imperial')}>
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
        </select>
      </div>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {loading && <div>Loading...</div>}
      {weather && (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img src={weather.current.icon} alt="Weather icon" width={64} />
            <div>
              <div style={{ fontSize: 32 }}>
                {weather.current.temp}°{unit === 'metric' ? 'C' : 'F'}
              </div>
              <div>{weather.current.description}</div>
              <div>
                {weather.current.date} - {weather.current.location}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <strong>Next 3 days:</strong>
            <div style={{ display: 'flex', gap: 16 }}>
              {weather.forecast.slice(0, 3).map(day => (
                <div key={day.date} style={{ textAlign: 'center' }}>
                  <div>{day.date}</div>
                  <img src={day.icon} alt="icon" width={48} />
                  <div>
                    {day.temp}°{unit === 'metric' ? 'C' : 'F'}
                  </div>
                  <div>{day.description}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div>Wind: {weather.current.wind} m/s</div>
            <div>Humidity: {weather.current.humidity}%</div>
          </div>
        </div>
      )}
    </div>
  );
}