import React, { useState, useEffect } from 'react'
import styles from './SearchBar.module.css'
import Toggle from 'react-toggle'
import "react-toggle/style.css"


function SearchBar({ ...rest }) {

    const [theme, setTheme] = useState('light')

    const handleTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
            document.documentElement.setAttribute('data-theme', 'dark')
        }
        else {
            setTheme('light')
            document.documentElement.setAttribute('data-theme', 'light')
        }
    }

    return (
        <div className={styles.search_container}>
            <div className={styles.search_toggle}>
                <label>
                    <Toggle
                        onChange={handleTheme}
                        className={styles.search_toggle_custom}
                        icons={{
                            checked: <div style={{ fontSize: '15px', marginTop: '5px' }}>🔅</div>,
                            unchecked: <div style={{ fontSize: '13px', marginTop: '5px' }}>🌙</div>,
                        }}
                    />
                </label>
            </div>
            <div className={styles.search_wrapper}>
                <input className={styles.search_input} {...rest} />
            </div>
        </div>
    )
}

export default SearchBar
