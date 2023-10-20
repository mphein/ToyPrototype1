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
      frameHeight: 16
    })

  
    this.load.image('tilesetImage', 'tileset.png')
    this.load.tilemapTiledJSON('tilemapJSON', 'area01.json')

  }

  create() {
    const map = this.add.tilemap('tilemapJSON')
    const tileset = map.addTilesetImage('tileset', 'tilesetImage')

    // add layer
    const bgLayer = map.createLayer('Background', tileset, 0, 0)
    const terrainLayer = map.createLayer('Terrain', tileset, 0, 0)

    // add player
    this.character = this.physics.add.sprite(545, 90, 'character', 0)


    // add ghosts
    //
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

    

    // play music
    // pixabay SoulProdMusic Sinister Night / Halloween Trap Hip Hop Music
    this.sound.play('gameBackground', {volume: .25, loop: true});

    // enable collision
    terrainLayer.setCollisionByProperty({collides:true})
    this.physics.add.collider(this.character, terrainLayer)

    // cameras
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(this.character, true, 0.25, 0.25)
    this.physics.world.bounds.setTo(0,0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.setZoom(1.5,1.5)

    //input 
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    this.direction = new Phaser.Math.Vector2(0)
    if (this.cursors.left.isDown) {
      this.direction.x = -1
    } else if (this.cursors.right.isDown) {
      this.direction.x = 1
    }
    if (this.cursors.up.isDown) {
      this.direction.y = -1
    } else if (this.cursors.down.isDown) {
      this.direction.y = 1
    }
    this.direction.normalize()
    this.character.setVelocity(this.VEL * this.direction.x, this.VEL * this.direction.y)
  }
}