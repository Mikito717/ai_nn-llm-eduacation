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

    //背景がカメラの影響を受けないようにする
    this.background.setScrollFactor(0);

    //惑星を管理するグループを作成
    this.planets = this.physics.add.staticGroup();
    // シーンの初期化時に惑星を生成
    this.createPlanets();

    //宇宙船の移動速度
    this.spaceshipSpeed = 300;

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

    // キーボード入力による宇宙船の移動
    if (this.cursors.up.isDown) {
      this.spaceship.setVelocityY(this.spaceshipSpeed * -1);
    } else if (this.cursors.down.isDown) {
      this.spaceship.setVelocityY(this.spaceshipSpeed);
    }
    if (this.cursors.left.isDown) {
      this.spaceship.setVelocityX(this.spaceshipSpeed * -1);
    } else if (this.cursors.right.isDown) {
      this.spaceship.setVelocityX(this.spaceshipSpeed);
    }

    let angle = 0;
    //移動しているかどうかの判定
    if (this.cursors.up.isDown || this.cursors.down.isDown || this.cursors.left.isDown || this.cursors.right.isDown) {
      //宇宙船のアニメーションを再生
      this.spaceship.anims.play('fly', true);
      //宇宙船の向きに合わせて回転
      angle = Math.atan2(this.spaceship.body.velocity.x, -this.spaceship.body.velocity.y);

    } else {
      //宇宙船の移動速度
      this.spaceship.setVelocity(0);
      //宇宙船のアニメーションを停止(spaceshipのフレームで停止)
      this.spaceship.setTexture('spaceship2');
      this.spaceship.anims.stop();
    }

    // 宇宙船の回転を設定
    this.spaceship.setRotation(angle);

    //キャンバスに写っている惑星の数をカウント
    let planetcount = 0;
    const canvasWidth = this.cameras.main.width;
    const canvasHeight = this.cameras.main.height;
    this.planets.getChildren().forEach(planet => {
      if (planet.x > this.cameras.main.scrollX && planet.x < this.cameras.main.scrollX + canvasWidth && planet.y > this.cameras.main.scrollY && planet.y < this.cameras.main.scrollY + canvasHeight) {
        planetcount++;
        //console.log("惑星がカメラ内にあります");
      }
    });

    //console.log(planetcount);
    //カメラ内に移っている惑星の数が少ない場合、新たに惑星を生成
    if (planetcount < 5) {
      this.createPlanets();
    }
  }

  // 惑星を生成する関数
  createPlanets() {
    const planetCount = 10; // 生成する惑星の数
    for (let i = 0; i < planetCount; i++) {
        // ランダムな位置を生成
        const x = Phaser.Math.Between(this.cameras.main.scrollX, this.cameras.main.scrollX+this.cameras.main.width);
        const y = Phaser.Math.Between(this.cameras.main.scrollY, this.cameras.main.scrollY+this.cameras.main.height);

        // グラフィックオブジェクトを作成
        const graphics = this.add.graphics();
        // 色と透明度を設定(黒、白以外のランダムな色)
        graphics.fillStyle(Phaser.Display.Color.RandomRGB().color, 1); 
        graphics.fillCircle(20, 20, 20); // 円を描画

        // グラフィックをテクスチャに変換
        const textureKey = `planet${i}`;
        graphics.generateTexture(textureKey, 40, 40);
        graphics.destroy(); // グラフィックオブジェクトを破棄

        // 惑星を作成し、物理エンジンに追加
        const planet = this.physics.add.staticSprite(x, y, textureKey);
        
        // 惑星オーバーラップを検出
        //this.physics.add.overlap(this.spaceship, planet, this.handleoverlap, null, this);

        //グループに追加
        this.planets.add(planet);
    }
  }

  handleoverlap() {
    console.log('惑星に衝突しました');
  }


  generateSpaceBackground() {
    const width = 800;
    const height = 600;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

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
