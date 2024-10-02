import Phaser, { Create, Data } from 'phaser'
import GameScene0 from '../scenes/GameScene0'
import BasePlanet from '../scenes/BasePlanet'
import MainMenu from '../scenes/MainMenu'
import PlayerNameInput from '../scenes/PlayerNameInput'
import Pause from '../scenes/Pause'
import AIDescription from '../scenes/AIDescription'
import ReturntoBasePlanet from '../scenes/ReturntoBasePlanet'
import AI1 from '../scenes/AI1'
import DataSelect from '../scenes/DataSelect'
import TaskList from '../scenes/TaskList'
import CreateTask from '../scenes/CreateTask'

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
  scene: [
    PlayerNameInput,
    MainMenu,
    GameScene0,
    BasePlanet,
    Pause,
    AIDescription,
    ReturntoBasePlanet,
    AI1,
    DataSelect,
    TaskList,
    CreateTask,
  ],
}

export default config
