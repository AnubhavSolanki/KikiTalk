import React from 'react'
import styles from './stories.module.css'
import Story from './story'
const Stories = () => {
    return (
        <div className={styles.container}>
            <Story/>
            <Story/>
            <Story/>
        </div>
    )
}

export default Stories
