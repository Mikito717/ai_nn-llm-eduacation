import Phaser from 'phaser';

class GameScene0 extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene0' });
  }

  preload() {
    this.generateSpaceBackground();

    //宇宙船の画像を読み込む（2枚）
    this.load.image('spaceship', 'assets/rocketimage.png');
    this.load.image('spaceship2', 'assets/rocketimage2.png');
  }

  create() {
    // 背景画像をシーンに追加
    this.stars = this.add.group();

    // 背景としてタイルスプライトを作成
    const width = 800;
    const height = 600;
    this.background = this.add.tileSprite(0, 0, width, height, 'spaceBackground');
    this.background.setOrigin(0, 0);

    //宇宙船の移動速度
    this.spaceshipSpeed = 3;

    // 宇宙船を作成
    this.anims.create({
      key: 'fly',
      frames: [
        { key: 'spaceship' },
        { key: 'spaceship2' }
      ],
      frameRate: 3, // アニメーションのフレームレート
      repeat: -1 // 無限ループ
  });

    // スプライトシート内のフレームを確認
    const frames = this.textures.get('spaceship').getFrameNames();
    console.log('Available frames:', frames);

    //宇宙船をシーンに追加し、アニメーションを再生
    this.spaceship = this.physics.add.sprite(400, 300, 'spaceship');
    this.spaceship.anims.play('fly', true);
  
    //宇宙船の大きさを変更
    this.spaceship.setScale(0.5);

    //カメラが宇宙船を追跡するように設定
    this.cameras.main.startFollow(this.spaceship);

    // キーボード入力を設定
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  update() {
    // ゲームロジック
    this.generateShootingStar();
    this.updateShootingStars();

    //宇宙船の移動速度
    this.spaceship.setVelocity(0);

    //背景の移動速度（宇宙船の移動速度に合わせる）
    const backgroundSpeed = this.spaceshipSpeed;

    // キーボード入力による宇宙船の移動
    if (this.cursors.up.isDown) {
      this.spaceship.setVelocityY(this.spaceshipSpeed * -1);
      this.background.tilePositionY -= backgroundSpeed;
    } else if (this.cursors.down.isDown) {
      this.spaceship.setVelocityY(this.spaceshipSpeed);
      this.background.tilePositionY += backgroundSpeed;
    }
    if (this.cursors.left.isDown) {
      this.spaceship.setVelocityX(this.spaceshipSpeed * -1);
      this.background.tilePositionX -= backgroundSpeed;
    } else if (this.cursors.right.isDown) {
      this.spaceship.setVelocityX(this.spaceshipSpeed);
      this.background.tilePositionX += backgroundSpeed;
    }

    let angle = 0;
    //移動しているかどうかの判定
    if (this.cursors.up.isDown || this.cursors.down.isDown || this.cursors.left.isDown || this.cursors.right.isDown) {
      //宇宙船のアニメーションを再生
      this.spaceship.anims.play('fly', true);
      //宇宙船の向きに合わせて回転
      angle = Math.atan2(this.spaceship.body.velocity.x, -this.spaceship.body.velocity.y);

    } else {
      //宇宙船のアニメーションを停止(spaceshipのフレームで停止)
      this.spaceship.setTexture('spaceship2');
      this.spaceship.anims.stop();
    }

    // 宇宙船の回転を設定
    this.spaceship.setRotation(angle);
  }

  generateSpaceBackground() {
    const width = 800;
    const height = 600;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
  
    // ノイズを生成（閾値よりも小さい場合は完全に黒に設定）
    const threshold = 50;
    const imageData = context.createImageData(width, height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const value = Math.random() * 50;
      if (value < threshold) {
        imageData.data[i] = 0;     // Red
        imageData.data[i + 1] = 0; // Green
        imageData.data[i + 2] = 0; // Blue
      } else {
        imageData.data[i] = value;     // Red
        imageData.data[i + 1] = value; // Green
        imageData.data[i + 2] = value; // Blue
      }
      imageData.data[i + 3] = 255;   // Alpha
    }
    context.putImageData(imageData, 0, 0);

    // 星を追加
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 2;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2, false);
      context.fillStyle = 'white';
      context.fill();
    }

    // PhaserのテクスチャとしてCanvasを使用
    this.textures.addCanvas('spaceBackground', canvas);
  }

  generateShootingStar() {
    if (Math.random() < 0.01) { // 1%の確率で流れ星を生成
      const x = Math.random() * 800;
      const y = Math.random() * 600;
      const star = this.add.circle(x, y, 2, 0xffffff);
      this.stars.add(star);
  
      // 流れ星の速度と方向をランダムに設定
      const speed = Math.random() * 5 + 2; // 流れ星の速度をランダムに設定
      const angle = Math.random() * 2 * Math.PI; // 流れ星の方向をランダムに設定
      star.speedX = speed * Math.cos(angle);
      star.speedY = speed * Math.sin(angle);
    }
  }

  updateShootingStars() {
    this.stars.getChildren().forEach(star => {
      // トレイルを作成
      const trail = this.add.graphics();
      trail.fillStyle(0xffffff, 0.5);
      trail.fillRect(star.x, star.y, star.speedX * 2, star.speedY * 2);

      // トレイルを徐々に消す
      this.tweens.add({
        targets: trail,
        alpha: 0,
        duration: 250,
        onComplete: () => {
          trail.destroy();
        }
      });

      // 流れ星の移動
      star.x += star.speedX;
      star.y += star.speedY;

      // 画面外に出たら破壊
      if (star.y > 600 || star.x > 800 || star.y < 0 || star.x < 0) {
        star.destroy();
      }
    });
  }
}

export default GameScene0;
