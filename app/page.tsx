import CountryCard from '../components/CountryCard'
import styles from './page.module.css'
import React from 'react'

const getCountries = async() => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json();
  return countries;
}

const HomePage = async() => {
  const countries = await getCountries();
  
  return (
    <div className={styles.cardContainer}>
      {countries.map((country, index) => (
        <CountryCard key={index} details={country} />
      ))}
    </div>
  )
}

export default HomePage