import { WeatherResponse } from '../types/weather';

export async function fetchWeatherData(city: string, unit: 'metric' | 'imperial'): Promise<WeatherResponse> {
  const res = await fetch(
    `http://localhost:8000/api/weather?city=${encodeURIComponent(city)}&unit=${unit}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return res.json();
}