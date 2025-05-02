import React from 'react';

interface WeatherIconProps {
  icon: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ icon }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return <img src={iconUrl} alt="Weather Icon" className="w-16 h-16" />;
};

export default WeatherIcon;
