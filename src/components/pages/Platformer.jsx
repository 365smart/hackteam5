import React from 'react';
import Phaser from "phaser";

const SkyImg = 'https://raw.githubusercontent.com/ohitsdylan/ohitsdylan.github.io/master/assets/sky.png';
const GroundImg = 'https://raw.githubusercontent.com/ohitsdylan/ohitsdylan.github.io/master/assets/platform.png';
const JoeImg = 'https://raw.githubusercontent.com/ohitsdylan/ohitsdylan.github.io/master/assets/joe.png';
// import { Button } from '../elements';

class PhaserScene extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  preload() {
		this.load.image('sky', SkyImg);
		this.load.image('ground', GroundImg);
		this.load.spritesheet('joe', JoeImg, {
				frameWidth: 64,
				frameHeight: 128
			}
		);
  }

  create() {
		this.add.image(400, 300, 'sky');
		this.platforms = this.physics.add.staticGroup();
		this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
		this.platforms.create(600, 400, 'ground');
		this.platforms.create(50, 250, 'ground');
		this.platforms.create(750, 220, 'ground');
		this.player = this.physics.add.sprite(100, 450, 'joe');
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('joe', {
				start: 0,
				end: 3
			}),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: 'turn',
			frames: [{
				key: 'joe',
				frame: 4
			}],
			frameRate: 20
		});
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('joe', {
				start: 5,
				end: 8
			}),
			frameRate: 10,
			repeat: -1
		});
		this.physics.add.collider(this.player, this.platforms);
		this.cursors = this.input.keyboard.createCursorKeys();
  }

	update() {
		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-160);
			this.player.anims.play('left', true);
		} else if (this.cursors.right.isDown) {
			this.player.setVelocityX(160);
			this.player.anims.play('right', true);
		} else {
			this.player.setVelocityX(0);
			this.player.anims.play('turn');
		}
		if (this.cursors.up.isDown && this.player.body.touching.down) {
			this.player.setVelocityY(-330);
		}
	}
}

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	parent: 'phaser-container',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 300
			},
			debug: false
		}
	},
	scene: PhaserScene
};

var game;

export default class Platformer extends React.Component {
  componentDidMount() {
		if (!game) {
			game = new Phaser.Game(config);
		}
  }


  render() {
    return (
      <div className="phaserContainer" id="phaser-container"></div>
    )
  }
}
