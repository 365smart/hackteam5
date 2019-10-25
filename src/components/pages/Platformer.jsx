import React from 'react';
import Phaser from "phaser";
import QueryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Modal } from '../elements';

import ScoreSound from '../../assets/audio/in.mp3';
import GameOverSound from '../../assets/audio/time.mp3';
import SpawnSound from '../../assets/audio/welcome.mp3';

const getImg = (name) => `https://raw.githubusercontent.com/ohitsdylan/ohitsdylan.github.io/master/assets/${name}`;

// import { Button } from '../elements';
class Audio {
  constructor() {
    this.init();
  }

  init() {
    this.audioElement = document.createElement("AUDIO");                              // Append the text to <p>
    document.body.appendChild(this.audioElement);
  }

  static self = new Audio();
  static play = (audioFile) => {
    console.log("play Audio File", audioFile);
    try {
      if (Audio.self.audioElement && audioFile) {
        Audio.self.audioElement.src = audioFile;
        Audio.self.audioElement.pause();
        Audio.self.audioElement.currentTime = 0;
        Audio.self.audioElement.play();
      }
    } catch(e) {
      console.log("Audio.play() error", audioFile, e);
    }
  }
}

class PhaserScene extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  preload() {
		this.load.image('sky', getImg('sky.png'));
		this.load.image('ground', getImg('platform.png'));
		this.load.image('star', getImg('snack2.png'));
		this.load.image('bomb', getImg('ugh.png'));
		this.load.spritesheet('joe', getImg('joe.png'), {
				frameWidth: 27,
				frameHeight: 64
			}
		);
		this.load.image('up', getImg('up.png'));
		this.load.image('left', getImg('left.png'));
		this.load.image('right', getImg('right.png'));
  }

  create() {
		this.add.image(485, 635, 'sky').setScale(1.123);
		this.platforms = this.physics.add.staticGroup();
		this.platforms.create(430, 1064, 'ground').setScale(3).refreshBody();
		this.platforms.create(510, 900, 'ground');
		this.platforms.create(50, 750, 'ground');
		this.platforms.create(960, 750, 'ground');
		this.platforms.create(530, 600, 'ground');
		this.platforms.create(50, 450, 'ground');
		this.platforms.create(800, 450, 'ground');
		this.platforms.create(480, 320, 'ground');

		const random = Math.floor((Math.random() * 500));
		this.stars = this.physics.add.group({
				key: 'star',
				repeat: 6,
				setXY: { x: 25, y: random, stepX: 150 }
		});

		this.stars.children.iterate(function (child) {

				child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

		});

		this.player = this.physics.add.sprite(480, 250, 'joe');


		this.bombs = this.physics.add.group();
		this.physics.add.collider(this.bombs, this.platforms);
		this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);

		this.spawnInterval = setInterval(() => !isGameOver && this.spawnBomb(), 5000);


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
		this.physics.add.collider(this.stars, this.platforms);
		this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

		this.scoreText = this.add.text(16, 16, `score: ${score}`, { fontSize: '32px', fill: '#000' });

		this.cursors = this.input.keyboard.createCursorKeys();

		this.add.image(500, 1150, 'up')
			.setInteractive()
			.setScale(4)
			.on('pointerdown', () => this.player.setVelocityY(-330) );

		this.add.image(120, 1150, 'left')
			.setInteractive()
			.setScale(4)
			.on('pointerdown', () => this.player.setVelocityX(-1600) );

		this.add.image(900, 1150, 'right')
			.setInteractive()
			.setScale(4)
			.on('pointerdown', () => this.player.setVelocityX(1600) );
  }

	collectStar(player, star) {
			Audio.play(ScoreSound);
	    star.disableBody(true, true);
	    score--;
	    this.scoreText.setText('Score: ' + score);

			if (score === 0) {
						Audio.play(GameOverSound);
				    this.physics.pause();
				    // player.setTint(0xff0000);
				    player.anims.play('turn');
				    this.gameOver = true;
						isGameOver = true;
						clearInterval(this.spawnInterval);
			}

	    if (this.stars.countActive(true) === 0) {
        	this.stars.children.iterate(function (child) {
							child.enableBody(true, child.x, 0, true, true);
	        });

	        this.spawnBomb()
	    }
	}

	spawnBomb() {
		Audio.play(SpawnSound);
		let x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

		let bomb = this.bombs.create(x, 16, 'bomb');
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	}

	hitBomb(player, bomb) {
			Audio.play(GameOverSound);
	    this.physics.pause();
	    player.setTint(0xff0000);
	    player.anims.play('turn');
	    this.gameOver = true;
			isGameOver = true;
			clearInterval(this.spawnInterval);
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
	width: 1024,
	height: 1280,
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
var score = 1000;
var isGameOver = false;

class Platformer extends React.Component {
	state = {
		isGameOver: false
	}

  componentDidMount() {
    let search = this.props.location.search;
    let { price } = QueryString.parse(search);
		score = parseInt(price * 100);
		if (!game) {
			game = new Phaser.Game(config);
		}
		this._mounted = true;
		this.checkForGameOver();
  }

	componentWillUnmount() {
		this._mounted = false;
	}

	checkForGameOver = () => {
		if (this._mounted) {
			if (isGameOver) {
				this.setState({isGameOver: true});
				setTimeout(() => {
					let price = parseFloat(score / 100).toFixed(2);
					window.location.href = `http://localhost:3000/mm?price=${price}`
				}, 4000)
			} else {
				setTimeout(this.checkForGameOver, 1000);
			}
		}
	}


  render() {
		let { isGameOver } = this.state;
    let search = this.props.location.search;
		console.log("isGameOver", isGameOver);
		let { price } = QueryString.parse(search);
		let currentPrice = parseFloat(score / 100).toFixed(2);
		let savings = parseFloat(parseFloat(price) - parseFloat(currentPrice)).toFixed(2)
    return (
      <div>
				<div className="phaserContainer" id="phaser-container"></div>
				{isGameOver && (
					<Modal
						color={score === 0 ? 'success' : 'white'}>
						{score === 0 ? "You Win!" : "GameOver!"}
						<div style={{fontSize: 33}}>You saved ${savings}</div>
					</Modal>
				)}
			</div>
    )
  }
}

export default withRouter(Platformer);
