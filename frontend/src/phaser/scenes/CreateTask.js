import Phaser from 'phaser'

class CreateTask extends Phaser.Scene {
  constructor() {
    super({ key: 'CreateTask' })
  }

  preload() {
    // Load assets here
  }

  create() {
    // Initialize your scene here
    this.add.text(100, 100, 'Create Task', {
      font: '24px Arial',
      fill: '#ffffff',
    })

    //create the input field
    const inputField = document.createElement('input')
    inputField.type = 'text'
    inputField.placeholder = 'Enter Task Here'
    inputField.style.position = 'absolute'
    inputField.style.left = '100px'
    inputField.style.top = '150px'
    inputField.style.width = '200px'
    inputField.style.height = '30px'
    inputField.style.fontSize = '24px'
    inputField.style.fontFamily = 'Arial'
    document.body.appendChild(inputField)

    //add event listener to the input field
    inputField.addEventListener('input', (event) => {
      console.log(event.target.value)
    })
  }

  update(time, delta) {
    // Update your scene here
  }

  shutdown() {
    // Cleanup your scene here
    //remove the input field from the DOM
    if (this.inputField)
      document.body.removeChild(document.querySelector('input'))
  }
}

export default CreateTask
