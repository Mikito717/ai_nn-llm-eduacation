import Phaser from 'phaser';

class PreprocessData extends Phaser.Scene {
    constructor() {
        super({ key: 'PreprocessData' });
    }

    preload() {
        // Load assets here
    }

    create() {
        // create a button for the user to preprocess data for selected AI
        this.add.text(100, 100, 'Preprocess Data for Selected AI', { fill: '#0f0' });

        //欠損値をどのように処理するか選択するボタン
        {
        this.add.text(100, 200, 'Select how to handle missing values', { fill: '#0f0' });
        this.hadle1button=this.add.text(100, 250, '1. Drop rows with missing values', { fill: '#0f0' });
        this.hadle2button=this.add.text(100, 300, '2. Fill missing values with mean', { fill: '#0f0' });
        this.hadle3button=this.add.text(100, 350, '3. Fill missing values with median', { fill: '#0f0' });
        this.hadle4button=this.add.text(100, 400, '4. Fill missing values with mode', { fill: '#0f0' });
        this.hadle5button=this.add.text(100, 450, '5. Fill missing values with constant', { fill: '#0f0' });
        }

        //make the buttons interactive
        {
        this.hadle1button.setInteractive();
        this.hadle2button.setInteractive();
        this.hadle3button.setInteractive();
        this.hadle4button.setInteractive();
        this.hadle5button.setInteractive();
        }

        //make the buttons mouseover
        {
            this.hadle1button.on('pointerover', function() {
            this.setTint(0xff0000);
        });
        this.hadle1button.on('pointerout', function() {
            this.clearTint();
        });
        this.hadle2button.on('pointerover', function() {
            this.setTint(0xff0000);
        });
        this.hadle2button.on('pointerout', function() {
            this.clearTint();
        });
        this.hadle3button.on('pointerover', function() {
            this.setTint(0xff0000);
        });
        this.hadle3button.on('pointerout', function() {
            this.clearTint();
        });
        this.hadle4button.on('pointerover', function() {
            this.setTint(0xff0000);
        });
        this.hadle4button.on('pointerout', function() {
            this.clearTint();
        });
        this.hadle5button.on('pointerover', function() {
            this.setTint(0xff0000);
        });
        this.hadle5button.on('pointerout', function() {
            this.clearTint();
        });
        }

        //click the button to preprocess data
        {
        this.hadle1button.on('pointerdown',prepeocess1,this);
        this.hadle2button.on('pointerdown',prepeocess2,this);
        this.hadle3button.on('pointerdown',prepeocess3,this);
        this.hadle4button.on('pointerdown',prepeocess4,this);
        this.hadle5button.on('pointerdown',prepeocess5,this); 
        }
        this.golddata=this.registry.get('gotplanets_gold');
        this.purpledata=this.registry.get('gotplanets_purple');
        this.bluedata=this.registry.get('gotplanets_blue');
    }

    update(time, delta) {
        // Update your scene here
    }

    preprcess1(){

    }
    preprcess2(){

    }
    preprcess3(){

    }
    preprcess4(){

    }
    preprcess5(){

    }
}

export default PreprocessData;