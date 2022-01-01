import React from 'react'
import styles from './post.module.css';
import { FaCloud, FaComment, faEllipsis, FaEllipsisV, FaHeart, FaShare } from 'react-icons/fa';
const Post = () => {
    return (
        <div>
            <div className={styles.head}>
                <div className={styles.profile} >
                    <img src="https://sitechecker.pro/wp-content/uploads/2017/12/URL-meaning.png"/>
                </div>
                <span className={styles.profile_name}>anubhav.solanki</span>
                <div>
                    <span> <FaEllipsisV/>  </span>
                </div>
            </div>    
            <div className={styles.post}>
                <img src="https://sitechecker.pro/wp-content/uploads/2017/12/URL-meaning.png"/>
            </div>
            <div className={styles.caption}>
                So I am so happy to share my first post #party
            </div>
            <div className={styles.footer}>
                <div className={styles.like}><FaHeart/></div>
                <div className={styles.comment}><FaComment/></div>
                <div className={styles.share}><FaShare/></div>
            </div>
        </div>
    )
}

export default Post
