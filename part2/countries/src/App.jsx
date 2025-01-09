import { useState, useEffect } from 'react'

import countriesService from './services/countries';

import Search from './components/search';
import ListCountries from './components/listCountries';

function App() {
  const [countries, setCountries] = useState(null)

  const [query, setQuery] = useState("")

  useEffect(() => {
    countriesService
      .getAll()
      .then(response => {
        setCountries(response)
        console.log('response :>> ', response);
      }
      )
  }, [])

  const searchOnChange = (event) => {
    console.log('event.target.value :>> ', event.target.value);
    setQuery(event.target.value)
  }

  if (countries === null) {
    return
  }

  return (
    <div>
      <h2>find countries <Search onChange={searchOnChange}/></h2>
      <ListCountries allCountries={countries} query={query} setQuery={setQuery}/>
    </div>
  )
}

export default App
