import React, { useState } from 'react'
import Link from 'next/link'
import styles from './Countries.module.css'
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@material-ui/icons";


const orderData = (data, value, direction) => {
    if (direction === 'asc') {
        return [...data].sort((a, b) => a[value] > b[value] ? 1 : -1)
    }
    if (direction === 'desc') {
        return [...data].sort((a, b) => a[value] > b[value] ? -1 : 1)
    }

    return data
}

const Arrow = ({ direction }) => {
    if (!direction) {
        return (
            <>
            </>
        )
    }
    else if (direction === 'asc') {
        return (
            <div className={styles.arrow}>
                <KeyboardArrowUpRounded color="inherit" />
            </div>
        )
    } else {
        return (
            <div className={styles.arrow}>
                <KeyboardArrowDownRounded color="inherit" />
            </div>
        )
    }
}

function Countries({ data }) {

    const [direction, setDirection] = useState()
    const [value, setValue] = useState('')
    const orderedData = orderData(data, value, direction)

    const setDirectionAndValue = (value) => {
        if (!direction) {
            setDirection('desc')
        } else if (direction === 'desc') {
            setDirection('asc')
        } else {
            setDirection(null)
        }

        setValue(value)
    }


    return (
        <>
            <div className={styles.country_container}>
                <div className={styles.country_header}>
                    <div className={styles.country_flag}></div>
                    <button onClick={() => setDirectionAndValue('name')} className={styles.country_name}>
                        <div>Name</div>
                        {value === 'name' ? <Arrow direction={direction} /> : null}
                    </button>
                    <button onClick={() => setDirectionAndValue('population')} className={styles.country_population}>
                        <div>Population</div>
                        {value === 'population' ? <Arrow direction={direction} /> : null}
                    </button>
                    <button onClick={() => setDirectionAndValue('area')} className={styles.country_area}>
                        <div>Area(km<sup style={{ fontSize: '.5rem' }}>2</sup>)</div>
                        {value === 'area' && <Arrow direction={direction} />}
                    </button>
                </div>
                {
                    orderedData.map(country => (
                        <Link passHref href={`/country/${country.alpha3Code}`} key={country.name}>
                            <div className={styles.row_header}>
                                <div className={styles.row_flag}>
                                    <img src={country.flag} alt={country.name} />
                                </div>
                                <div className={styles.row_name}>{country.name}</div>
                                <div className={styles.row_population}>{country.population}</div>
                                <div className={styles.row_area}>{country.area || 0}</div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default Countries
