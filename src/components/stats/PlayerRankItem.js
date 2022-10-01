import React from 'react'
import styles from './Stats.module.css';

const PlayerRankItem = ({ player }) => {
    return (
        <li className="list-group-item">
            <div className='d-flex justify-content-between'>
                <div >{player.name}</div>
                <div className='d-flex justify-content-between'>
                    <div className={styles.recordListItem}>
                        <span className={styles.recordListLabel}>Record</span>
                        <span className={styles.recordSmall}>{player.record}</span>
                    </div>
                    <div className={styles.recordListItem}>
                        <span className={styles.recordListLabel}>Rank</span>
                        <span className={styles.recordSmall}>{player.rank}</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default PlayerRankItem
