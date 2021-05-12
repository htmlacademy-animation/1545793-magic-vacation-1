import ease from '../helpers/easing';
import {Animation} from '../helpers/animations';

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

export default class ResultFail {
  constructor(options) {
    this.canvas = document.querySelector(options.canvas);
    this.ctx = this.canvas.getContext(`2d`);

    this.setCanvasSize(1000, 1000);

    this.size = 1000;

    this.crocodileImg = new Image();
    this.keyImg = new Image();
    this.flamingoImg = new Image();
    this.watermelonImg = new Image();
    this.leafImg = new Image();
    this.snowflakeImg = new Image();
    this.saturnImg = new Image();
    this.dropImg = new Image();

    this.animations = [];
    this.animationsDrop = [];

    this.imgsArr = [this.keyImg, this.crocodileImg];

    this.key = {
      img: this.keyImg,
      x: 50,
      y: 55,
      size: 0,
      opacity: 0,
      transforms: {
      }
    };
    this.crocodile = {
      img: this.crocodileImg,
      x: 49,
      y: 60,
      size: 65,
      opacity: 0,
      transforms: {
        translateX: 30,
        translateY: -15,
      }
    };
    this.mask = {
      centerX: this.key.x,
      centerY: this.key.y,
      opacity: 1,
    };
    this.flamingo = {
      img: this.flamingoImg,
      x: 32,
      y: 50,
      size: 0,
      opacity: 0,
      transforms: {
        translateX: 16,
        translateY: 5,
        rotate: 20
      }
    };
    this.watermelon = {
      img: this.watermelonImg,
      x: 20,
      y: 65,
      size: 0,
      opacity: 0,
      transforms: {
        translateX: 25,
        translateY: -8,
        rotate: 20
      }
    };
    this.leaf = {
      img: this.leafImg,
      x: 76,
      y: 46,
      size: 0,
      opacity: 0,
      transforms: {
        translateX: -26,
        translateY: 10,
        rotate: -20
      }
    };
    this.snowflake = {
      img: this.snowflakeImg,
      x: 65,
      y: 55,
      size: 0,
      opacity: 0,
      transforms: {
        translateX: -15,
        translateY: 0,
        rotate: -20
      }
    };
    this.saturn = {
      img: this.saturnImg,
      x: 75,
      y: 65,
      size: 0,
      opacity: 0,
      transforms: {
        translateX: -25,
        translateY: -10,
        rotate: 20
      }
    };
    this.drop = {
      img: this.dropImg,
      x: 47,
      y: 60.5,
      size: 0,
      opacity: 0,
      transforms: {

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
    this.crocodileImg.src = `./img/module-4/lose-images/crocodile.png`;
    this.keyImg.src = `./img/module-4/lose-images/key.png`;

    this.flamingoImg.src = `./img/module-4/lose-images/flamingo.png`;
    this.watermelonImg.src = `./img/module-4/lose-images/watermelon.png`;
    this.leafImg.src = `./img/module-4/lose-images/leaf.png`;
    this.snowflakeImg.src = `./img/module-4/lose-images/snowflake.png`;
    this.saturnImg.src = `./img/module-4/lose-images/saturn.png`;
    this.dropImg.src = `./img/module-4/lose-images/drop.png`;
  }

  drawMask() {
    const mask = this.mask;
    let width = this.keyImg.widthImg;
    let height = this.keyImg.heightImg;

    if (mask.opacity === 0) {
      return;
    }

    const s = this.size / 100;

    this.ctx.save();
    this.ctx.globalAlpha = mask.opacity;
    this.ctx.fillStyle = `#acc3ff`;

    this.ctx.beginPath();

    // this.ctx.arc(mask.centerX * s, mask.centerY * s, mask.radius * s, 0, 180);
    this.ctx.arc((mask.centerX + width * 0.0008) * s, (mask.centerY - height * 0.0214) * s, width * 0.48, 0, 180);

    this.ctx.moveTo((mask.centerX + width * 0.028) * s, (mask.centerY - height * 0.01) * s);
    this.ctx.lineTo((mask.centerX + width * 0.058) * s, (mask.centerY + height * 0.08) * s);
    this.ctx.lineTo((mask.centerX - width * 0.25) * s, (mask.centerY + height * 0.08) * s);
    this.ctx.lineTo((mask.centerX - width * 0.25) * s, (mask.centerY - height * 0.0495) * s);
    this.ctx.lineTo((mask.centerX - width * 0) * s, (mask.centerY - height * 0.0495) * s);
    // this.ctx.lineTo(mask.width * -2, mask.height * 1.2);
    // this.ctx.lineTo(mask.width * -2, 0);

    this.ctx.globalCompositeOperation = `destination-in`;

    this.ctx.fill();

    this.ctx.restore();
  }

  drawImage(object, origX, origY) {
    let x = object.x;
    let y = object.y;
    let size = object.size;
    let opacity = object.opacity;
    let image = object.img;
    let transforms = object.transforms;

    let width = this.size * (size / 100);
    let height = this.size * (size / 100) * image.height / image.width;

    let originX = 0.5;
    let originY = 0.5;

    if (origX) {
      originX = origX;
    }

    if (origY) {
      originY = origY;
    }

    x = this.size * (x / 100) - width * originX;
    y = this.size * (y / 100) - height * originY;

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

    if (object.mask) {
      this.ctx.globalCompositeOperation = `destination-in`;
      this.ctx.drawImage(image, x, y, width, height);

    } else {
      this.ctx.drawImage(image, x, y, width, height);
    }

    image.widthImg = width;
    image.heightImg = height;

    this.ctx.restore();
  }

  drawScene() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawImage(this.key);
    this.drawImage(this.crocodile);
    this.drawMask();
    this.drawImage(this.flamingo);
    this.drawImage(this.watermelon);
    this.drawImage(this.leaf);
    this.drawImage(this.snowflake);
    this.drawImage(this.saturn);
    this.drawImage(this.drop, 0.5, 0.001);
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

  keyAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.key.opacity = progress;
        this.key.size = 15 * progress;
      },
      duration: 400
      // easing: ease.easeOutElastic
    }));
  }

  crocodileAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.crocodile.transforms.translateX = 30 * progressReversed;
        this.crocodile.transforms.translateY = -15 * progressReversed;

      },
      delay: 950,
      duration: 500,
    }));

    this.animations.push(new Animation({
      func: () => {
        this.crocodile.opacity = 1;
      }
    }));
  }

  flamingoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.flamingo.opacity = progress;
      },
      duration: 100
    }));
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.flamingo.size = 13 * progress;
        this.flamingo.transforms.translateX = 16 * progressReversed;
        this.flamingo.transforms.translateY = 5 * progressReversed;
        this.flamingo.transforms.rotate = 20 * progressReversed;

      },
      easing: ease.easeOutCubic,
      delay: 100,
      duration: 800
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.flamingo.transforms.translateY = 40 * progress;
      },
      easing: ease.easeInCubic,
      delay: 900,
      duration: 600
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.flamingo.opacity = progressReversed;
      },
      delay: 1400,
      duration: 100
    }));

  }

  watermelonAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.watermelon.opacity = progress;
      },
      duration: 100
    }));
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.watermelon.size = 11 * progress;
        this.watermelon.transforms.translateX = 25 * progressReversed;
        this.watermelon.transforms.translateY = -8 * progressReversed;
        this.watermelon.transforms.rotate = 20 * progressReversed;

      },
      easing: ease.easeOutCubic,
      delay: 100,
      duration: 800
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.watermelon.transforms.translateY = 40 * progress;
      },
      easing: ease.easeInCubic,
      delay: 900,
      duration: 600
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.watermelon.opacity = progressReversed;
      },
      delay: 1400,
      duration: 100
    }));

  }

  leafAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.leaf.opacity = progress;
      },
      duration: 100
    }));
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.leaf.size = 15 * progress;
        this.leaf.transforms.translateX = -26 * progressReversed;
        this.leaf.transforms.translateY = 10 * progressReversed;
        this.leaf.transforms.rotate = -20 * progressReversed;

      },
      easing: ease.easeOutCubic,
      delay: 100,
      duration: 800
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.leaf.transforms.translateY = 40 * progress;
      },
      easing: ease.easeInCubic,
      delay: 900,
      duration: 400
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.leaf.opacity = progressReversed;
      },
      delay: 1200,
      duration: 100
    }));

  }

  snowflakeAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.snowflake.opacity = progress;
      },
      duration: 100
    }));
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.snowflake.size = 11 * progress;
        this.snowflake.transforms.translateX = -15 * progressReversed;
        this.snowflake.transforms.translateY = 0 * progressReversed;
        this.snowflake.transforms.rotate = -20 * progressReversed;

      },
      easing: ease.easeOutCubic,
      delay: 100,
      duration: 800
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.snowflake.transforms.translateY = 40 * progress;
      },
      easing: ease.easeInCubic,
      delay: 900,
      duration: 600
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.snowflake.opacity = progressReversed;
      },
      delay: 1400,
      duration: 100
    }));

  }

  saturnAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.saturn.opacity = progress;
      },
      duration: 100
    }));
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.saturn.size = 15 * progress;
        this.saturn.transforms.translateX = -25 * progressReversed;
        this.saturn.transforms.translateY = -10 * progressReversed;
        this.saturn.transforms.rotate = 20 * progressReversed;

      },
      easing: ease.easeOutCubic,
      delay: 100,
      duration: 800
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.saturn.transforms.translateY = 40 * progress;
      },
      easing: ease.easeInCubic,
      delay: 900,
      duration: 600
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.saturn.opacity = progressReversed;
      },
      delay: 1400,
      duration: 100
    }));

  }

  animDrop() {
    this.animationsDrop.push(new Animation({
      func: (progress) => {
        this.drop.size = 3.8 * progress;
        this.drop.opacity = progress;
      },
      duration: 700,
    }));

    this.animationsDrop.push(new Animation({
      func: (progress) => {
        this.drop.transforms.translateY = 8 * progress;
      },
      delay: 700,
      duration: 500,
    }));

    this.animationsDrop.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.drop.size = 3.8 * progressReversed;
        this.drop.opacity = progressReversed;
      },
      delay: 1100,
      duration: 200,
    }));

    this.animationsDrop.push(new Animation({
      func: () => {
        this.drop.transforms.translateY = 0;
      },
      delay: 1200,
      duration: 100
    }));

    this.animationsDrop.forEach((animation) => {
      animation.start();
    });

    setTimeout(() => {
      this.animDrop();
    }, 2500);
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

    this.keyAnimations();
    this.crocodileAnimations();
    this.flamingoAnimations();
    this.watermelonAnimations();
    this.leafAnimations();
    this.snowflakeAnimations();
    this.saturnAnimations();

    setTimeout(() => {
      this.animDrop();
    }, 1500);

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
