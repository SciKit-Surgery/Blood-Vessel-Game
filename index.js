import Phaser from 'phaser'

import { scene1 } from 'Desktop/diss/level1.js'
import { scene2 } from 'Desktop/diss/level2.js'
import { scene3 } from 'Desktop/diss/level3.js'

const gameConfig = {
  type: Phaser.AUTO,
  width: 600,
  height: 600,
  backgroundColor: '#000088',
  parent: 'phaser-example',
  scene: [scene1, scene2, scene3]
};

const game = new Phaser.Game(gameConfig)

game()