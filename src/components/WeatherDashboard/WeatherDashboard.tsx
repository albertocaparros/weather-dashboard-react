import React, { useEffect, useState } from 'react';
import WeatherCard from '../WeatherCard';
import {
  fetchForecast,
  fetchWeather,
  fetchWeatherByCoords,
} from '../../services/weatherService';
import { WeatherData } from '../../types/weather';
import styles from './WeatherDashboard.module.css';
import { getFavoriteCities, saveFavoriteCities } from '../../utils/favorites';
import { ForecastData } from '../../types/forecast';
import Forecast from '../Forecast';

const WeatherDashboard: React.FC = () => {
  const [city, setCity] = useState<string>('London,uk');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavoriteCities());
  }, []);

  const handleAddFavorite = () => {
    const newFavorite = weatherData?.name + ', ' + weatherData?.sys.country;

    if (!favorites.includes(newFavorite) && weatherData) {
      const newFavorite = weatherData?.name + ', ' + weatherData?.sys.country;

      const updatedFavorites = [...favorites, newFavorite];
      setFavorites(updatedFavorites);
      saveFavoriteCities(updatedFavorites);
    }
  };

  const handleFavoriteClick = (favCity: string) => {
    handleFetchWeather(favCity);
  };

  const handleFetchWeather = async (cityname: string) => {
    const cityToFetch = cityname ?? city;

    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(cityToFetch);
      setWeatherData(data);

      const forecast = await fetchForecast(cityToFetch);
      setForecastData(forecast);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCoords(lat, lon);
      setWeatherData(data);

      const forecast = await fetchForecast(data.name);
      setForecastData(forecast);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleFetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unable to retrieve your location.');
        }
        setLoading(false);
      }
    );
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFetchWeather(city);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Get Weather
        </button>
      </form>
      <button
        type="button"
        onClick={handleUseMyLocation}
        className={styles.button}
        style={{ marginLeft: '0.5rem' }}
      >
        Use My Location
      </button>
      <button
        type="button"
        onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
        className={styles.button}
        style={{ marginLeft: '0.5rem' }}
      >
        Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </button>
      <button
        type="button"
        onClick={handleAddFavorite}
        className={styles.button}
        style={{ marginLeft: '0.5rem' }}
      >
        Add to Favorites
      </button>

      {favorites.length > 0 && (
        <div className={styles.favorites}>
          <h3>Favorite Cities:</h3>
          <ul className={styles.favoritesList}>
            {favorites.map((fav) => (
              <li key={fav}>
                <button
                  type="button"
                  className={styles.favoriteButton}
                  onClick={() => handleFavoriteClick(fav)}
                >
                  {fav}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && <p>Loading weather data...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {weatherData && <WeatherCard weatherData={weatherData} unit={unit} />}
      {forecastData && <Forecast forecastData={forecastData} />}
    </div>
  );
};

export default WeatherDashboard;
