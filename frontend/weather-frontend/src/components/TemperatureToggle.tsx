import { useState } from "react";

interface TemperatureToggleProps {
  onToggle: (isCelsius: boolean) => void;
}

const TemperatureToggle = ({ onToggle }: TemperatureToggleProps) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const handleToggle = () => {
    setIsCelsius(!isCelsius);
    onToggle(!isCelsius);
  };

  return (
    <div className="flex items-center">
      <span className="mr-2">{isCelsius ? "°C" : "°F"}</span>
      <button
        onClick={handleToggle}
        className="rounded-full border border-solid border-gray-300 p-2 transition-colors hover:bg-gray-200"
      >
        Toggle
      </button>
    </div>
  );
};

export default TemperatureToggle;