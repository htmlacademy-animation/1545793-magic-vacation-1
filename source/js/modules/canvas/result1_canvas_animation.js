import ease from '../helpers/easing';
import {Animation} from '../helpers/animations';

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

export default class ResultWin {
  constructor(options) {
    this.canvas = document.querySelector(options.canvas);
    this.ctx = this.canvas.getContext(`2d`);

    this.setCanvasSize(1000, 1000);

    this.size = 1000;

    this.iceImg = new Image();
    this.seaCalfImg = new Image();
    this.snowflake1Img = new Image();
    this.snowflake2Img = new Image();
    this.planeImg = new Image();
    this.tree1Img = new Image();
    this.tree2Img = new Image();

    this.animations = [];

    this.imgsArr = [this.iceImg, this.seaCalfImg, this.snowflake1Img, this.snowflake2Img, this.planeImg, this.tree1Img, this.tree2Img];

    this.ice = {
      img: this.iceImg,
      x: 50,
      y: 70,
      size: 50,
      opacity: 0,
      transforms: {
        translateY: 30,
      }
    };
    this.seaCalf = {
      img: this.seaCalfImg,
      x: 50,
      y: 60,
      size: 50,
      opacity: 0,
      transforms: {
        translateY: 30,
      }
    };
    this.snowflake1 = {
      img: this.snowflake1Img,
      x: 25,
      y: 57,
      size: 20,
      opacity: 0,
      transforms: {

      }
    };
    this.snowflake2 = {
      img: this.snowflake2Img,
      x: 75,
      y: 65,
      size: 15,
      opacity: 0,
      transforms: {
        scaleX: -1,
      }
    };
    this.plume = {
      centerX: 45,
      centerY: 55,
      radius: 15,
      endX: 87,
      endY: 53,
      angle: 45,
      deltasLength: 10,
      opacity: 0
    };
    this.plane = {
      img: this.planeImg,
      x: 90,
      y: 50,
      size: 10,
      opacity: 0,
      transforms: {
        translateY: -10
      }
    };
    this.tree1 = {
      img: this.tree2Img,
      x: 60,
      y: 59,
      size: 5,
      opacity: 0,
      transforms: {
        translateY: 30,
      }
    };
    this.tree2 = {
      img: this.tree1Img,
      x: 65,
      y: 59,
      size: 4,
      opacity: 0,
      transforms: {
        translateY: 30,
      }
    };

    this.loadingCounter = 0;

    this.loadImages();
    this.initEventListeners();

    window.addEventListener(`resize`, () => this.drawResultOnFullScreen());
  }

  increaseLoadingCounter() {
    this.loadingCounter++;

    if (this.loadingCounter === this.imgsArr.length) {
      this.drawScene();
    }
  }

  initEventListeners() {
    this.imgsArr.forEach((img) => {
      img.onload = () => {
        this.increaseLoadingCounter();
      };
    });
  }

  loadImages() {
    this.iceImg.src = `./img/module-4/win-primary-images/ice.png`;
    this.seaCalfImg.src = `./img/module-4/win-primary-images/sea-calf-2.png`;
    this.snowflake1Img.src = `./img/module-4/win-primary-images/snowflake.png`;
    this.snowflake2Img.src = `./img/module-4/win-primary-images/snowflake.png`;
    this.planeImg.src = `./img/module-4/win-primary-images/airplane.png`;
    this.tree1Img.src = `./img/module-4/win-primary-images/tree.png`;
    this.tree2Img.src = `./img/module-4/win-primary-images/tree2.png`;
  }

  drawImage(object) {
    let x = object.x;
    let y = object.y;
    let size = object.size;
    let opacity = object.opacity;
    let image = object.img;
    let transforms = object.transforms;

    let width = this.size * (size / 100);
    let height = this.size * (size / 100) * image.height / image.width;

    x = this.size * (x / 100) - width / 2;
    y = this.size * (y / 100) - height / 2;

    if (opacity === 0) {
      return;
    }

    if (transforms && (transforms.scaleX === 0 || transforms.scaleY === 0)) {
      return;
    }

    this.ctx.save();

    if (transforms) {
      if (transforms.translateX) {
        x += this.size * (transforms.translateX / 100);
      }

      if (transforms.translateY) {
        y += this.size * (transforms.translateY / 100);
      }

      if (transforms.rotate) {
        this.ctx.translate(x + width / 2, y + height / 2);
        this.ctx.rotate(transforms.rotate * Math.PI / 180);
      }

      if (transforms.scaleX) {
        width *= transforms.scaleX;

        if (transforms.scaleX < 0) {
          this.ctx.scale(-1, 1);

          x = -x;
        }
      }

      if (transforms.scaleY) {
        height *= transforms.scaleY;

        if (transforms.scaleY < 0) {
          this.ctx.scale(1, -1);

          y = -y;
        }
      }

      if (transforms.rotate) {
        this.ctx.translate(-x - width / 2, -y - height / 2);
      }
    }

    if (opacity) {
      this.ctx.globalAlpha = opacity;
    }

    this.ctx.drawImage(image, x, y, width, height);

    this.ctx.restore();
  }

