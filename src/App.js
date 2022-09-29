
import './App.css';
import { Stage, Sprite, AnimatedSprite } from '@inlet/react-pixi'

import { useState, useEffect } from 'react'

import Stats from './components/stats/Stats';

import Background from './components/background/Background'
import PlayerCar from './components/cars/PlayerCar'
import EnemyCar from './components/cars/EnemyCar'

import io from 'socket.io-client';

// Sprite images
import carCenter from './assets/cars/car_center.png'
import carLeft from './assets/cars/car_left.png'
import carRight from './assets/cars/car_right.png'

import enemyCenter from './assets/cars/enemy_center.png'
import enemyLeft from './assets/cars/enemy_left.png'
import enemyRight from './assets/cars/enemy_right.png'

import explosion_spritesheet from './assets/explosion_spritesheet.avif'

let i = 0;

const moveCar = (position, carProps, width) => {
  const { x, y, carWidth, carHeight, image } = carProps;

  if (position === 's') {
    return {
      x: width / 2 - (carWidth * 0.60), y, carWidth, carHeight, image: carCenter
    }

  } else if (position === 'a') {
    return {
      x: width / 2 - (carWidth * 1.5), y, carWidth, carHeight, image: carRight
    }

  } else if (position === 'd') {
    return {
      x: width / 2 + (carWidth * 0.50), y, carWidth, carHeight, image: carLeft
    }


  } else {
    return { x, y, carWidth, carHeight, image }
  }
}

const getEnemyData = (data) => {


  if (data === 'left') {
    return {
      x: 360, y: 460, image: enemyLeft, scale: 0.05, position: 'left'
    }

  } else if (data === 'right') {
    return {
      x: 385, y: 460, image: enemyRight, scale: 0.05, position: 'right'
    }

  } else {
    return {
      x: 350, y: 460, image: enemyCenter, scale: 0.05, position: 'center'
    }
  }

};




