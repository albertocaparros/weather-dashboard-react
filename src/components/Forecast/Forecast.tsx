import React from 'react';
import { ForecastData, ForecastItem } from '../../types/forecast';
import styles from './Forecast.module.css';
import { kelvinToCelsius } from '../../utils/conversions';

interface ForecastProps {
  forecastData: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ forecastData }) => {
  const forecastItems: ForecastItem[] = forecastData.list.slice(0, 8);

  return (
    <div className={styles.forecastContainer}>
      <h3>24-Hour Forecast</h3>
      <div className={styles.forecastGrid}>
        {forecastItems.map((item) => (
          <div key={item.dt} className={styles.forecastItem}>
            <p>
              {new Date(item.dt * 1000).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <p>{kelvinToCelsius(item.main.temp)} °C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
