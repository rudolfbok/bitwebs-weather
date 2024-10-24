"use client";

import { useState, useEffect } from 'react';
import { fetchWeather } from '../lib/weatherService';
import { getCities, saveCity, deleteCity, updateCity } from '../lib/crudService';

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

export default function Home() {
  const [city, setCity] = useState<string>(''); // City input
  const [weather, setWeather] = useState<WeatherData | null>(null); // Weather data
  const [error, setError] = useState<string>(''); // Error message
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]); // Favorite cities

  // Load favorite cities from localStorage when component mounts
  useEffect(() => {
    const savedCities = getCities();
    setFavoriteCities(savedCities);
  }, []);

  // Fetch weather data for a city
  const getWeather = async () => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      setError('');
    } catch (err) {
      setError('Could not fetch weather');
      setWeather(null);
    }
  };

  // Save the current city to favorites
  const addCityToFavorites = () => {
    if (city && !favoriteCities.includes(city)) {
      saveCity(city);
      setFavoriteCities([...favoriteCities, city]);
    }
  };

  // Delete a city from favorites
  const removeCity = (cityToRemove: string) => {
    deleteCity(cityToRemove);
    setFavoriteCities(favoriteCities.filter((c) => c !== cityToRemove));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Weather App</h1>

      <input
        className="p-2 rounded mb-4 text-black"
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        className="bg-green-500 p-2 rounded mb-4"
        onClick={getWeather}
      >
        Get Weather
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weather && (
        <div className="mt-4">
          <h2 className="text-2xl">{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>

          <button
            className="bg-yellow-500 p-2 rounded mt-4"
            onClick={addCityToFavorites}
          >
            Save to Favorites
          </button>
        </div>
      )}

      {/* Favorite Cities Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Favorite Cities</h2>
        {favoriteCities.length > 0 ? (
          <ul className="mt-4">
            {favoriteCities.map((favCity, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{favCity}</span>
                <button
                  className="bg-red-500 p-2 rounded ml-4"
                  onClick={() => removeCity(favCity)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite cities saved.</p>
        )}
      </div>
    </div>
  );
}
