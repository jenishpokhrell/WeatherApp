import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=53536fd22cd30f1b0af02cfb29451ae6`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      setLocation('')
    }
  }
  return (
    <div className="app">
      <div className="search">
        <input type="text"
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      <div className="container">

        {data.name !== undefined &&
          <div className="top">
            <div className="location">
              <p>{data.name}, {date}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
            <div className="desc">
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
          </div>
        }

        {data.name !== undefined &&

          <div className="bottom">
            <div className="feels">
              {data.main ? <p>{data.main.feels_like.toFixed()}°F</p> : null}
              <p className='bold'>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity}</p> : null}
              <p className='bold'>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p>{data.wind.speed} MPH</p> : null}
              <p className='bold'>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
