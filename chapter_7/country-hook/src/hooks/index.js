import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios
        .get('https://restcountries.com/v2/name/' + name + '?fullText=true')
        .then(response => 
          setCountry(response.data[0])
        )
    }
  }, [name])

  return {
    found: (country !== null && typeof country !== 'undefined'),
    data: { ...country }
  }
}