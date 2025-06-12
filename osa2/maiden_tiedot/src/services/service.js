import axios from "axios";

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const api_key = import.meta.env.VITE_WEATHER_KEY

const getAll = () => {
    const request = axios.get(`${baseUrl}`)
    return request.then(response => response.data)
}

const getWeather = (city) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}&units=metric`)

    return request.then(response => response.data)
}

export default { getAll, getWeather }