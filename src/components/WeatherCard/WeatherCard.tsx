import React from 'react';
import { WeatherData } from '../../types/weather';
import styles from './WeatherCard.module.css';
import { kelvinToCelsius } from '../../utils/conversions';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const {
    name,
    main: { temp, humidity, pressure, temp_max, temp_min, feels_like },
    weather,
    wind: { speed },
    sys: { country },
  } = weatherData;
  const weatherCondition = weather[0];

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        {name}, {country}
      </h2>
      <p className={styles.text}>
        <strong>Temperature:</strong> {kelvinToCelsius(temp)} °C
      </p>
      {temp !== feels_like && (
        <p className={styles.text}>
          <strong>Feels like:</strong> {kelvinToCelsius(feels_like)} °C
        </p>
      )}
      {temp !== temp_max && (
        <p className={styles.text}>
          <strong>Max:</strong> {kelvinToCelsius(temp_max)} °C
        </p>
      )}
      {temp !== temp_min && (
        <p className={styles.text}>
          <strong>Min:</strong> {kelvinToCelsius(temp_min)} °C
        </p>
      )}
      <p className={styles.text}>
        <strong>Condition:</strong> {weatherCondition.description}
      </p>
      <p className={styles.text}>
        <strong>Humidity:</strong> {humidity}%
      </p>
      <p className={styles.text}>
        <strong>Wind Speed:</strong> {speed} m/s
      </p>
      <p className={styles.text}>
        <strong>Pressure:</strong> {pressure} hPa
      </p>
    </div>
  );
};

export default WeatherCard;
