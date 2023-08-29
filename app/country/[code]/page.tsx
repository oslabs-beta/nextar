import styles from './country.module.css'
import React from 'react'

const getCountryDetails = async(code) => {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    const data = await response.json();
    return data;
}

const getTime = async(coord) => {
  const coordinates = coord.join(',')
  try {
    const response = await fetch(`https://timezone.abstractapi.com/v1/current_time?api_key=02f249b24b414f5388a66cbd0152c747&location=${coordinates}`, { cache: 'no-store'})
    const data = await response.json();

    const date = new Date(data.datetime)
    const hours = date.getHours();
    const mins = date.getMinutes();
    const meridiem = hours >= 12 ? 'pm' : 'am';
    const hour = hours % 12 || 12;
    const time = `${hour}:${mins < 10 ? '0': ''}${mins}${meridiem}`;
    return time;
  }
  catch (error) {
    console.log(error)
  }
}

const Country = async ({ params }) => {
  const arr = await getCountryDetails(params.code);
  const details = arr[0]

  let capitals;
  if (Array.isArray(details.capital)) {
    capitals = details.capital.join(', ')
  } else capitals = details.capital

  let language;
  if(details.languages) {
    let langArr = Object.values(details.languages)
    language = langArr.join(', ')
  } else language = 'N/A'

  let latlong;
  if(details.capitalInfo.latlng) latlong = details.capitalInfo.latlng;
  else latlong = details.latlng

  return (
    <div className={styles.countryContainer}>
      <h1>{details.name.common}</h1>
        <div className={styles.countryDetails}>
          <div>
            <b>Capital</b>
            <p>{capitals}</p>
          </div>
            <b>Region</b>
            <p>{details.region}</p>
            <b>Subregion</b>
            <p>{details.subregion}</p>
          <div>
            <b>Languages</b>
            <p>{language}</p>
          </div>
          <div>
            <b>Current Time</b>
            <p>{getTime(latlong)}</p>
          </div>
        </div>
    </div>
  )
}

export default Country