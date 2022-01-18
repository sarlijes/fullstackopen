import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const url = 'https://restcountries.com/v2/name/' + name + '?fullText=true'

  useEffect(() => {
    if (name) {
      axios
        .get(url)
        .then(response => 
          setCountry(response.data[0])
        )
    }
  }, [name, url])

  return {
    found: (country !== null && typeof country !== 'undefined'),
    data: { ...country }
  }
}