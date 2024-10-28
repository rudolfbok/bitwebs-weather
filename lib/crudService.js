// lib/crudService.js

const LOCAL_STORAGE_KEY = 'favoriteCities';

// Get all saved cities
export const getCities = () => {
  if (typeof window !== 'undefined') {
    const cities = localStorage.getItem(LOCAL_STORAGE_KEY);
    return cities ? JSON.parse(cities) : [];
  }
  return [];
};

// Save a new city
export const saveCity = (city) => {
  if (typeof window !== 'undefined') {
    const cities = getCities();
    cities.push(city);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cities));
  }
};

// Update an existing city
export const updateCity = (oldCity, newCity) => {
  if (typeof window !== 'undefined') {
    const cities = getCities();
    const updatedCities = cities.map((city) =>
      city === oldCity ? newCity : city,
    );
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCities));
  }
};

// Delete a city
export const deleteCity = (cityToDelete) => {
  if (typeof window !== 'undefined') {
    const cities = getCities();
    const updatedCities = cities.filter((city) => city !== cityToDelete);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedCities));
  }
};
