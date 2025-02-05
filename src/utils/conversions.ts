export const kelvinToCelsius = (temp: number): string =>
  (temp - 273.15).toFixed(1);

export const kelvinToFahrenheit = (temp: number): string =>
  (((temp - 273.15) * 9) / 5 + 32).toFixed(1);
