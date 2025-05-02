import { useState } from "react";

interface SearchBoxProps {
  onSearch: (city: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [city, setCity] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="border rounded p-2"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white rounded p-2">
        Search
      </button>
    </form>
  );
};

export default SearchBox;