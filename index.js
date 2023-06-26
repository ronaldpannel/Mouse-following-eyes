window.addEventListener("load", function () {
  /**@type{HTMLCanvasElement} */
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = this.innerWidth;
  canvas.height = this.innerHeight;
  let eyesArray = [];
  let numOfEyes = canvas.width * 0.1;

  let pointer = {
    x: undefined,
    y: undefined,
  };
  let theta = 0;
  let counter = 0;

  class Eye {
    constructor(x, y, radius) {
      this.radius = radius;
      this.x = x;
      this.y = y;
      this.offset = this.socketRadius * 0.1;
    }
    draw() {
      //eye
      ctx.beginPath();
      ctx.fillStyle = `red`;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      //eyeball
      let eYeball_dx = pointer.x - this.x;
      let eyeball_dy = pointer.y - this.y;
      theta = Math.atan2(eyeball_dy, eYeball_dx);
      let eyeballX = this.x + (Math.cos(theta) * this.radius) / 10;
      let eyeballY = this.y + (Math.sin(theta) * this.radius) / 10;
      let eyeballRadius = this.radius / 1.2;
      ctx.beginPath();
      ctx.fillStyle = `white`;
      ctx.arc(eyeballX, eyeballY, eyeballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();

      //pupil
      let pupilX = this.x + (Math.cos(theta) * this.radius) / 1.9;
      let pupilY = this.y + (Math.sin(theta) * this.radius) / 1.9;
      let pupilRadius = this.radius / 1.2;
      ctx.beginPath();
      ctx.fillStyle = `black`;
      ctx.arc(pupilX, pupilY, pupilRadius / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      // reflection
      ctx.beginPath();
      ctx.fillStyle = `rgb(255,255,255, 0.2)`;
      ctx.arc(pupilX, pupilY, pupilRadius / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      //target
      ctx.beginPath();
      ctx.fillStyle = `orange`;
      ctx.arc(pointer.x, pointer.y, this.radius * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }

  function init() {
    eyesArray = [];
    let overLapping = false;
    let protection = 5000;
    while (eyesArray.length < numOfEyes && counter < protection) {
      let eye = {
        x: Math.floor(Math.random() * (canvas.width - 50 - 50) + 50),
        y: Math.floor(Math.random() * (canvas.height - 50 - 50) + 50),
        radius: Math.random() * 60 + 15,
      };
      overLapping = false;
      for (let i = 0; i < eyesArray.length; i++) {
        let previousEye = eyesArray[i];
        let dx = eye.x - previousEye.x;
        let dy = eye.y - previousEye.y;
        let distance = Math.hypot(dx, dy);
        if (distance < eye.radius + previousEye.radius) {
          overLapping = true;
          break;
        }
      }
      if (!overLapping) {
        eyesArray.push(new Eye(eye.x, eye.y, eye.radius));
      }
      counter++;
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < eyesArray.length; i++) {
      eyesArray[i].draw();
    }

    requestAnimationFrame(animate);
  }
  init();
  animate();

  window.addEventListener("pointermove", (e) => {
    pointer.x = e.x;
    pointer.y = e.y;
  });

  window.addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = this.innerHeight;
    init();
  });
  //load function end
});
