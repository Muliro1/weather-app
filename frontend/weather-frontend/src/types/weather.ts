export interface WeatherData {
    location: string;
    date: string;
    temperature: number;
    description: string;
    icon: string;
    windSpeed: number;
    humidity: number;
  }
  
  export interface ForecastData {
    date: string;
    temperature: {
      min: number;
      max: number;
    };
    description: string;
    icon: string;
  }
  
  export interface WeatherResponse {
    current: WeatherData;
    forecast: ForecastData[];
  }
  
  export interface GeocodingResponse {
    results: {
      formatted_address: string;
      geometry: {
        location: {
          lat: number;
          lng: number;
        };
      };
    }[];
  }
  