import { WeatherData } from '../types/weather';

export async function fetchWeather(
  city: string = 'London,uk'
): Promise<WeatherData> {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Missing OpenWeatherMap API key. Please set VITE_OPENWEATHER_API_KEY in your .env file.'
    );
  }

  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
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
