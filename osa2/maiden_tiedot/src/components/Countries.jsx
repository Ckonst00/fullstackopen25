import { useEffect, useState } from "react"
import weatherService from "../services/service"


const Button = ({ country, specific}) => {

  return (
      <button onClick={() => specific(country)}>Show</button>
  )
}

const Display = ({ countries, value }) => {
  const [select, setSelect] = useState(null)

  if (select) {
    return (
      <div>
        <Country getCountries={[select]} />
      </div>
    )
  }

  const getCountries = countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))


  if (getCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>

  } else if (getCountries.length === 1) {
    return (
    <div>
      <Country getCountries={getCountries} />
    </div>
    )

  } else if (getCountries.length > 1 && getCountries.length <= 10) {
  return (
    <div>
      {getCountries.map((country) => <li key={country.cca3}>{country.name.common} <Button country={country} specific={setSelect} /> </li>)}
      </div>
  )}
}

const Country = ({getCountries}) => {
  return(
    <div>
    {getCountries.map((country) => (
        <div key={country.cca3}>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h2>Languages</h2>
          <ul>
            <Languages country={country} />
          </ul>
          <img src={country.flags.png} width="200" />
          <Weather capital={country.capital}/>
        </div>
      ))}
      </div>
  )
}

const Weather = ({ capital }) => {

    const [weather, setWeather] = useState(null)
    const cityCapital = capital[0]

    
    useEffect(() => {
        weatherService
        .getWeather(cityCapital)
        .then(capitalWeather => {
            setWeather(capitalWeather)
        })
    }, [cityCapital])

  return (
<div>
  <h2>Weather in {capital}</h2>
  {weather !== null ? (
    <>
      <p>Temperature: {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
    </>
  ) : (
    <p>Loading weather...</p>
  )}
</div>
  )
}

const Languages = ({ country }) => {
  const languageEntries = Object.entries(country.languages);
  return (
    <div>
      {languageEntries.map(([key, value]) => (<li key={key}>{value}</li>)
      )}
    </div>
  )
}


export default Display