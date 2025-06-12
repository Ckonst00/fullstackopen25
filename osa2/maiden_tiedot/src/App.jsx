import { useState } from 'react'
import countryService from './services/service'
import Display from './components/Countries'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
      .catch(error => {
        console.error("Error fetching data:", error)
        setCountries([])
      })
  }


  return (
    <div>
      <form onSubmit={onSearch}>
        find countries: <input value={value} onChange={handleChange} />
      </form>
      <Display countries={countries} value={value} />
    </div>
  )
}

export default App
