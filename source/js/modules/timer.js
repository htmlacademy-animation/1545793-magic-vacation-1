export default class Timer {
  constructor(gameCounter, dur) {
    this.minutes = gameCounter[0];
    this.seconds = gameCounter[1];
    this.duration = dur * 60 * 1000;
    // this.timerActive;
    this.fps = 10;
    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();
    // this.elapsed;
  }

  startTimer() {
    this.startTime = Date.now();
    this.tick();
  }

  restartTicker() {
    if (typeof this.tickerRequest === `undefined`) {
      this.startTimer();
    }
  }

  stopTimer() {
    cancelAnimationFrame(this.tickerRequest);
    this.tickerRequest = undefined;
  }

  resetTimer() {
    this.stopTimer();
    this.minutes.innerText = `00`;
    this.seconds.innerText = `00`;
  }

  tick() {
    this.tickerRequest = requestAnimationFrame(() => {
      let nowTime = Date.now();
      const time = this.duration - (nowTime - this.startTime);
      let textMin = parseInt((time / (1000 * 60)) % 60, 10);
      let textSec = parseInt((time / 1000) % 60, 10);

      const now = Date.now();
      this.elapsed = now - this.then;

      if (this.elapsed > this.fpsInterval) {
        this.then = now - (this.elapsed % this.fpsInterval);

        this.setTime(textSec, textMin);

        if ((textMin === 0 && textSec === 0) || textMin < 0 || textSec < 0) {
          this.resetTimer();
        }
      }
      this.tick();
    });
  }

  setTime(textSec, textMin) {
    if (textMin < 10) {
      this.minutes.innerText = `0${textMin}`;
    } else {
      this.minutes.innerText = textMin;
    }
    if (textSec < 10) {
      this.seconds.innerText = `0${textSec}`;
    } else {
      this.seconds.innerText = textSec;
    }
  }
}
