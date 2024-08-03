import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene',active:true });
  }

  preload() {
    this.load.image("back", "./assets/bootimage.jpg");

    // ロード完了イベントをリッスン
    this.load.on('complete', () => {
      const file = this.textures.get('back').source[0].url;
      if (file) {
        console.log(`Image "back" loaded successfully. Path: ${file}`);
      } else {
        console.log('Image "back" loaded successfully, but file path could not be determined.');
      }
    });

    // ロードエラーイベントをリッスン
    this.load.on('loaderror', (file) => {
      console.error(`Failed to load file: ${file.key}`);
    });
  }

  create() {
    this.add.text(20, 20, 'Booting game...');
    this.add.image(400, 300, 'back');
    this.scene.start('GameScene0');
  }
}

export default BootScene;