  drawPlume() {
    const plume = this.plume;
    const angle = plume.angle * Math.PI / 180;

    if (plume.opacity === 0) {
      return;
    }

    const s = this.size / 100;

    this.ctx.save();
    this.ctx.globalAlpha = plume.opacity;
    this.ctx.fillStyle = `#acc3ff`;

    this.ctx.beginPath();
    this.ctx.arc(
        plume.centerX * s,
        plume.centerY * s,
        plume.radius * s,
        Math.PI / 2,
        Math.PI * 3 / 2
    );
    this.ctx.bezierCurveTo(
        (plume.centerX + 10) * s,
        (plume.centerY - plume.radius) * s,
        (plume.endX - plume.deltasLength * Math.sin(angle)) * s,
        (plume.endY + plume.deltasLength * Math.cos(angle)) * s,
        plume.endX * s,
        plume.endY * s
    );
    this.ctx.bezierCurveTo(
        (plume.endX - plume.deltasLength * Math.sin(angle)) * s,
        (plume.endY + plume.deltasLength * Math.cos(angle)) * s,
        (plume.centerX + 10) * s,
        (plume.centerY + plume.radius) * s,
        plume.centerX * s,
        (plume.centerY + plume.radius) * s
    );

    this.ctx.fill();
    this.ctx.restore();
  }

  drawScene() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawPlume();
    this.drawImage(this.tree1);
    this.drawImage(this.tree2);
    this.drawImage(this.ice);
    this.drawImage(this.seaCalf);
    this.drawImage(this.snowflake1);
    this.drawImage(this.snowflake2);
    this.drawImage(this.plane);
    this.drawResultOnFullScreen();
  }

  drawResultOnFullScreen() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    this.setScaleCanvas(Math.max(windowWidth, windowHeight));
    this.setCanvasToCenter(windowWidth, windowHeight);
  }

  setCanvasSize(width, height) {
    const canvas = this.canvas;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + `px`;
    canvas.style.height = height + `px`;
  }

  setScaleCanvas(size) {
    const canvas = this.canvas;

    canvas.style.transform = `scale(
      ${size / canvas.width * 0.8},
      ${size / canvas.height * 0.8}
    )`;
  }

  setCanvasToCenter(width, height) {
    const canvas = this.canvas;

    const left = (width - canvas.offsetWidth) * 0.5;
    const top = (height - canvas.offsetHeight) * 0.5;

    canvas.style.left = `${left}px`;
    canvas.style.top = `${top}px`;
  }

  iceAndSeaCalfAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.ice.transforms.translateY = 30 * progressReversed;
        this.ice.transforms.rotate = -30 * Math.sin(progressReversed * 2);

        this.seaCalf.transforms.translateY = 30 * progressReversed;
        this.seaCalf.transforms.rotate = -30 * Math.sin(progressReversed * 2);
      },
      delay: 500,
      duration: 2000,
      easing: ease.easeOutElastic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.seaCalf.opacity = progress;
        this.ice.opacity = progress;
      },
      delay: 500,
      duration: 300,
      easing: ease.easeInQuad
    }));
  }

  snowflakesAnimations() {
    this.animations.push(new Animation({
      func: (progress, details) => {
        this.snowflake1.transforms.translateY =
          2 * Math.sin(1.5 * (details.currentTime - details.startTime) / 1000);
      },
      duration: `infinite`
    }));

    this.animations.push(new Animation({
      func: (progress, details) => {
        this.snowflake2.transforms.translateY =
          2 * Math.sin(1.5 * (details.currentTime - details.startTime) / 1000);
      },
      delay: 500,
      duration: `infinite`
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.snowflake1.opacity = progress;
      },
      duration: 1000,
      delay: 800,
      easing: ease.easeInQuad
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.snowflake2.opacity = progress;
      },
      duration: 1000,
      delay: 1200,
      easing: ease.easeInQuad
    }));
  }

  plumeAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.plume.radius = 15 * progress;
        this.plume.centerY = 55 - 15 * progressReversed;
        this.plume.endX = 87 - 35 * progressReversed;
        this.plume.endY = 53 - 12 * progressReversed;
        this.plume.angle = 40 + 120 * progressReversed;
        this.plume.deltasLength = 10 * progress;
        this.plume.opacity = progress;
      },
      duration: 500,
      delay: 1200,
      easing: ease.easeInQuad
    }));
  }

  planeAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.plane.transforms.translateX = -40 * progressReversed;
        this.plane.transforms.translateY =
          5 * Math.sin(Math.PI * progressReversed) - 15 * progressReversed;
        this.plane.transforms.rotate =
          45 * Math.sin(Math.PI * progressReversed) + 45 * progressReversed;
        this.plane.opacity = progress;
      },
      duration: 500,
      delay: 1200,
      easing: ease.easeInQuad
    }));
  }

  treesAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.tree1.transforms.translateY = 30 * (1 - progress);
        this.tree1.opacity = progress;
      },
      duration: 500,
      delay: 1500,
      easing: ease.easeInQuad
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.tree2.transforms.translateY = 30 * (1 - progress);
        this.tree2.opacity = progress;
      },
      duration: 500,
      delay: 1200,
      easing: ease.easeInQuad
    }));
  }

  startAnimation() {
    this.animations.push(new Animation({
      func: () => {
        this.drawScene();
      },
      // duration: 5000,
      duration: `infinite`,
      fps: 60
    }));

    this.iceAndSeaCalfAnimations();
    this.snowflakesAnimations();
    this.plumeAnimations();
    this.planeAnimations();
    this.treesAnimations();

    this.animations.forEach((animation) => {
      animation.start();
    });
  }

  stoptAnimation() {
    this.animations.forEach((animation) => {
      animation.stop();
    });
  }
}
