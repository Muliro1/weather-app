import { WeatherResponse } from '../types/weather';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchWeatherData(city: string, unit: 'metric' | 'imperial'): Promise<WeatherResponse> {
  const res = await fetch(
    `${API_URL}/weather?city=${encodeURIComponent(city)}&unit=${unit}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return res.json();
}
