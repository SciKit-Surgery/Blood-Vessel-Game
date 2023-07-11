import Phaser from 'phaser'
//import CounntdownController from './CountdownController'

import { scene1 } from 'Desktop/diss/level1.js'
import { scene2 } from 'Desktop/diss/level2.js'
import { scene3 } from 'Desktop/diss/level3.js'
import { scene4 } from 'Desktop/diss/level4.js'
import { scene5 } from 'Desktop/diss/level5.js'
import { scene6 } from 'Desktop/diss/level6.js'
import { scene7 } from 'Desktop/diss/level7.js'

const gameConfig = {
  type: Phaser.AUTO,
  width: 600,
  height: 400,
  backgroundColor: '0x8B0000',
  transparent: true,
  parent: 'phaser-example',
  scene: [preload: preload, create: create, scene1, scene2, scene3, scene4, scene5, scene6]
};

const game = new Phaser.Game(gameConfig)

game()