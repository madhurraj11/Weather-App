import React, {useState} from 'react'
import './Weather.css';

const api = {
    key: 'a56fcd66fecdf7ae85b3389a95d2945f',
    baseURL: 'https://api.openweathermap.org/data/2.5/'
}
const Weather = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = (e) => {
        if(e.key === 'Enter'){
            fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(response => response.json())
            .then(result => {
                setWeather(result);
                setQuery('');
            })
        }
    }

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }
  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
        <main>
            <div className='search-box'>
                <input type="text" className='search-bar' 
                placeholder='Search...'
                value={query} onChange={e => setQuery(e.target.value)}
                onKeyPress={search}/>
            </div>

            {(typeof weather.main != 'undefined') ? (
            <div>
                <div className='location-box'>
                    <div className='location'>
                        {weather.name}, {weather.sys.country}
                    </div>    
                    <div className='date'>
                        {dateBuilder(new Date())}
                    </div>
                </div>
                <div className='weather-box'>
                    <div className='temp'>
                        {Math.round(weather.main.temp)}°c
                    </div>
                    <div className='weather'>
                        {weather.weather[0].main}
                    </div>
                </div>
            </div>
            ) : (' ')}
        </main>
    </div>
  )
}

export default Weather