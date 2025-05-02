"use client";

import { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import WeatherDetails from "../components/WeatherDetails";
import Forecast from "../components/Forecast";
import WindHumidity from "../components/WindHumidity";
import TemperatureToggle from "../components/TemperatureToggle";
import useWeather from "../hooks/useWeather";
export default function Home() {
  const { weatherData, loading, error } = useWeather("London", "metric");
  const [unit, setUnit] = useState("Celsius");

  const handleUnitToggle = () => {
    setUnit((prevUnit) => (prevUnit === "Celsius" ? "Fahrenheit" : "Celsius"));
  };

  useEffect(() => {
    if (weatherData) {
      // No need to fetch weather again since we already have the data
      // This was causing an infinite loop
    }
  }, [weatherData]);

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold">Weather App</h1>
      <SearchBox onSearch={() => {}} />
      <TemperatureToggle onToggle={handleUnitToggle} />
      {weatherData && (
        <>
          <WeatherDetails weather={weatherData.current} unit={unit === "Celsius" ? "C" : "F"} />
          <WindHumidity weather={weatherData.current} windSpeed={0} humidity={0} />
          <Forecast forecast={weatherData.forecast} />
        </>
      )}
    </div>
  );
}