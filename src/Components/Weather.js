import { Oval } from "react-loader-spinner";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { getWeatherData, getCitySuggestions } from "./Service";
import { Grid, Paper, TextField, Typography } from '@mui/material';

function WeatherApp() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const [suggestions, setSuggestions] = useState([]);

  const toDateFunction = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const WeekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setInput("");
      setWeather({ ...weather, loading: true });

      try {
        const data = await getWeatherData(input);
        setWeather({ data, loading: false, error: false });
      } catch (error) {
        setWeather({ ...weather, data: {}, error: true });
        setInput("");
        console.log("error", error);
      }
    }
  };

  const handleInputChange = async (query) => {
    setInput(query);

    try {
      const suggestions = await getCitySuggestions(query);
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Autocomplete error", error);
    }
  };

  return (
    <Paper sx={{width:'50%', height:'500px', marginLeft:'25%', backgroundColor:'#c5fefe'}}>
      <Typography variant="h3" sx={{margin:'10% 0 0 30%'}}>Weather App</Typography>
      <div className="search-bar">
        
        <TextField id="outlined-basic" label="City Name" variant="outlined"
         type='text' 
         placeholder='Enter City Name...'
         name="query"
          value={input}
          onChange={(event) => handleInputChange(event.target.value)}
          onKeyPress={search}  sx={{width:'60%', margin:'10% 0 0 20%', backgroundColor:"rgba(255, 255, 255, 0.878)"}}/>

      
        {suggestions.length > 0 && (
          <div className="autocomplete-suggestions" style={{marginLeft:'20%'}}>
            {suggestions.map((city, index) => (
              <div key={index} onClick={() => setInput(city)}>
                {city}
              </div>
            ))}
          </div>
        )}
      </div>


      <Grid sx={{marginLeft:'20%'}}>
      {weather.loading && (
        <>
          <br />
          <br />
          <Oval type="Oval" color="black" height={100} width={100} />
        </>
      )}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: "20px" }}>City not found</span>
          </span>
        </>
      )}
      {weather && weather.data && weather.data.main && (
        <div>
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDateFunction()}</span>
          </div>
          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg">°C</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
        </div>
      )}
      </Grid>
    </Paper>
  );
}

export default WeatherApp;
