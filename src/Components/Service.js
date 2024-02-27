import axios from 'axios';

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

const getWeatherData = async (city) => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: city,
        units: 'metric',
        appid: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getWeatherData };




const autocompleteApiUrl = 'https://api.openweathermap.org/data/2.5/find';


const getCitySuggestions = async (query) => {
  try {
    const response = await axios.get(autocompleteApiUrl, {
      params: {
        q: query,
        type: 'like',
        sort: 'population',
        cnt: 5, // Limit the number of suggestions
        appid: apiKey,
      },
    });
    return response.data.list.map((city) => `${city.name}, ${city.sys.country}`);
  } catch (error) {
    throw error;
  }
};

export { getCitySuggestions };

