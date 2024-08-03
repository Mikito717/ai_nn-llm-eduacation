import React, { useEffect } from 'react';
import game from '../phaser';
import Phaser from 'phaser';
import BootScene from '../phaser/scenes/BootScene';
import GameScene0 from '../phaser/scenes/GameScene0';

const GameComponent = () => {
  let game;
  useEffect(() => {
    // Phaserゲームを初期化するためのエフェクト
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-game',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true
        }
      },
      //どのシーンにconfigを適用するか
      scene: [BootScene, GameScene0]
    };
    // ゲームの初期化
    game = new Phaser.Game(config);
    return () => {
      // クリーンアップロジック（ゲームをアンマウントする際）
      if(game) {
        game.destroy(true);
      }
    }
  }, []);

  // シーンチェンジハンドラー
  const changeScene = (sceneKey) => {
    game.scene.start(sceneKey);
  };

  return (
    <div id="phaser-game">
      <button onClick={() => changeScene('BootScene')}>Go to Main Menu</button>
      <button onClick={() => changeScene('GameScene0')}>Start Game</button>
    </div>
  );
};

export default GameComponent;

