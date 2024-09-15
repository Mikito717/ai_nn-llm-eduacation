import Phaser from 'phaser'

class DataSelect extends Phaser.Scene {
  constructor() {
    super({ key: 'DataSelect' })
    this.selected_gold = null
    this.selected_purple = null
    this.selected_blue = null
  }
  Preload() {
    this.data_gold = this.registry.get('gotplanets_gold')
    this.data_purple = this.registry.get('gotplanets_purple')
    this.data_blue = this.registry.get('gotplanets_blue')
  }
  create() {
    //画面の大きさを取得
    const width = this.cameras.main.width
    const height = this.cameras.main.height
    //オーバーレイで表示
    this.add.graphics().fillStyle(0x000000, 0.7).fillRect(0, 0, width, height)
    this.data_gold = 10
    this.data_purple = 10
    this.data_blue = 10

    //消費するデータ量
    this.consumeData_gold = 0
    this.consumeData_purple = 0
    this.consumeData_blue = 0
    //どのデータを選択しているかのフラグ
    this.selectedData = null
    //金のデータを選択するボタン
    this.selectbutton_gold = this.add
      .text(200, 100, '金のデータ', {
        fontSize: '32px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => {
        this.selectedData = 'gold'
      })
      .on('pointerover', () => {
        //マウスオーバーでハイライト（金色）
        this.selectbutton_gold.setStyle({ fill: '#FFD700' })
      })
      .on('pointerout', () => {
        //マウスアウトでハイライト解除
        this.selectbutton_gold.setStyle({ fill: '#fff' })
      })
    this.add.text(200, 155, '消費量', {
      fontSize: '32px',
      fill: '#fff',
    })
    this.goldText = this.add.text(300, 150, this.consumeData_gold, {
      fontSize: '32px',
      fill: '#fff',
    })

    //紫のデータ
    this.selectbutton_purple = this.add
      .text(200, 200, '紫のデータ', {
        fontSize: '32px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => {
        this.selectedData = 'purple'
      })
      .on('pointerover', () => {
        //マウスオーバーでハイライト（紫色）
        this.selectbutton_purple.setStyle({ fill: '#800080' })
      })
      .on('pointerout', () => {
        //マウスアウトでハイライト解除
        this.selectbutton_purple.setStyle({ fill: '#fff' })
      })

    this.add.text(200, 255, '消費量', {
      fontSize: '32px',
      fill: '#fff',
    })
    this.purpleText = this.add.text(300, 250, this.data_purple, {
      fontSize: '32px',
      fill: '#fff',
    })

    //青のデータ
    this.selectbutton_blue = this.add
      .text(200, 300, '青のデータ', {
        fontSize: '32px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => {
        this.selectedData = 'blue'
      })
      .on('pointerover', () => {
        this.selectbutton_blue.setStyle({ fill: '#0000FF' })
      })
      .on('pointerout', () => {
        this.selectbutton_blue.setStyle({ fill: '#fff' })
      })
    this.add.text(200, 355, '消費量', {
      fontSize: '32px',
      fill: '#fff',
    })
    this.blueText = this.add.text(300, 350, this.data_blue, {
      fontSize: '32px',
      fill: '#fff',
    })
    //選択しているデータをハイライト
    if (this.selectedData === 'gold') {
      this.add.text(200, 100, '金のデータ', {
        fontSize: '32px',
        fill: '#ff0',
      })
    } else if (this.selectedData === 'purple') {
      this.add.text(200, 200, '紫のデータ', {
        fontSize: '32px',
        fill: '#ff0',
      })
    } else if (this.selectedData === 'blue') {
      this.add.text(200, 300, '青のデータ', {
        fontSize: '32px',
        fill: '#ff0',
      })
    }

    //データを選択していない場合は、選択してくださいと表示
    if (this.selectedData === null)
      this.notselected = this.add.text(200, 400, 'データを選択してください', {
        fontSize: '32px',
        fill: '#fff',
      })
    this.selecttext = this.add.text(200, 400, '選択中：', {
      fontSize: '32px',
      fill: '#fff',
    })
    this.selecttext.setVisible(false)
    //選択しているデータを表示
    this.selected_gold = this.add.text(350, 400, '金のデータ', {
      fontSize: '32px',
      fill: '#FFD700',
    })
    this.selected_gold.setVisible(false)
    this.selected_purple = this.add.text(350, 400, '紫のデータ', {
      fontSize: '32px',
      fill: '#800080',
    })
    this.selected_purple.setVisible(false)
    this.selected_blue = this.add.text(350, 400, '青のデータ', {
      fontSize: '32px',
      fill: '#0000FF',
    })
    this.selected_blue.setVisible(false)

    //1こ増やす
    const button1 = this.add
      .text(400, 150, '+1', {
        fontSize: '32px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => {
        if (
          this.consumeData_gold < this.data_gold &&
          this.consumeData_gold >= 0 &&
          this.selectedData === 'gold'
        ) {
          this.consumeData_gold += 1
          this.goldText.setText(this.consumeData_gold)
        }
        if (
          this.consumeData_purple < this.data_purple &&
          this.consumeData_purple >= 0 &&
          this.selectedData === 'purple'
        ) {
          this.consumeData_purple += 1
          this.purpleText.setText(this.consumeData_purple)
        }
        if (
          this.consumeData_blue < this.data_blue &&
          this.consumeData_blue >= 0 &&
          this.selectedData === 'blue'
        ) {
          this.consumeData_blue += 1
          this.blueText.setText(this.consumeData_blue)
        }
      })
      .on('pointerover', () => {
        button1.setStyle({ fill: '#ff0', backgroundColor: '#333' })
      })
      .on('pointerout', () => {
        button1.setStyle({ fill: '#fff', backgroundColor: '#000' })
      })
    //1こ減らす
    const button2 = this.add
      .text(500, 150, '-1', {
        fontSize: '32px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => {
        if (
          this.consumeData_gold > 0 &&
          this.selectedData === 'gold' &&
          this.consumeData_gold <= this.data_gold
        ) {
          this.consumeData_gold -= 1
          this.goldText.setText(this.consumeData_gold)
        }
        if (
          this.consumeData_purple > 0 &&
          this.selectedData === 'purple' &&
          this.consumeData_purple <= this.data_purple
        ) {
          this.consumeData_purple -= 1
          this.purpleText.setText(this.consumeData_purple)
        }
        if (
          this.consumeData_blue > 0 &&
          this.selectedData === 'blue' &&
          this.consumeData_blue <= this.data_blue
        ) {
          this.consumeData_blue -= 1
          this.blueText.setText(this.consumeData_blue)
        }
      })
      .on('pointerover', () => {
        button2.setStyle({ fill: '#ff0', backgroundColor: '#333' })
      })
      .on('pointerout', () => {
        button2.setStyle({ fill: '#fff', backgroundColor: '#000' })
      })

    //10こ増やす
    const button3 = this.add
      .text(400, 200, '+10', {
        fontSize: '32px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => {
        if (
          this.selectedData === 'gold' &&
          this.consumeData_gold + 10 <= this.data_gold
        )
          this.consumeData_gold += 10
        this.goldText.setText(this.consumeData_gold)
        if (
          this.selectedData === 'purple' &&
          this.consumeData_purple + 10 <= this.data_purple
        )
          this.consumeData_purple += 10
        this.purpleText.setText(this.consumeData_purple)
        if (
          this.selectedData === 'blue' &&
          this.consumeData_blue + 10 <= this.data_blue
        )
          this.consumeData_blue += 10
        this.blueText.setText(this.consumeData_blue)
      })
      .on('pointerover', () => {
        button3.setStyle({ fill: '#ff0', backgroundColor: '#333' })
      })
      .on('pointerout', () => {
        button3.setStyle({ fill: '#fff', backgroundColor: '#000' })
      })
    //10こ減らす
    const button4 = this.add
      .text(500, 200, '-10', {
        fontSize: '32px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => {
        if (
          this.consumeData_gold > 0 &&
          this.selectedData === 'gold' &&
          this.consumeData_gold <= this.data_gold
        ) {
          this.consumeData_gold -= 10
          this.goldText.setText(this.consumeData_gold)
        }
        if (
          this.consumeData_purple > 0 &&
          this.selectedData === 'purple' &&
          this.consumeData_purple <= this.data_purple
        ) {
          this.consumeData_purple -= 10
          this.purpleText.setText(this.consumeData_purple)
        }
        if (
          this.consumeData_blue > 0 &&
          this.selectedData === 'blue' &&
          this.consumeData_blue <= this.data_blue
        ) {
          this.consumeData_blue -= 10
          this.blueText.setText(this.consumeData_blue)
        }
      })
      .on('pointerover', () => {
        button4.setStyle({ fill: '#ff0', backgroundColor: '#333' })
      })
      .on('pointerout', () => {
        button4.setStyle({ fill: '#fff', backgroundColor: '#000' })
      })
    //最大まで増やす
    const button5 = this.add
      .text(400, 250, 'MAX', {
        fontSize: '32px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => {
        if (this.selectedData === 'gold') {
          this.consumeData_gold = this.data_gold
        }
        if (this.selectedData === 'purple') {
          this.consumeData_purple = this.data_purple
        }
        if (this.selectedData === 'blue') {
          this.consumeData_blue = this.data_blue
        }
      })
      .on('pointerover', () => {
        button5.setStyle({ fill: '#ff0', backgroundColor: '#333' })
      })
      .on('pointerout', () => {
        button5.setStyle({ fill: '#fff', backgroundColor: '#000' })
      })
    //最小まで減らす
    const button6 = this.add
      .text(500, 250, 'MIN', {
        fontSize: '32px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => {
        if (this.selectedData === 'gold') {
          this.consumeData_gold = 0
        }
        if (this.selectedData === 'purple') {
          this.consumeData_purple = 0
        }
        if (this.selectedData === 'blue') {
          this.consumeData_blue = 0
        }
      })
      .on('pointerover', () => {
        button6.setStyle({ fill: '#ff0', backgroundColor: '#333' })
      })
      .on('pointerout', () => {
        button6.setStyle({ fill: '#fff', backgroundColor: '#000' })
      })

    //戻るボタン
    const backButton = this.add

      .text(200, 500, '戻る', {
        fontSize: '48px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => this.scene.start('AIDescription'))
      .on('pointerover', () => {
        backButton.setStyle({ fill: '#ff0', backgroundColor: '#333' })
      })
      .on('pointerout', () => {
        backButton.setStyle({ fill: '#fff', backgroundColor: '#000' })
      })

    //次へボタン
    this.nextButton = this.add

      .text(400, 500, '次へ', {
        fontSize: '48px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => {
        this.registry.set('consumeData_gold', this.consumeData_gold)
        this.registry.set('consumeData_purple', this.consumeData_purple)
        this.registry.set('consumeData_blue', this.consumeData_blue)
        this.scene.start('AIDescription')
      })
      .on('pointerover', () => {
        this.nextButton.setStyle({ fill: '#ff0', backgroundColor: '#333' })
      })
      .on('pointerout', () => {
        this.nextButton.setStyle({ fill: '#fff', backgroundColor: '#000' })
      })
  }

  update(time, delta) {
    //データを選択していない場合は、文章を表示

    if (this.selectedData === null) {
      this.notselected.setVisible(true)
      this.nextButton.setInteractive(false)
    } else {
      this.nextButton.setInteractive(true)
      this.selecttext.setVisible(true)
      //代わりに選択しているデータを表示
      if (this.selectedData === 'gold') {
        this.selected_gold.setVisible(true)
        this.selected_purple.setVisible(false)
        this.selected_blue.setVisible(false)
      } else if (this.selectedData === 'purple') {
        this.selected_gold.setVisible(false)
        this.selected_purple.setVisible(true)
        this.selected_blue.setVisible(false)
      } else if (this.selectedData === 'blue') {
        this.selected_gold.setVisible(false)
        this.selected_purple.setVisible(false)
        this.selected_blue.setVisible(true)
      }

      this.notselected.setVisible(false)
    }

    //消費データ量を表示
    this.goldText.setText(this.consumeData_gold)
    this.purpleText.setText(this.consumeData_purple)
    this.blueText.setText(this.consumeData_blue)
  }
}

export default DataSelect
