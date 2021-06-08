import _ from './easing.js';
import { activeScene } from '../three/Story.js';

export class Animation {
  constructor(options) {
    this.options = options;

    if (!this.options.easing) {
      this.options.easing = _.easeLinear;
    }

    if (!this.options.duration) {
      this.options.duration = 1000;
    }

    if (!this.options.delay) {
      this.options.delay = 0;
    }

    if (!this.options.fps) {
      this.options.fps = 60;
    }

    this.timeoutId = null;
    this.requestId = null;
  }

  start(options) {
    this.stop();

    this.timeoutId = setTimeout(() => {
      this.startTime = performance.now();
      this.interval = 1000 / this.options.fps;
      this.lastFrameTime = this.startTime;
      this.isFinished = false;

      let animateFrame;

      if (this.options.duration === `infinite`) {
        animateFrame = (currentTime) => {
          this.requestId = requestAnimationFrame(animateFrame);

          const delta = currentTime - this.lastFrameTime;

          if (delta > this.interval) {
            this.options.func(1, {
              startTime: this.startTime,
              currentTime,
              isFinished: false,
              options
            });

            this.lastFrameTime = currentTime - delta % this.interval;
          }
        };
      } else {
        animateFrame = (currentTime) => {
          this.requestId = requestAnimationFrame(animateFrame);

          const delta = currentTime - this.lastFrameTime;

          if (delta > this.interval) {
            let timeFraction = (currentTime - this.startTime) / this.options.duration;

            if (timeFraction > 1) {
              timeFraction = 1;
              this.isFinished = true;
            }

            if (timeFraction <= 1) {
              const progress = this.options.easing(timeFraction);

              this.options.func(progress, {
                startTime: this.startTime,
                currentTime,
                isFinished: this.isFinished,
                options
              });

              this.lastFrameTime = currentTime - delta % this.interval;
            }

            if (this.isFinished) {
              this.stop();

              if (typeof this.options.callback === `function`) {
                this.options.callback();
              }
            }
          }
        };
      }

      this.requestId = requestAnimationFrame(animateFrame);
    }, this.options.delay);
  }

  restart() {
    this.start();
  }

  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }
  }
}

export const animateWithFPS = (render, duration, fps, endCB = () => { }) => {
  let start = null;
  let lastFrameUpdateTime = null;
  let timeSinceLastUpdate = null;

  function loop(currentTime) {
    if (!start) {
      start = currentTime;
    }

    if (!lastFrameUpdateTime) {
      lastFrameUpdateTime = currentTime;
    }

    let progress = (currentTime - start) / duration;
    if (progress > 1) {
      render(1);
      endCB();
      return;
    }

    timeSinceLastUpdate = currentTime - lastFrameUpdateTime;
    if (timeSinceLastUpdate > fps) {
      lastFrameUpdateTime = currentTime;
      render(progress);
    }
    if (activeScene === 1) {
      requestAnimationFrame(loop);
    }
  }

  loop();
};

export const tick = (from, to, progress) => from + progress * (to - from);

export const animateScale = (item, start, finish, duration, ease, endCB = () => { }) => {
  let progress = 0;
  let startTime = Date.now();

  function loop(){

    progress = (Date.now() - startTime) / duration;

    const easing = _[`${ease}`](progress);
  
    const scaleX = tick(start[0], finish[0], easing);
    const scaleY = tick(start[1], finish[1], easing);
    const scaleZ = tick(start[2], finish[2], easing);
  
    const scale = [scaleX, scaleY, scaleZ];
  
    if (progress > 1) {
      endCB();
      return
    }
  
    item.scale.set(...scale);

    requestAnimationFrame(loop);
  }

  loop();
}

export const animateMove = (item, start, finish, duration, ease, endCB = () => { }) => {
  let progress = 0;
  let startTime = Date.now();

  function loop(){

    progress = (Date.now() - startTime) / duration;

    const easing = _[`${ease}`](progress);
  
    const positionX = tick(start[0], finish[0], easing);
    const positionY = tick(start[1], finish[1], easing);
    const positionZ = tick(start[2], finish[2], easing);
  
    const position = [positionX, positionY, positionZ];
  
    if (progress > 1) {
      endCB();
      return
    }
  
    item.position.set(...position);

    requestAnimationFrame(loop);
  }

  loop();
}

export const animareFluctuation = (item, amp, period) => {
  let progress = 0;
  let startTime = Date.now();

  function loop(){

    progress = (Date.now() - startTime) * 0.0001;

    item.position.y = item.position.y + amp * Math.sin((2 * Math.PI * progress) / period);

    requestAnimationFrame(loop);
  }

  loop();
}
