import { useState, useEffect } from 'react';
import { fetchWeatherData } from '../lib/api';
import { WeatherResponse } from '../types/weather';

const useWeather = (city: string, unit: 'metric' | 'imperial') => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    const getWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(city, unit);
        setWeatherData(data);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [city, unit]);

  return { weatherData, loading, error };
};

export default useWeather;
