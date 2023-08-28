import React from 'react'
import Image from 'next/image'
import styles from './CountryCard.module.css'
import Link from 'next/link'

const CountryCard = (props) => {
  const { name, capital, region, subregion, languages, latlng, maps, flags, cca2} = props.details
  const coordinates = latlng.join(', ')
 

  return (
    <div className={styles.cardContainer}>
        <Link href={`/country/${cca2}`}>
            <p>{name.common}</p>
            <Image src={`https://flagsapi.com/${cca2}/shiny/64.png`} alt='N/A' width={100} height={100}/>
        </Link>
    </div>
  )
}

export default CountryCard;