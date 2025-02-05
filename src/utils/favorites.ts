const FAVORITES_KEY = 'favoriteCities';

export const getFavoriteCities = (): string[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveFavoriteCities = (cities: string[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(cities));
};
