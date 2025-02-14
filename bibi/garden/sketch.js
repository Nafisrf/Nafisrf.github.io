let flowers = [];
let particles = [];
let loveParticles = [];

function setup() {
  createCanvas(600, 400);
  background(200, 255, 200);
}

function draw() {
  background(200, 255, 200);

  for (let flower of flowers) {
    flower.update();
    flower.show();

    if (millis() - flower.sparkTimer > 2000) {
      for (let i = 0; i < 10; i++) {
        particles.push(new Particle(flower.x, flower.y));
        loveParticles.push(new LoveParticle(flower.x, flower.y));
      }
      flower.sparkTimer = millis();
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }

  for (let i = loveParticles.length - 1; i >= 0; i--) {
    loveParticles[i].update();
    loveParticles[i].show();
    if (loveParticles[i].finished()) {
      loveParticles.splice(i, 1);
    }
  }

  drawBoard();
}

function drawBoard() {
  fill(139, 69, 19);
  stroke(100, 50, 10);
  strokeWeight(4);
  rect(20, 20, 200, 60, 10);

  fill(255);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Bibi's Special Garden ❤️", 120, 50);
}

function mousePressed() {
  let flower = new Flower(mouseX, mouseY, random(15, 25));
  flowers.push(flower);
  for (let i = 0; i < 15; i++) {
    particles.push(new Particle(mouseX, mouseY));
    loveParticles.push(new LoveParticle(mouseX, mouseY));
  }
}

class Flower {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.targetSize = size;
    this.size = 0;
    this.angle = 0;
    this.leafAngle = 0;
    this.sparkTimer = millis();
  }

  update() {
    if (this.size < this.targetSize) {
      this.size += 1;
    }

    this.leafAngle = sin(frameCount * 0.05) * 10;
  }

  show() {
    push();
    stroke(50, 150, 50);
    strokeWeight(4);
    line(this.x, this.y + this.size * 1.5, this.x, this.y + this.size * 4);

    fill(50, 150, 50);
    noStroke();
    push();
    translate(this.x - this.size * 0.8, this.y + this.size * 2.5);
    rotate(radians(this.leafAngle));
    ellipse(0, 0, this.size * 1.2, this.size * 0.6);
    pop();

    push();
    translate(this.x + this.size * 0.8, this.y + this.size * 2.5);
    rotate(radians(-this.leafAngle));
    ellipse(0, 0, this.size * 1.2, this.size * 0.6);
    pop();

    pop();

    this.angle += 0.02;
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    for (let i = 0; i < 16; i++) {
      fill(255, 204, 0);
      stroke(180, 120, 0);
      strokeWeight(2);
      ellipse(0, this.size, this.size * 2, this.size * 0.8);
      rotate(PI / 8);
    }
    fill(80, 50, 20);
    stroke(50, 30, 10);
    strokeWeight(2);
    ellipse(0, 0, this.size * 1.2);
    pop();
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, -5);
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  finished() {
    return this.alpha < 0;
  }

  show() {
    noStroke();
    fill(255, 204, 0, this.alpha);
    ellipse(this.x, this.y, 8);
  }
}

class LoveParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, -3);
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 4;
  }

  finished() {
    return this.alpha < 0;
  }

  show() {
    noStroke();
    fill(255, 0, 100, this.alpha);
    beginShape();
    vertex(this.x, this.y);
    bezierVertex(
      this.x - 6,
      this.y - 6,
      this.x - 12,
      this.y + 4,
      this.x,
      this.y + 12
    );
    bezierVertex(
      this.x + 12,
      this.y + 4,
      this.x + 6,
      this.y - 6,
      this.x,
      this.y
    );
    endShape(CLOSE);
  }
}
