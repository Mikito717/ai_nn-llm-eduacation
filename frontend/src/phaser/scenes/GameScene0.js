import Phaser from 'phaser'

//todo:惑星の獲得数を渡す
//todo(done):基地惑星の機能を追加
//todo(done):惑星の当たり判定を削除する（隠し機能として実装する？カウンタ側で調整する？）
//todo(done):宇宙船の状況を表す各インジケータを追加
//todo(done):shiftキーを押すと、宇宙船が基地惑星に向かって加速する
//todo(done): 矢印のジタリングを解消->Tweenを使って矢印を移動させる
//todo (done): 惑星と宇宙船の衝突判定を追加
//todo（done）: 基地となる惑星を作成する
//todo（done）: 矢印を表示する
//todo（done）: 矢印を宇宙船の周りに表示する//todo(done):宇宙船と惑星が衝突した際に、惑星を獲得する

class GameScene0 extends Phaser.Scene {
  constructor() {
    // シーンのキーを設定
    super({ key: 'GameScene0' })

    //テクスチャキーを管理するためのプロパティ
    this.planetTextureKeyIndex = 0

    //矢印のプロパティ
    this.arrowX = null
    this.arrowY = null

    //宇宙船の各インジケータ
    this.gotplanets_gold = 0
    this.gotplanets_purple = 0
    this.gotplanets_blue = 0
    this.gotplanets =
      this.gotplanets_gold + this.gotplanets_purple + this.gotplanets_blue

    //ポーズしているかどうかのフラグ
    this.isPaused = false

    //backendからのデータを受け取るためのプロパティ
    this.data = null
  }

  preload() {
    this.generateSpaceBackground()

    //宇宙船の画像を読み込む（2枚）
    this.load.image('spaceship', 'assets/rocketimage.png')
    this.load.image('spaceship2', 'assets/rocketimage2.png')

    // 惑星の画像を読み込む
    this.load.image('basePlanet', 'assets/baseplanet.png')
  }

