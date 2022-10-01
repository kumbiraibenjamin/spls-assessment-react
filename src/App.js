
import './App.css';
import { Stage, useApp } from '@inlet/react-pixi'

import { useState, useEffect } from 'react'

import * as PIXI from 'pixi.js';

import Stats from './components/stats/Stats';

import Background from './components/background/Background'
import PlayerCar from './components/cars/PlayerCar'
import EnemyCar from './components/cars/EnemyCar'
import Explosion from './components/explosion/Explosion'
import explosion_spritesheet from "./assets/explosion_spritesheet.avif";

import io from 'socket.io-client';

// Sprite images
import carCenter from './assets/cars/car_center.png'
import carLeft from './assets/cars/car_left.png'
import carRight from './assets/cars/car_right.png'

import enemyCenter from './assets/cars/enemy_center.png'
import enemyLeft from './assets/cars/enemy_left.png'
import enemyRight from './assets/cars/enemy_right.png'


const App = () => {


  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [carProps, setCarProps] = useState({ x: 0, y: 0, scale: 0, image: carCenter });
  const [enemyProps, setEnemyProps] = useState({
    x: 0, y: 0, image: enemyCenter, scale: 0, position: ''
  });
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  const [collision, setCollision] = useState(false);

  const [textures, setTextures] = useState([]);

  const [statPlayers, setStatPlayers] = useState([]);
  const [statChat, setStatChat] = useState('');
  const [statChatJoin, setStatChatJoin] = useState([]);



  // Move car depending on key press
  const moveCar = (position, w) => {

    if (w > 0) {
      if (position === 's') {
        return {
          x: w / 2 - (w * 0.01785), y: w * 0.667, scale: w * 0.18 / 478, image: carCenter, position: 'center'
        }

      } else if (position === 'a') {
        return {
          x: w / 2 - (w * 0.2), y: w * 0.667, scale: w * 0.18 / 473, image: carRight, position: 'left'
        }

      } else if (position === 'd') {
        return {
          x: w / 2 + (w * 0.15), y: w * 0.667, scale: w * 0.18 / 473, image: carLeft, position: 'right'
        }

      }
    } else {

    }
  }
  // set enemy position based on data from socket
  const enemyPosition = (data, w, h) => {

    if (data === 'left') {
      return {
        x: w / 2 - (w * 0.027), y: h * 0.6, image: enemyLeft, scale: w * 0.021 / 478, position: 'left'

      }

    } else if (data === 'right') {
      return {
        x: w / 2 - (w * 0.06), y: h * 0.6, image: enemyRight, scale: w * 0.021 / 478, position: 'right'

      }

    } else {
      return {
        x: w / 2 - (w * 0.0446), y: h * 0.6, image: enemyCenter, scale: w * 0.021 / 478, position: 'center'

      }
    }

  };

  // Set car postion  Event
  const setCarPositionEvent = (e, w) => {
    if (w > 0) {
      const { x, y, scale, image, position } = moveCar(e.key, w);

      setCarProps({ x, y, scale, image, position });

      setPlayerPosition({ x, y, });
    }
  };

  // Set stage widths
  const getWindowDimensionsEvent = () => {

    const { innerWidth: w } = window;

    if (w < 1120) {
      setWidth(w);
      setHeight(w * 0.5794);

    } else {
      setWidth(1120);
      setHeight(649);

    }

  };

  // Set collion boolean with timer
  const handleCollision = () => {
    setCollision(true);
    console.warn('collision');

    setTimeout(() => {
      setCollision(false);
    }, 2000);
  }

  const generateFramesJSON = (animationWidth, animationHeight, rowSize, colSize, fileWidth, fileHeight, imageName) => {
    let generated = {
      "frames": {},
      "meta": {
        "app": "Splash Software Assessment",
        "version": "1.0",
        "image": imageName,
        "format": "RGBA8888",
        "size": { "w": fileWidth, "h": fileHeight },
        "scale": "1",
        "smartupdate": ""
      }
    };

    for (let i = 0; i < rowSize; i++) {
      for (let j = 0; j < colSize; j++) {
        const px = animationWidth * i;
        const py = animationHeight * j;

        const image = `${imageName}${px}${py}.png`
        generated.frames[image] = {
          "frame": { "x": px, "y": py, "w": animationWidth, "h": animationHeight },
          "rotated": false,
          "trimmed": false,
          "spriteSourceSize": { "x": px, "y": py, "w": animationWidth, "h": animationHeight },
          "sourceSize": { "w": animationWidth, "h": animationHeight }
        }
      }
    }

    return generated;
  };

  // Get explosion textures from .avif file
  const getExplosionTextures = async () => {
    const explosionFramesJSON = generateFramesJSON(1120, 649, 6, 5, 6720, 3245, "explosion_spritesheet.avif")

    const baseTexture = PIXI.BaseTexture.from(explosion_spritesheet);
    const spritesheet = new PIXI.Spritesheet(baseTexture, explosionFramesJSON);
    const textures = await spritesheet.parse();
    setTextures(Object.keys(textures).map((t) => textures[t]));
  }

  // Stage size Effect
  useEffect(() => {
    // Set default width and height
    getWindowDimensionsEvent();

    // Add resize event listener
    window.addEventListener('resize', getWindowDimensionsEvent);

    // remove listener on destroy
    return () => window.removeEventListener('resize', getWindowDimensionsEvent);
  }, []);

  // Set initial car size and position
  useEffect(() => {
    if (width > 0) {
      const { x, y, scale, image, position } = moveCar("s", width);
      setCarProps({ x, y, scale, image, position });
      getExplosionTextures();
    }
  }, [width]);

  // Add Keypress event for car controls
  useEffect(() => {

    // Add keypress handler
    window.addEventListener('keypress', (e) => setCarPositionEvent(e, width));

    // Remove keypress handler on destroy
    return () => window.removeEventListener('keypress', (e) => setCarPositionEvent(e, width));
  }, [width]);

  // Get explosion textures
  useEffect(() => {

  }, []);


  useEffect(
    () => {
      const socket = io("https://wrongway-racer-api.spls.ae/");
      // const socket = io();
      socket.connect();

      socket.on('newEnemy', data => {
        if (data) {
          // Set Enemy Props from Websocket
          setEnemyProps(enemyPosition(data, width, height));
        }
      });

      return () => {
        socket.disconnect();
      }
    }, [width, height]);

  useEffect(
    () => {
      // const socket = io();

      const socket = io("https://wrongway-racer-api.spls.ae/");
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
      const socket = io("https://wrongway-racer-api.spls.ae/");
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

      const socket = io("https://wrongway-racer-api.spls.ae/");
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

      <div className='stage-container '>
        <Stage className='stage' width={width} height={height}>
          <Background className='background' width={width} height={height} collision={collision} />

          {collision === true ?
            <Explosion
              width={width}
              height={height}
              carProps={carProps}
              textures={textures}
            />
            // <PixiGame />
            :
            <>
              <PlayerCar carProps={carProps} />
              <EnemyCar enemyProps={enemyProps}
                carProps={carProps}
                handleCollision={handleCollision}
                width={width} height={height} />
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
