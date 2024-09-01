import Phaser from 'phaser'
import GameScene0 from '../scenes/GameScene0'
import BasePlanet from '../scenes/BasePlanet'
import MainMenu from '../scenes/MainMenu'
import PlayerNameInput from '../scenes/PlayerNameInput'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [PlayerNameInput, MainMenu, GameScene0, BasePlanet],
}

export default config
