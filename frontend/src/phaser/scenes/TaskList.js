import Phaser from 'phaser'

class TaskList extends Phaser.Scene {
  constructor() {
    super({ key: 'TaskList' })
  }

  preload() {
    // Load assets here
  }

  create() {
    //Initialize this scene's background color
    this.cameras.main.setBackgroundColor('#000000')
    // Initialize your scene here
    this.add.text(100, 100, 'Task List Scene', {
      font: '24px Arial',
      fill: '#ffffff',
    })

    //Create a button to return to the main menu
    const returnButton = this.add.text(100, 200, 'Return to Main Menu', {
      font: '24px Arial',
      fill: '#ffffff',
    })
    returnButton.setInteractive()
    returnButton.on('pointerdown', () => {
      this.scene.start('MainMenu')
    })

    //Create a button to go to the task cration scene
    const createTaskButton = this.add.text(100, 250, 'Create Task', {
      font: '24px Arial',
      fill: '#ffffff',
    })
    createTaskButton.setInteractive()
    createTaskButton.on('pointerdown', () => {
      this.scene.start('CreateTask')
    })

    //Create a button to go to the task select scene
    const selectTaskButton = this.add.text(100, 300, 'Select Task', {
      font: '24px Arial',
      fill: '#ffffff',
    })
    selectTaskButton.setInteractive()
    selectTaskButton.on('pointerdown', () => {
      this.scene.start('SelectTask')
    })

    //each button will have a pointerover and pointerout event listener to change the color of the text
    returnButton.on('pointerover', () => returnButton.setFill('#ff0'))
    returnButton.on('pointerout', () => returnButton.setFill('#fff'))

    createTaskButton.on('pointerover', () => createTaskButton.setFill('#ff0'))
    createTaskButton.on('pointerout', () => createTaskButton.setFill('#fff'))

    selectTaskButton.on('pointerover', () => selectTaskButton.setFill('#ff0'))
    selectTaskButton.on('pointerout', () => selectTaskButton.setFill('#fff'))
  }

  update(time, delta) {
    // Update your scene here
  }
}

export default TaskList
