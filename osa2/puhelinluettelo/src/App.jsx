import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const SuccessNotification = ({message}) => {
  if (!message) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const ErrorNotification = ({message}) => {
  if (!message) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}
const Persons = ({persons, filter, handleDelete}) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {(filter.length === 0 ? persons : filteredPersons).map(person => (
        <Person key={person.id} person={person} handleDelete={handleDelete}/>
      ))}
    </div>
  )
}

const Person = ({person, handleDelete}) => {
  return (
    <div>
      <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>delete</button></p>
    </div>
    
  )
}

const PersonForm = ({addPerson, handleNameChange, handleNumberChange}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Filter = ({handleFilterInput}) => {
  
  return (
    <div>
      <p>filter shown with <input onChange={handleFilterInput}></input></p>
    </div>
  )
}
const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

const hook = () => {
  console.log('effect')
  personService
    .getAll()
    .then(initialPersons => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })
}

useEffect(hook, [])


  const addPerson = (event) => {
    event.preventDefault()
    const message = `${newName} is already added to phonebook, replace the old number with a new one?`
    const existingPerson = persons.find(person => person.name === newName)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.find(person => person.name === newName)) {
      if (window.confirm(message)) {

        const updatedPerson = {...existingPerson, number: newNumber}
        personService
          .update(existingPerson.id, updatedPerson)
          .then(initialPersons => {
            setMessage(`${existingPerson.name} number updated`)
            setTimeout(() => {setMessage('')}, 1000)
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : initialPersons))
          })
      }
    } else {
    personService
      .create(personObject)
      .then(returnedPerson => {
        setMessage(`Added ${newName}`)
        setTimeout(() => {setMessage('')}, 1000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(`${error.response.data.error}`)
        setTimeout(() => {setErrorMessage('')}, 5000)
      })
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id).then(() => {
          setMessage(`Deleted ${name}`)
          setTimeout(() => {setMessage('')}, 1000)
          setPersons(persons.filter(person => person.id !== id))
      })
        .catch(error => {
          setErrorMessage(`Information of ${name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={message}/>
      <ErrorNotification message={errorMessage} />
      <Filter handleFilterInput={handleFilterInput} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        handleDelete={handleDelete} />
    </div>
  )

}

export default App