import React from 'react';
import { useState, useEffect } from 'react';

import styles from './Stats.module.css';

import PlayerRankItem from './PlayerRankItem';
import PlayerProfileItem from './PlayerProfileItem';

const setChatLimit = (chats, statChat) => {
    chats.push(statChat);
    if (chats.length > 10) {
        chats.shift();
    }

    return chats;
}

const Stats = ({ statChatJoin, statChat, statPlayers }) => {

    const [chats, setChats] = useState([]);

    useEffect(() => {
        setChats(setChatLimit(chats, statChat))
    }, [chats, statChat]);

    return (
        <div className={styles.statsContainer}>

            <div className='row'>
                <div className='col-md-4'>
                    <div className="card rankCard" >
                        <div className={`card-header ${styles.rankHeader}`}>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <span className={styles.recordHeading}>3.44</span>
                                    <span className={styles.recordHeadingText}>Your last record</span>
                                </div>
                                <div className={styles.rank}>
                                    <div>
                                        <span className={styles.rankLabel}>#144</span>
                                        <p className={styles.rankText}>from 15k</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`card-body ${styles.rankBody}`}>
                            <ul className="list-group list-group-flush">
                                {
                                    statPlayers.map((player, playerId) => <PlayerRankItem key={playerId + player.name} player={player} />)
                                }


                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className="card" >

                        <div className={`card-body ${styles.chatCard}`}>
                            {
                                statChatJoin.name ? <div className={styles.chatHeading}><p className={styles.chatJoin}>{statChatJoin.name} has joined the game</p></div> : <></>
                            }
                            {
                                chats.map((chat, idx) => <div key={idx} className={styles.chat}><p>{chat}</p></div>)
                            }
                            <div className={styles.gameStartText}><p>The game starts in 6...</p></div>

                        </div>
                    </div>
                    <div>
                        <div className="input-group mt-3">
                            <input type="text" className={`form-control ${styles.chatInput}`} placeholder="..." aria-label="Message" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <span className={`input-group-text ${styles.sendButton}`} id="basic-addon2">Send</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-md-4'>
                    <div className="card" >
                        <div className={`card-body ${styles.playersCard}`}>
                            <div className='d-flex justify-content-between'>
                                <div className={styles.playersHeading}><p>Players</p></div>
                                <div className={styles.playersHeading}><p>{statPlayers.length}/12</p></div>

                            </div>

                            <button className={`btn btn-secondary w-100 btn-block mb-2 ${styles.settingsButton}`} type="button"><span></span>Settings</button>
                            {
                                statPlayers.map((player, playerId) => {
                                    return <>
                                        <PlayerProfileItem key={playerId} player={player} />
                                    </>
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Stats
