const config = {
    type: Phaser.AUTO,
    width: 802,
    height: 455,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
}
let ball;
let cursors
let keyW;
let keyS;
let ballVelocity = 50;
let playerScore = 0;
let computerScore = 0;
let computerScoreText;
let playerScoreText;
let player;
const game = new Phaser.Game(config)

function preload() {
    this.load.image("board", "assets/Board.png")
    this.load.image("ball", "assets/Ball.png")
    this.load.image("player", "assets/Player.png")
    this.load.image("computer", "assets/Computer.png")
    this.load.image("scoreBar", "assets/ScoreBar.png")
    
    
}

function create() {
    cursors = this.input.keyboard.createCursorKeys()
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

    
    this.add.image(401, 227, "board")
    //score bar
    scoreText = this.add.text(372,16,"0:0", {fontSize: "32px", fill: "#fff"})
        
    //ball
    ball = this.physics.add.image(401, 227, "ball")
    ball.setCollideWorldBounds(true)
    ball.setBounce(1)
    ball.setVelocityX(Phaser.Math.Between(100, 200) * Phaser.Math.RND.sign())
    ball.setMaxVelocity(300, 300)

    //player
    player = this.physics.add.image(20, 225, "player")
    player.setCollideWorldBounds(true)
    player.body.immovable = true
    
    //computer
    computer = this.physics.add.image(780, 225, "computer")
    computer.setCollideWorldBounds(true)
    computer.body.immovable = true

    
    

    //collision
    this.physics.add.collider(ball, player, changeDirection, null, this)
    this.physics.add.collider(ball, computer, changeDirection, null, this)

}
function update() {
    //player movements
    if(cursors.up.isDown) {
        computer.setVelocityY(-300)
    }
    else if(cursors.down.isDown) {
        computer.setVelocityY(300)
    }
    else {
        computer.setVelocityY(0)
    }
    if(keyW.isDown) {
        player.setVelocityY(-300)
    }
    else if(keyS.isDown) {
        player.setVelocityY(300)
    }
    else {
        player.setVelocityY(0)
    }

    //scoring
    if(ball.body.blocked.left) { 
        playerScore++
        scoreText.setText(computerScore + ":" + playerScore)
        ballRestart()
    }
    else if(ball.body.blocked.right) {
        computerScore++
        scoreText.setText(computerScore + ":" + playerScore)
        ballRestart()
    }


}

function changeDirection() {
    ballVelocity += 60
    if(ball.body.touching.left) {
        ball.setVelocityY(Phaser.Math.Between(-120, 120))
        ball.setVelocityX(ballVelocity)
    }
    else if(ball.body.touching.right) {
        ball.setVelocityY(Phaser.Math.Between(-120, 120))
        ball.setVelocityX(ballVelocity * -1)
    }
    else {
        ball.setVelocityX(ballVelocity)
        ball -= 20
    }

     

}

function ballRestart() {
    ball.x = 401
    ball.y = 227
    ball.setVelocityX(0)
    ball.setVelocityY(0)
    player.x = 20
    player.y = 225
    computer.x = 780
    computer.y = 225
    ballVelocity = 50

    ball.setVelocityX(Phaser.Math.Between(100, 200) * Phaser.Math.RND.sign())
}
