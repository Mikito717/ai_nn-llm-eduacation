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
import PreprocessData from '../scenes/PreprocessData'
import LLMScene1 from '../scenes/LLMScene1'
import LLMScene2 from '../scenes/LLMScene2'
import SelectedTaskp from '../scenes/SelectedTask-ph'
import LLMScene3 from '../scenes/LLMScene3'
import LLMScene4 from '../scenes/LLMScene4'
import NN_paramator from '../scenes/NN_paramator'
import PCA_paramator from '../scenes/PCA_paramator'
import PCA_result_mount from '../scenes/PCA_result_mount'
import SVM_paramator from '../scenes/SVM_paramator'
import RF_paramator from '../scenes/RF_paramator'
import KNN_Paramator from '../scenes/KNN_Paramator'
import Kmeans_paramator from '../scenes/Kmeans_paramator'

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
    LLMScene1,
    LLMScene2,
    SelectedTaskp,
    LLMScene3,
    LLMScene4,
    NN_paramator,
    PCA_paramator,
    PCA_result_mount,
    PreprocessData,
    SVM_paramator,
    RF_paramator,
    KNN_Paramator,
    Kmeans_paramator,
  ],
}

export default config
