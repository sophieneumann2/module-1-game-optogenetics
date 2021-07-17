class DemoPlayer {
  constructor(demo, speed, gravity) {
    this.demo = demo;
    this.width = 90;
    this.height = 90;
    this.x = 100;
    this.y = this.demo.canvas.height * 0.8 - this.height;
    this.jumpingStartSpeed = speed;
    this.speedX = 2;
    this.speedY = 0;
    this.GRAVITY = gravity;
    this.enableJumping = true;
    this.doJump = false;
  }

  checkIfDemoPlayerShouldJump() {
    for (let target of this.demo.targets) {
      if (this.x + this.width >= target.x && this.x < target.x + target.width) {
        if (this.targetOfLastJump != target && this.enableJumping) {
          this.doJump = true;
          this.targetOfLastJump = target;
        }
      }
    }
  }

  checkTargetIntersection() {
    let letter = 0;
    for (let target of this.demo.targets) {
      if (
        this.x + this.width >= target.x &&
        this.x <= target.x + target.width &&
        this.y <= target.y + target.height &&
        this.y + this.height >= target.y
      ) {
        //this.demo.collectedTargets.push(target.letter);
        this.demo.targets.splice(letter, 1);
      }
      letter++;
    }
  }

  jumpDemoPlayer() {
    const floorLevel = this.demo.canvas.height * 0.8 - this.height;

    if (
      this.x + this.width <=
      this.demo.targets[this.demo.targets.length - 1].x +
        this.demo.targets[this.demo.targets.length - 1].width
    ) {
      this.x += this.speedX;
    }

    const jumpingSwitchPoint1 = 90 + 2 * (this.demo.targets[0].width + 100);
    const jumpingSwitchPoint2 = 90 + 4 * (this.demo.targets[0].width + 100);

    if (this.x + this.width == jumpingSwitchPoint1) {
      this.jumpingStartSpeed = -45;
      this.GRAVITY = 300;
    } else if (this.x + this.width == jumpingSwitchPoint2) {
      this.jumpingStartSpeed = 0;
    }

    if (this.doJump && this.enableJumping) {
      this.speed = this.jumpingStartSpeed;
      this.enableJumping = false;
    }

    this.checkTargetIntersection();

    this.speed += (this.GRAVITY / 1000) * 16;
    this.y += this.speed;

    if (this.y > floorLevel) {
      this.speed = 0;
      this.y = floorLevel;
      this.doJump = false;
      this.enableJumping = true;
    }
  }

  paintDemoPlayer() {
    const context = this.demo.context;
    context.drawImage(playerImage, this.x, this.y, this.width, this.height);
  }
}
