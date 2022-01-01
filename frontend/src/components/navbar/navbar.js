import React from 'react'
import styles from './navbar.module.css'
const Navbar = () => {
    return (
        <div className={styles.bar}>
            <span className={styles.logo}>LOGO</span>
            <a className={styles.links}>Home</a>
            <a className={styles.links}>Profile</a>
        </div>
    )
}

export default Navbar
