const socket = io()
let vMad = 15
let vBcn = 15
let vLis = 15
socket.on('Mad', (msg) => {
  vMad = msg
})
socket.on('Bcn', (msg) => {
  vBcn = msg
})
socket.on('Lis', (msg) => {
  vLis = msg
})

const lines = 100

let vumeter1, vumeter2
let cB = '#00ACED'
let cM = '#005EB8'
let cL = '#002677'
let img, clap

function preload() {
  img = loadImage('logo.png')
  clap = createImg('clapGif.gif')
  clap.size(150, 150)
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  vumeter1 = new Vumeter(0, 0, cM, 'MAD')
  vumeter2 = new Vumeter(width / 3, 0, cB, 'BCN')
  vumeter3 = new Vumeter((width / 3) * 2, 0, cL, 'LIS')
}

function draw() {
  fill(255, 50)
  rect(0, 0, width, height)
  vumeter1.display(vMad)
  vumeter2.display(vBcn)
  vumeter3.display(vLis)
  stroke(255)
  strokeWeight(5)
  line(0, height / 1.3, width, height / 1.3)
  image(img, width - (img.width / 2) * 2.8, 30)
  clap.position(width / 2 - clap.width / 2, 20)
  textSize(20)
  fill(242, 103, 123)
  text('~ MAX DB', 80, 280)
  stroke(242, 103, 123)
  strokeWeight(3)
  line(0, 300, width, 300)
  noStroke()
}

class Vumeter {
  constructor(x, y, c, t) {
    this.x = x
    this.y = y
    this.c = c
    this.t = t
    this.lineHeights = []
    this.lineSpeeds = []
    for (let x = 0; x < lines; x++) {
      this.lineHeight = random(height)
      this.lineHeights[x] = this.lineHeight
      this.lineSpeeds[x] = random(-10, 10)
    }
  }

  display(v) {
    for (let i = 0; i < lines; i++) {
      this.lineHeights[i] += this.lineSpeeds[i]
      if (this.lineHeights[i] < 0 || this.lineHeights[i] > height) {
        this.lineSpeeds[i] *= -1
      }
      let x = this.x + (width / 3) * (i / lines)
      let lineWidth = width / 3 / lines
      fill(this.c)
      rect(x, height / 1.3 - this.lineHeights[i] / v, lineWidth, this.lineHeights[i] / v, 30)
      fill(119, 121, 124, 10)
      noStroke()
      rect(x, height / 1.3, lineWidth, this.lineHeights[i] / v / 4, 30)
    }

    strokeWeight(1)
    fill(0, 94, 184)
    textSize(28)
    textAlign(CENTER)
    text(this.t, this.x + width / 6, height - 120)
    noStroke()
  }
}
