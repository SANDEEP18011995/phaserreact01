import Phaser from "phaser";
import React, { useEffect } from "react";

const PhaserGame = ({ onGameEnd }) => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 400,
      height: 300,
      parent: "phaser-container",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
        },
      },
      scene: {
        preload: function () {
          this.load.image("ball", "https://via.placeholder.com/20");
        },
        create: function () {
          this.ball = this.physics.add.sprite(200, 150, "ball");
          this.ball.setCollideWorldBounds(true);
          this.ball.setBounce(1);
          this.ball.setVelocity(
            Phaser.Math.Between(-200, 200),
            Phaser.Math.Between(-200, 200)
          );
        },
        update: function () {
          // Ball moves automatically; no extra logic needed.
        },
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
      if (onGameEnd) onGameEnd();
    };
  }, [onGameEnd]);

  return <div id="phaser-container"></div>;
};

export default PhaserGame;
