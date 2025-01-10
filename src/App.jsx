import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState('Dhaka');
  const [error, setError] = useState(false);

  const API_KEY = process.env.API_KEY

  const getWeatherIcon = (id) => {
    if (id >= 200 && id <= 232)
      return 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thunderstorms-rain.svg';
    else if (id >= 300 && id <= 321)
      return 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/drizzle.svg';
    else if (id >= 500 && id <= 531)
      return 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/rain.svg';
    else if (id >= 600 && id <= 622)
      return 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/snow.svg';
    else if (id >= 700 && id <= 781)
      return 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast.svg';
    else if (id >= 801 && id <= 804)
      return 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/cloudy.svg';
    else
      return 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg';
  };

  const triggerError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((res) => {
        if (res.cod !== '404') {
          setData(res);
          console.log(res);
        } else {
          triggerError();
        }
      });
  }, [city]);

  return (
    <>
          {data.main ? (
            <div className="flex h-screen w-screen items-center justify-center bg-blue-500">
            <div className="grid grid-rows-[60px,60px,auto] gap-y-2">

              <div className={`col-span-2 flex w-full items-center justify-center rounded-lg bg-red-500 shadow ${error ? 'visible': 'invisible'}`}>
                <p className="text-white">City Not Found!</p>
              </div>
          
              <div className="col-span-2 flex w-full items-center justify-center rounded-lg bg-white shadow">
                <input
                id="cityInput" 
                type="text" 
                placeholder="Enter City Name" 
                className="text-bl ml-3 h-[40px] w-full rounded-lg border-2 border-gray-400 p-3 text-sm font-semibold focus:border-black focus:outline-none"
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.target.value ? setCity(event.target.value) : triggerError();
                    }
                  }}/>
                <button 
                className="mx-3 h-[40px] rounded-lg border-2 border-gray-400 px-4 text-sm font-semibold text-gray-400 hover:border-black hover:text-black"
                onClick={(event) => {
                  const inputElement = document.getElementById('cityInput');
                  const inputValue = inputElement.value;
                  inputValue ? setCity(inputValue) : triggerError();
                }}>Search</button>
              </div>
          
              <div className="grid h-[500px] grid-cols-[400px,300px] gap-x-2">
                <div className="flex items-center justify-center rounded-lg bg-white p-3 shadow">
                  <div className="text-center">
                    <img src={getWeatherIcon(data.weather[0].id)} className="w-64" />
                    <p className="mb-2 text-6xl font-bold">{Math.round(data.main.temp)}°C</p>
                    <p className="text-md font-semibold">City → {data.name.toUpperCase()}, {data.sys.country}</p>
                    <p className="text-md font-semibold">Condition → {data.weather[0].description.toUpperCase()}</p>
                  </div>
                </div>
                <div className="row-3 grid gap-y-2 rounded-lg bg-blue-500 shadow">
                  <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center">
                    <img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/thermometer.svg" className="mb-2 w-24" />
                    <p className="text-sm font-semibold">Feels Like: {Math.round(data.main.feels_like)}°C</p>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center">
                    <img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/raindrop-measure.svg" className="mb-2 w-24" />
                    <p className="text-sm font-semibold">Humidity: {Math.round(data.main.humidity)}%</p>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 text-center">
                    <img src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/windsock.svg" className="mb-2 w-24" />
                    <p className="text-sm font-semibold">Wind Speed:  {Math.round(data.wind.speed)} m/s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          

          ) : (
            <></>
          )}
    </>
  );
}

export default App;
