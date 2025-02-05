import { ForecastData } from '../types/forecast';
import { WeatherData } from '../types/weather';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastBaseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

export async function fetchWeather(
  city: string = 'London,uk'
): Promise<WeatherData> {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Missing OpenWeatherMap API key. Please set VITE_OPENWEATHER_API_KEY in your .env file.'
    );
  }
  const url = `${baseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch weather data for ${city}: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data as WeatherData;
}

export async function fetchWeatherByCoords(
  lat: number,
  lon: number
): Promise<WeatherData> {
  if (!apiKey) {
    throw new Error(
      'Missing OpenWeatherMap API key. Please set VITE_OPENWEATHER_API_KEY in your .env file.'
    );
  }

  const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch weather data for coordinates [${lat}, ${lon}]: ${response.statusText}`
    );
  }
  const data = await response.json();
  return data as WeatherData;
}

export async function fetchForecast(city: string): Promise<ForecastData> {
  if (!apiKey) {
    throw new Error(
      'Missing OpenWeatherMap API key. Please set VITE_OPENWEATHER_API_KEY in your .env file.'
    );
  }
  const url = `${forecastBaseUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch forecast data for ${city}: ${response.statusText}`
    );
  }
  const data = await response.json();

  console.log(data);
  return data as ForecastData;
}
