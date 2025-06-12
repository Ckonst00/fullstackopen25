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

const getIcon = (code) => {
    return request = axios.get(`https://openweathermap.org/img/wn/${code}@2x.png`)
}
export default { getAll, getWeather }