  create() {
    //flaskからデータを受け取る
    fetch('http://localhost:5000/api/get_planet_number', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: this.registry.get('username') }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.data = data[0].trim().split(',')
        this.gotplanets_gold = parseInt(this.data[0], 10) || 0
        this.gotplanets_purple = parseInt(this.data[1], 10) || 0
        this.gotplanets_blue = parseInt(this.data[2], 10) || 0
      })

    //FPSの設定
    this.game.loop.targetFps = 60

    // 背景画像をシーンに追加
    this.stars = this.add.group()

    // 背景としてタイルスプライトを作成
    const width = 800
    const height = 600
    this.background = this.add.tileSprite(
      0,
      0,
      width,
      height,
      'spaceBackground',
    )
    this.background.setOrigin(0, 0)

    //背景がカメラの影響を受けないようにする
    this.background.setScrollFactor(0)

    //惑星を管理するグループを作成
    this.planets = this.physics.add.staticGroup()

    // 宇宙船を作成
    this.anims.create({
      key: 'fly',
      frames: [{ key: 'spaceship' }, { key: 'spaceship2' }],
      frameRate: 3, // アニメーションのフレームレート
      repeat: -1, // 無限ループ
    })

    //宇宙船をシーンに追加し、アニメーションを再生
    this.spaceship = this.physics.add.sprite(400, 300, 'spaceship')
    this.spaceship.anims.play('fly', true)

    //宇宙船の大きさを変更
    this.spaceship.setScale(0.5)

    //宇宙船の当たり判定をリサイズ
    this.spaceship.setCircle(240)
    this.spaceship.setOffset(115, 100)

    //カメラが宇宙船を追跡するように設定
    this.cameras.main.startFollow(this.spaceship)

    // キーボード入力を設定
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      scan: Phaser.Input.Keyboard.KeyCodes.R,
      warp: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      pause: Phaser.Input.Keyboard.KeyCodes.TAB,
      pointdetail: Phaser.Input.Keyboard.KeyCodes.I,
    })

    // ポーズ画面を表示(TAB)
    this.input.keyboard.on('keydown-TAB', () => {
      this.scene.launch('Pause') // ポーズシーンを表示
      this.scene.pause() // 現在のシーンを一時停止
      this.scene.get('Pause').data.set('pausedSceneKey', this.scene.key) // 一時停止したシーンのキーをセット
    })

    // ダッシュ状態を管理するフラグ
    this.isDashing = false

    //マウスの入力を設定
    this.input.mouse.disableContextMenu()
    this.input.on('pointerdown', (pointer) => {
      if (pointer.rightButtonDown()) {
        this.toggleDash()
      }
    })

    //基地となる惑星を生成
    this.generatebasePlanet()

    //矢印のテクスチャを生成
    this.generateArrowTexture()

    //矢印に対して、tweenを設定する関数を作成
    this.createArrowTween = (targetX, targetY) => {
      return this.tweens.add({
        targets: this.arrow,
        x: targetX,
        y: targetY,
        duration: 1000,
        ease: 'Linear',
        repeat: 0,
        yoyo: false,
      })
    }

    // Got Planetsのインジケーターを作成
    this.planetIndicator = this.add.text(
      10,
      10,
      `GOT PLANETS: ${this.gotplanets}`,
      {
        fontSize: '32px',
        fill: '#ffffff',
      },
    )

    //カメラの影響を受けないようにする
    this.planetIndicator.setScrollFactor(0)

    //惑星のグループを作成
    this.planets = this.physics.add.staticGroup()

    //惑星と宇宙船のオーバーラップを検出
    this.physics.add.overlap(
      this.spaceship,
      this.planets,
      this.handleoverlap,
      null,
      this,
    )

    //オーバーラップフラグ
    this.overlapBase = true

    //基地と宇宙船のオーバーラップを検出
    this.physics.add.overlap(
      this.spaceship,
      this.basePlanet,
      this.returntoBasePlanet,
      null,
      this,
    )

    //表示するかどうかのフラグ
    this.isPointDetail = false

    //獲得した惑星の内訳画面を表示(Iを押している間オーバーレイ表示)
    //詳細画面を作成(説明文の色を取得惑星の色と同じにする)
    this.pointDetail = this.add.text(
      400,
      300,
      `GOT PLANETS: \nGOLD: ${this.gotplanets_gold} \nPURPLE: ${this.gotplanets_purple} \nBLUE: ${this.gotplanets_blue}`,
      {
        fontSize: '32px',
        fill: '#ffffff',
      },
    )

    //カメラの影響を受けないようにする
    this.pointDetail.setScrollFactor(0)
  }

  toggleDash() {
    this.isDashing = !this.isDashing
  }

  togglePause() {
    if (this.isPaused) {
      this.scene.resume(this.scene.key)
      this.isPaused = false
      this.pauseText.setVisible(false)
    } else {
      this.scene.pause(this.scene.key)
      this.isPaused = true
      this.pauseText = this.add
        .text(
          this.cameras.main.scrollX + this.cameras.main.width / 2,
          this.cameras.main.scrollY + this.cameras.main.height / 2,
          'PAUSE',
          {
            fontSize: '32px',
            fill: '#ffffff',
          },
        )
        .setOrigin(0.5)
    }
  }

  update() {
    // ゲームロジック
    this.generateShootingStar()
    this.updateShootingStars()

    //宇宙船の速度を0に設定
    this.spaceship.setVelocity(0)

    //宇宙船のインジケーターを更新
    this.pointDetail.setText(
      `GOT PLANETS: \nGOLD: ${this.gotplanets_gold} \nPURPLE: ${this.gotplanets_purple} \nBLUE: ${this.gotplanets_blue}`,
    )
    this.planetIndicator.setText(
      `GOT PLANETS: ${
        this.gotplanets_gold + this.gotplanets_purple + this.gotplanets_blue
      }`,
    )

    // 宇宙船と基地の位置を取得
    const spaceshipPosition = this.spaceship.getCenter()
    const basePlanetPosition = this.basePlanetPosition

    // 基地の方角を計算
    const angleToBasePlanet = Phaser.Math.Angle.BetweenPoints(
      spaceshipPosition,
      basePlanetPosition,
    )

    //Rキーを押すと、基地への方向をスキャン
    if (Phaser.Input.Keyboard.JustDown(this.cursors.scan)) {
      // 矢印の位置を宇宙船の周りの同心円上に設定
      const radius = 100 // 矢印を表示する半径
      this.arrowX = spaceshipPosition.x + radius * Math.cos(angleToBasePlanet)
      this.arrowY = spaceshipPosition.y + radius * Math.sin(angleToBasePlanet)
      // 矢印を表示
      if (!this.arrow) {
        this.arrow = this.add.image(
          //画面中央に固定
          this.cameras.main.scrollX + this.cameras.main.width / 2,
          this.cameras.main.scrollY + this.cameras.main.height / 2,
          'arrow',
        )
        this.arrow.setScale(0.5)
        this.arrow.currentRotation = angleToBasePlanet
      }
      //矢印のtweenを設定
      this.createArrowTween(this.arrowX, this.arrowY)

      //矢印の回転
      this.arrow.currentRotation = Phaser.Math.Angle.RotateTo(
        this.arrow.currentRotation,
        angleToBasePlanet,
      )
      this.arrow.setRotation(this.arrow.currentRotation)
    }

    //同心円状に到達したら、矢印を消す
    if (
      this.arrow &&
      Phaser.Math.Distance.Between(
        this.arrow.x,
        this.arrow.y,
        this.arrowX,
        this.arrowY,
      ) < 1
    ) {
      this.arrow.destroy() // 矢印を削除
      this.arrow = null
    }

    // キーボード入力による宇宙船の移動
    let velocityX = 0
    let velocityY = 0
    const NORMAL_SPEED = 300
    const DASH_SPEED = 600

    if (this.cursors.up.isDown) {
      velocityY = this.isDashing ? -DASH_SPEED : -NORMAL_SPEED
    } else if (this.cursors.down.isDown) {
      velocityY = this.isDashing ? DASH_SPEED : NORMAL_SPEED
    }

    if (this.cursors.left.isDown) {
      velocityX = this.isDashing ? -DASH_SPEED : -NORMAL_SPEED
    } else if (this.cursors.right.isDown) {
      velocityX = this.isDashing ? DASH_SPEED : NORMAL_SPEED
    }

    //速度を正規化する
    if (velocityX !== 0 && velocityY !== 0) {
      velocityX /= Math.sqrt(2)
      velocityY /= Math.sqrt(2)
    }

    this.spaceship.setVelocity(velocityX, velocityY)

    let angle = 0
    //移動しているかどうかの判定
    if (
      this.cursors.up.isDown ||
      this.cursors.down.isDown ||
      this.cursors.left.isDown ||
      this.cursors.right.isDown
    ) {
      //宇宙船のアニメーションを再生
      this.spaceship.anims.play('fly', true)
      //宇宙船の向きに合わせて回転
      angle = Math.atan2(
        this.spaceship.body.velocity.x,
        -this.spaceship.body.velocity.y,
      )
    } else {
      //宇宙船の移動速度
      this.spaceship.setVelocity(0)
      //宇宙船のアニメーションを停止(spaceshipのフレームで停止)
      this.spaceship.setTexture('spaceship2')
      this.spaceship.anims.stop()
    }

    // 宇宙船の回転を設定
    this.spaceship.setRotation(angle)

    //shiftキーを押すと、宇宙船が基地惑星に向かって加速する
    if (this.cursors.warp.isDown) {
      //基地惑星の方向を計算
      const angleToBasePlanet = Phaser.Math.Angle.BetweenPoints(
        spaceshipPosition,
        basePlanetPosition,
      )
      //宇宙船の速度を設定
      this.spaceship.setVelocity(
        DASH_SPEED * Math.cos(angleToBasePlanet),
        DASH_SPEED * Math.sin(angleToBasePlanet),
      )
      //宇宙船のアニメーションを再生
      this.spaceship.anims.play('fly', true)

      //宇宙船の向きに合わせて回転
      angle = Math.atan2(
        this.spaceship.body.velocity.x,
        -this.spaceship.body.velocity.y,
      )
      this.spaceship.setRotation(angle)
    }

    //キャンバスに写っている惑星の数をカウント
    let planetcount = 0
    const canvasWidth = this.cameras.main.width
    const canvasHeight = this.cameras.main.height
    this.planets.getChildren().forEach((planet) => {
      if (
        planet.x > this.cameras.main.scrollX - 100 &&
        planet.x < this.cameras.main.scrollX + canvasWidth + 100 &&
        planet.y > this.cameras.main.scrollY - 100 &&
        planet.y < this.cameras.main.scrollY + canvasHeight + 100
      ) {
        planetcount++
      }
    })

    //console.log(planetcount);
    //カメラ内に映っている惑星の数が少ない場合、新たに惑星を生成
    if (planetcount < 10) {
      this.additionalPlanet()
    }

    //宇宙船と基地惑星の距離を計算
    const distance = Phaser.Math.Distance.Between(
      spaceshipPosition.x,
      spaceshipPosition.y,
      basePlanetPosition.x,
      basePlanetPosition.y,
    )

    //基地からある程度離したら、オーバーラップフラグをfalseにする
    if (distance > 300) {
      this.overlapBase = false
    }

    //Iキーが押されている間、獲得惑星の内訳を表示
    if (this.cursors.pointdetail.isDown) {
      this.isPointDetail = true
      this.pointDetail.setVisible(true)
    } else {
      this.isPointDetail = false
      this.pointDetail.setVisible(false)
    }
  }
  // 惑星を追加する関数(createPlanets()と同様のアルゴリズムだが、カメラ周辺の描画範囲外に生成する）
  additionalPlanet() {
    // ランダムな位置を生成
    const x1 = Phaser.Math.Between(
      this.cameras.main.scrollX - 100,
      this.cameras.main.scrollX,
    )
    const x2 = Phaser.Math.Between(
      this.cameras.main.scrollX + this.cameras.main.width,
      this.cameras.main.scrollX + this.cameras.main.width + 100,
    )
    const y1 = Phaser.Math.Between(
      this.cameras.main.scrollY - 100,
      this.cameras.main.scrollY,
    )
    const y2 = Phaser.Math.Between(
      this.cameras.main.scrollY + this.cameras.main.height,
      this.cameras.main.scrollY + this.cameras.main.height + 100,
    )

    // ランダムな半径を生成 (例: 10から30の間)
    const radius = Phaser.Math.Between(10, 30)

    // グラフィックオブジェクトを作成
    const graphics = this.add.graphics()
    //グラフィックスオブジェクトをクリア
    graphics.clear()
    //ランダム要素を作成するための乱数を生成（3つの離散値を取る）
    const random = Math.random()
    if (random < 0.1) {
      //金色
      graphics.fillStyle(0xffd700, 1)
    } else if (random < 0.4) {
      //紫色
      graphics.fillStyle(0x800080, 1)
    } else {
      //青色
      graphics.fillStyle(0x0000ff, 1)
    }
    graphics.fillCircle(radius, radius, radius) // ランダムな半径で円を描画

    // グラフィックをテクスチャに変換
    this.planetTextureKeyIndex++ // テクスチャキーのインデックスをインクリメント
    // テクスチャキーを生成(惑星の色によって名前を変更)
    let textureKey = ''
    if (random < 0.1) {
      textureKey = `planet${this.planetTextureKeyIndex}_gold`
    } else if (random < 0.4) {
      textureKey = `planet${this.planetTextureKeyIndex}_purple`
    } else {
      textureKey = `planet${this.planetTextureKeyIndex}_blue`
    }
    graphics.generateTexture(textureKey, radius * 2, radius * 2)
    graphics.destroy() // グラフィックオブジェクトを破棄

    // 惑星を作成し、物理エンジンに追加
    const x = Math.random() < 0.5 ? x1 : x2
    const y = Math.random() < 0.5 ? y1 : y2
    this.planet = this.physics.add.staticSprite(x, y, textureKey)

    //惑星の当たり判定をリサイズ
    this.planet.setCircle(radius)

    let overlap = false
    // 惑星同士が重なっていたり、包含していたら、惑星を削除
    this.planets.getChildren().forEach((planet2) => {
      if (this.planet !== planet2) {
        const bounds1 = this.planet.getBounds()
        const bounds2 = planet2.getBounds()

        if (
          Phaser.Geom.Intersects.RectangleToRectangle(bounds1, bounds2) ||
          Phaser.Geom.Rectangle.ContainsRect(bounds1, bounds2) ||
          Phaser.Geom.Rectangle.ContainsRect(bounds2, bounds1) ||
          //baseplanetとの重なりを防ぐ
          Phaser.Math.Distance.Between(this.planet.x, this.planet.y, 400, 300) <
            radius + 173
        ) {
          overlap = true
          this.planet.destroy()
          //テクスチャキーを取得
          const textureKey = this.planet.texture.key
          //テクスチャも削除
          this.textures.removeKey(textureKey)
        }
      }
    })
    //グループに追加
    this.planets.add(this.planet)
    if (overlap) {
      this.planets.remove(this.planet, true, true)
    }
  }

  handleoverlap(spaceship, overlapplanet) {
    //グループからの削除
    this.planets.remove(overlapplanet, true, true)
    //宇宙船と惑星が衝突した際の処理
    overlapplanet.destroy()
    //テクスチャキーを取得
    const textureKey = overlapplanet.texture.key
    //獲得惑星数をインクリメント
    if (textureKey.includes('gold')) {
      this.gotplanets_gold++
    } else if (textureKey.includes('purple')) {
      this.gotplanets_purple++
    } else {
      this.gotplanets_blue++
    }
  }

  returntoBasePlanet = () => {
    //arrow関数が重要
    //基地に戻るかどうかの選択肢を表示
    //console.log('基地に戻りますか？')
    this.registry.set('gotplanets_gold', this.gotplanets_gold)
    this.registry.set('gotplanets_purple', this.gotplanets_purple)
    this.registry.set('gotplanets_blue', this.gotplanets_blue)
    this.registry.set('gotplanets', this.gotplanets)
    if (this.overlapBase) return
    //基地に戻るシーンを表示
    this.scene.launch('ReturntoBasePlanet')
    this.overlapBase = true
    this.scene.pause()
  }

  generateSpaceBackground() {
    const width = 800
    const height = 600
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')

    // 星を追加
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const radius = Math.random() * 2
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2, false)
      context.fillStyle = 'white'
      context.fill()
    }

    // PhaserのテクスチャとしてCanvasを使用
    this.textures.addCanvas('spaceBackground', canvas)
  }

  generateShootingStar() {
    if (Math.random() < 0.01) {
      // 1%の確率で流れ星を生成
      const x = Math.random() * 800
      const y = Math.random() * 600
      const star = this.add.circle(x, y, 2, 0xffffff)
      this.stars.add(star)

      // 流れ星の速度と方向をランダムに設定
      const speed = Math.random() * 5 + 2 // 流れ星の速度をランダムに設定
      const angle = Math.random() * 2 * Math.PI // 流れ星の方向をランダムに設定
      star.speedX = speed * Math.cos(angle)
      star.speedY = speed * Math.sin(angle)
    }
  }

  updateShootingStars() {
    this.stars.getChildren().forEach((star) => {
      // トレイルを作成
      const trail = this.add.graphics()
      trail.fillStyle(0xffffff, 0.5)
      trail.fillRect(star.x, star.y, star.speedX * 2, star.speedY * 2)

      // トレイルを徐々に消す
      this.tweens.add({
        targets: trail,
        alpha: 0,
        duration: 250,
        onComplete: () => {
          trail.destroy()
        },
      })

      // 流れ星の移動
      star.x += star.speedX
      star.y += star.speedY

      // 画面外に出たら破壊
      if (star.y > 600 || star.x > 800 || star.y < 0 || star.x < 0) {
        star.destroy()
      }
    })
  }

  //プレイヤーの基地となる惑星を作成
  generatebasePlanet() {
    //マップの中心に1つだけ基地惑星を生成（惑星の画像はbaseplanet）
    const x = 400
    const y = 300
    const radius = 20
    const graphics = this.add.graphics()
    const textureKey = `basePlanet`
    graphics.generateTexture(textureKey, radius * 2, radius * 2)
    graphics.destroy()
    this.basePlanet = this.physics.add.staticSprite(x, y, textureKey)
    //サイズを変更
    this.basePlanet.setScale(0.5)

    //基地の当たり判定をリサイズ
    this.basePlanet.setCircle(173)
    this.basePlanet.setOffset(195, 185)

    //基地の位置を保存
    this.basePlanetPosition = { x, y }
  }

  //矢印を作成
  generateArrowTexture() {
    const graphics = this.add.graphics()
    graphics.fillStyle(0xffffff, 1)
    graphics.beginPath()
    graphics.moveTo(0, 0)
    graphics.lineTo(50, 25)
    graphics.lineTo(0, 50)
    graphics.lineTo(10, 25)
    graphics.closePath()
    graphics.fillPath()
    graphics.generateTexture('arrow', 50, 50)
    graphics.destroy()
  }
}

export default GameScene0
