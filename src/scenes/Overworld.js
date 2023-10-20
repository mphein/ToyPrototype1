class Overworld extends Phaser.Scene {
  constructor() {
    super({key:'overworldScene'})

    this.VEL = 100
  }

  preload() {
    this.load.path = './assets/'
    this.load.audio('gameBackground', 'Background.mp3');

    this.load.spritesheet('ghost', 'ghost.png' , {
      frameWidth: 32,
      frameHeight: 32
    })
    
    this.load.spritesheet('character', 'Character.png', {
      frameWidth: 16,
      frameHeight: 24
    })

  
    this.load.image('tilesetImage', 'tileset.png')
    this.load.tilemapTiledJSON('tilemapJSON', 'area01.json')

  }

  create() {
    // https://szadiart.itch.io/rogue-fantasy-catacombs?download
    const map = this.add.tilemap('tilemapJSON')
    const tileset = map.addTilesetImage('tileset', 'tilesetImage')

    // add layer
    const bgLayer = map.createLayer('Background', tileset, 0, 0)
    const terrainLayer = map.createLayer('Terrain', tileset, 0, 0)

    // add player
    // https://schwarnhild.itch.io/peacefulpixels00
    this.character = this.physics.add.sprite(545, 90, 'character',)
    this.anims.create({
      key: 'walkdown',
      frameRate: 8,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('character', {
        start: 8,
        end: 15
      })
    })

    this.anims.create({
      key: 'walkup',
      frameRate: 8,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('character', {
        start: 15,
        end: 23
      })
    })

    this.anims.create({
      key: 'walkleft',
      frameRate: 8,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('character', {
        start: 0,
        end: 7
      })
    })
    this.anims.create({
      key: 'walkright',
      frameRate: 8,
      repeat: 0,
      frames: this.anims.generateFrameNumbers('character', {
        start: 24,
        end: 31
      })
    })




    // add ghosts
    // https://master-blazter.itch.io/ghostspritepack
    this.ghost1 = this.physics.add.sprite(545, 200, 'ghost')
    this.anims.create({
      key: 'spook',
      frameRate: 8,
      repeat: -1,
      frames: this.anims.generateFrameNumbers('ghost', {
        start: 0,
        end: 3
      })
    })
    this.ghost1.play('spook')
    this.ghost1.setVelocityX(this.VEL * 0.5)


    // make ghost phase in and out
    this.tweens.add({
      targets: this.ghost1,
      alpha: {from: 1, to: 0},
      ease: 'Sine.InOut',
      duration: 1500,
      repeat: -1,
      yoyo: true
    });

    // make ghost go back and forth
    


    this.enemyTimer = this.time.addEvent({
      delay: 1500,
      callback: this.changeEnemyDirection,
      callbackScope: this,
      loop: true
  });

    // this.ghost1.setAlpha(0)

    // play music
    // pixabay SoulProdMusic Sinister Night / Halloween Trap Hip Hop Music
    this.sound.play('gameBackground', {volume: .25, loop: true});

    // enable collision
    terrainLayer.setCollisionByProperty({collides:true})
    this.physics.add.collider(this.character, terrainLayer)
    this.physics.add.collider(this.ghost1, terrainLayer, this.turnAround, null, this)

    this.physics.add.overlap(this.character, this.ghost1, this.ghostCollision, null, this);

    //collision events

    this.ghost1.body.bounce.x = 1;
  


    // cameras
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(this.character, true, 0.25, 0.25)
    this.physics.world.bounds.setTo(0,0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.zoomTo(1.5)
   

    //input 
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    
    this.direction = new Phaser.Math.Vector2(0)
    if (this.cursors.left.isDown) {
      this.direction.x = -1
      this.character.play('walkleft', true)
    } else if (this.cursors.right.isDown) {
      this.direction.x = 1
      this.character.play('walkright', true)
    }
    if (this.cursors.up.isDown) {
      this.direction.y = -1
      this.character.play('walkup', true)

    } else if (this.cursors.down.isDown) {
      this.direction.y = 1
      this.character.play('walkdown', true)
    }
    this.direction.normalize()
    this.character.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
  }

  turnAround(ghost, terrain) {
    ghost.setVelocityX = this.VEL * -1
  }

  // ghostCollision(char, ghost) {
  //   char.
  // }

  

}