const App = () => {

  const width = 800, height = 600;
  const stageProperties = {
    width: width, height: height,
  };

  const carWidth = 100, carHeight = 81;

  const [carProps, setCarProps] = useState({
    x: width / 2 - (carWidth * 0.60), y: height * 0.85, carWidth, carHeight, image: carCenter
  });

  const [playerPosition, setPlayerPosition] = useState({ x: 340, y: 510 });
  const [collision, setCollision] = useState(false);

  const [statPlayers, setStatPlayers] = useState([]);
  const [statChat, setStatChat] = useState('');
  const [statChatJoin, setStatChatJoin] = useState([]);

  const [enemyProps, setEnemyProps] = useState({
    x: 350, y: 460, image: enemyCenter, scale: 0.05, position: 'center' // center
  });



  const handleCollision = () => {
    setCollision(true);
    console.warn('collision', collision)

    setTimeout(() => {
      setCollision(false);
    }, 5000);
  }

  useEffect(() => {
    window.addEventListener('keypress', e => {
      setCarProps(moveCar(e.key, carProps, width));
      const { x, y } = moveCar(e.key, carProps, width);
      setPlayerPosition({ x, y, });
    }, [playerPosition, carProps]);

    // Websocket faker
    // setInterval(() => {
    //   const data = '';
    //   setEnemyProps(getEnemyData(data, enemyProps, width));

    // const newChat = "Hello, How can I join?"
    // setStatChat(newChat);

    // const players = [
    //   {
    //     "name": "Prasad Mirella",
    //     "avatar": "https://cdn.spls.ae/cdn/avatar/1.jpg",
    //     "record": 3,
    //     "rank": 4,
    //     "gamesPlayed": 27,
    //     "worstRecord": 2,
    //     "highestRank": 104
    //   },
    //   {
    //     "name": "Chisomo Volker",
    //     "avatar": "https://cdn.spls.ae/cdn/avatar/2.jpg",
    //     "record": 0,
    //     "rank": 3,
    //     "gamesPlayed": 36,
    //     "worstRecord": 0,
    //     "highestRank": 105
    //   },
    //   {
    //     "name": "Aránzazu Jong-Su",
    //     "avatar": "https://cdn.spls.ae/cdn/avatar/3.jpg",
    //     "record": 4,
    //     "rank": 6,
    //     "gamesPlayed": 30,
    //     "worstRecord": 3,
    //     "highestRank": 78
    //   },
    //   {
    //     "name": "Zenobia Jósteinn",
    //     "avatar": "https://cdn.spls.ae/cdn/avatar/4.jpg",
    //     "record": 0,
    //     "rank": 1,
    //     "gamesPlayed": 35,
    //     "worstRecord": 0,
    //     "highestRank": 108
    //   },
    //   {
    //     "name": "Eulogia Neilina",
    //     "avatar": "https://cdn.spls.ae/cdn/avatar/5.jpg",
    //     "record": 0,
    //     "rank": 5,
    //     "gamesPlayed": 33,
    //     "worstRecord": 0,
    //     "highestRank": 109
    //   },
    //   {
    //     "name": "Berach Niraj",
    //     "avatar": "https://cdn.spls.ae/cdn/avatar/6.jpg",
    //     "record": 0,
    //     "rank": 7,
    //     "gamesPlayed": 38,
    //     "worstRecord": 0,
    //     "highestRank": 98
    //   },
    //   {
    //     "name": "Mirembe Anouska",
    //     "avatar": "https://cdn.spls.ae/cdn/avatar/7.jpg",
    //     "record": 0,
    //     "rank": 2,
    //     "gamesPlayed": 33,
    //     "worstRecord": 0,
    //     "highestRank": 105
    //   },
    //   {
    //     "name": "Anita Olwen",
    //     "avatar": "https://cdn.spls.ae/cdn/avatar/8.jpg",
    //     "record": 0,
    //     "rank": 8,
    //     "gamesPlayed": 33,
    //     "worstRecord": 0,
    //     "highestRank": 104
    //   },
    //   {
    //     "name": "Iroda Paula",
    //     "avatar": "https://cdn.spls.ae/cdn/avatar/9.jpg",
    //     "record": 0,
    //     "rank": 9,
    //     "gamesPlayed": 28,
    //     "worstRecord": 0,
    //     "highestRank": 113
    //   },
    //   {
    //     "name": "Thorben Melite",
    //     "avatar": "https://cdn.spls.ae/cdn/avatar/10.jpg",
    //     "record": 0,
    //     "rank": 10,
    //     "gamesPlayed": 37,
    //     "worstRecord": 0,
    //     "highestRank": 108
    //   }
    // ]
    // setStatPlayers(players);

    // const newJoinChat = {
    //   "name": "Chisomo Volker",
    //   "avatar": "https://cdn.spls.ae/cdn/avatar/2.jpg",
    //   "record": 0,
    //   "rank": 6,
    //   "gamesPlayed": 44,
    //   "worstRecord": 0,
    //   "highestRank": 133
    // };
    // setStatChatJoin(newJoinChat);
    // }, 5000);

  }, []);

  const socket = io("https://wrongway-racer-api.spls.ae/");

  useEffect(
    () => {
      // const socket = io();
      socket.connect();

      socket.on('newEnemy', data => {
        if (data) {
          // Set Enemy Props from Websocket
          setEnemyProps(getEnemyData(data));
        }
      });

      return () => {
        socket.disconnect();
      }
    }, []);

  useEffect(
    () => {
      // const socket = io();
      socket.connect();



      socket.on('players', data => {
        if (data) {
          // Set player data
          setStatPlayers(data);
        }
      });


      return () => {
        socket.disconnect();
      }
    }, []);

  useEffect(
    () => {
      // const socket = io();
      socket.connect();

      socket.on('newChat', data => {
        if (data) {
          // Set Chat Data
          setStatChat(data);
        }
      });


      return () => {
        socket.disconnect();
      }
    }, []);

  useEffect(
    () => {
      // const socket = io();
      socket.connect();

      socket.on('newChatJoin', data => {
        if (data) {
          // Set Chat Data
          setStatChatJoin(data);
        }
      });

      return () => {
        socket.disconnect();
      }
    }, []);

  return (
    <>
      <div className='container'>
        <Stage className='stage'{...stageProperties}>
          <Background className='background' x={width} y={height} collision={collision} />

          {collision === true ?
            <Sprite
              image={explosion_spritesheet}
              x={playerPosition.x}
              y={playerPosition.y}
              width={200}
              height={200}
            />
            // <AnimatedSprite
            //   animationSpeed={0.5}
            //   isPlaying={true}
            //   textures={explosion_spritesheet}
            //   anchor={0.5}
            // />
            :
            <>
              <PlayerCar carProps={carProps} />
              <EnemyCar carProps={enemyProps} playerPosition={playerPosition} handleCollision={handleCollision} />
            </>
          }

        </Stage>
      </div>
      <div className='container'>

        <Stats statPlayers={statPlayers} statChat={statChat} statChatJoin={statChatJoin} />
      </div>
    </>
  );
}



export default App;
