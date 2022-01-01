import React from 'react'
import Post from '../post/post';
import Stories from '../stories/stories';
import styles from './home.module.css';

const Home = () => {
    return (
        <div className={styles.header}>
            <Stories/>
            <Post/>
            <Post/>
        </div>
    )
}

export default Home;
