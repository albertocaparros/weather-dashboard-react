import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../services/weatherService';
import { WeatherData } from '../types/weather';
import { kelvinToCelsius } from '../utils/conversions';

const WeatherCard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetchWeather().then((data) => {
      console.log(data);
      setWeatherData(data);
    });
  }, []);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  const {
    name,
    main: { temp, humidity, pressure },
    weather,
    wind: { speed },
  } = weatherData;

  const weatherCondition = weather[0];

  return (
    <div className="weather-card" style={styles.card}>
      <h2 style={styles.title}>{name}</h2>
      <p style={styles.text}>
        <strong>Temperature:</strong> {kelvinToCelsius(temp)} °C
      </p>
      <p style={styles.text}>
        <strong>Condition:</strong> {weatherCondition.description}
      </p>
      <p style={styles.text}>
        <strong>Humidity:</strong> {humidity}%
      </p>
      <p style={styles.text}>
        <strong>Wind Speed:</strong> {speed} m/s
      </p>
      <p style={styles.text}>
        <strong>Pressure:</strong> {pressure} hPa
      </p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    maxWidth: '300px',
    margin: '1rem auto',
    boxShadow: '0 2px 4px rgba(255, 255, 255, 0.1)',
  },
  title: {
    margin: '0 0 1rem 0',
    fontSize: '1.5rem',
    textAlign: 'center' as const,
  },
  text: {
    margin: '0.5rem 0',
  },
};

export default WeatherCard;
