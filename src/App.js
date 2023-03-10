import axios from "axios";
import React, { useState } from "react";
import { apiEndpoint } from "./api";
import { weatherGif } from "./api";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "./api";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // weather modal
  const [weatherModal, setWeatherModal] = useState(true);

  // cityName
  const [cityName, setCityName] = useState("");

  // main weather
  const [mainWether, setMainWether] = useState("");

  // temperature
  const [temp, setTemp] = useState("");

  const toggleWeather = () => {
    weatherModal ? setWeatherModal(false) : setWeatherModal(true);
  };

  const getTemperature = (kelvin) => {
    const celsius = Math.round(kelvin - 273.15);
    setTemp(celsius);
  };

  const day = () => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Sat",
    ];
    const date = new Date();
    return days[date.getDay() - 1];
  };

  const date = () => {
    const date = new Date().toLocaleString();
    return date;
  };

  const fetchWeather = async (name) => {
    try {
      const res = await axios.get(`${apiEndpoint}${name}`);

      if (res.status === 200) {
        setMainWether(res.data.weather[0].main);
        getTemperature(res.data.main.temp);
      }
      toggleWeather();
    } catch (error) {
      toast.error(error.response.data.message, toastOptions);
    }
  };

  const getLink = (obj) => {
    for (const key in obj) {
      if (key === mainWether) {
        return obj[key];
      }
    }
  };

  return (
    <>
      {weatherModal && (
        <section className="text-gray-600 body-font">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Weather Web Application
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Enter a city name and get the real time weather of the
                particular city
              </p>
            </div>
            <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
              <div className="relative flex-grow w-full">
                <label
                  htmlFor="full-name"
                  className="leading-7 text-sm text-gray-600"
                >
                  City Name
                </label>
                <input
                  type="text"
                  id="city-name"
                  name="city-name"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative flex-grow w-full">
                <button
                  className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  onClick={() => fetchWeather(cityName)}
                >
                  Get weather
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      {!weatherModal && (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap flex-col">
            <img
              className="xl:w-1/4 lg:w-1/3 md:w-1/2 w-2/3 block mx-auto mb-10 object-cover object-center rounded cursor-pointer"
              alt={mainWether}
              src={getLink(weatherGif)}
              onClick={toggleWeather}
            />
            <div className="flex flex-col text-center w-full">
              <h1 className="text-xl font-medium title-font mb-4 text-gray-900">
                {`${temp}\u00B0C `} {mainWether}
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                {day()}, {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
              </p>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                {date()},
              </p>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Click the above image to go back and enter new City
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default App;
