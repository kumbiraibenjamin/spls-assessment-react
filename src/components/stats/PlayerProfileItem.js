import React from 'react'

import styles from './Stats.module.css';

const PlayerProfileItem = ({ player }) => {
    return (
        <div className={styles.chatFooter}>
            <img src={player.avatar} className={styles.user} />
            <span  >{player.name}</span>
        </div>
    )
}

export default PlayerProfileItem
