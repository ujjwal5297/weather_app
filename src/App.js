import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  //------------------------------------------------------------------------------------------------------------------ API KEY
  const apiKey = "6bcb7876156b01a604ab9271a64edf9a";

  //------------------------------------------------------------------------------------------------------------------ STATES
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  //------------------------------------------------------------------------------------------------------------------ Fetching Data From API - FUNCTION
  const getWeatehrDetails = (cityName) => {
    if (!cityName) return alert("Please Enter Correct City Name");
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&APPID=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        // console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        alert("Please enter a valid city name");
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };
  const handleSearch = () => {
    getWeatehrDetails(inputCity);
  };

  return (
    <div className="conatiner">
      <div className="col-md-12">
        <div className="weatherBG">
          <h1 className="heading">Get your city's Weather Details</h1>

          <div className="d-grid gap-3 col-4 mt-4">
            <input
              value={inputCity}
              type="text"
              className="form-control"
              onChange={handleChangeInput}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded weatherResultBox">
          <img
            className="weatherIcon"
            src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
            alt="weather"
          />
          <h4 className="WeatherCity">{data?.name}</h4>
          <h4 className="WeatherCity">Wind : {data?.wind?.speed}</h4>
          <h5 className="WeatherTemp">
            Temp : {(data.main?.temp - 273.15).toFixed(2)}°C
          </h5>
        </div>
      </div>
    </div>
  );
}

export default App;
