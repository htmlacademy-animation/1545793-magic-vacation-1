const animations = {
  show: {
    keyframes: [
      {transform: `translate(250px, 250px)rotate(-30deg)`, offset: 0},
      {transform: `translate(0, 0px)rotate(0deg)`, offset: 1},
    ],
    options: {
      duration: 800,
      easing: `ease-out`,
      fill: `forwards`,
    }
  },
  idle: {
    keyframes: [
      {transform: `translate(0, 0px)rotate(0deg)`, offset: 0},
      {transform: `translate(0, 30px)rotate(0deg)`, offset: 1},
    ],
    options: {
      duration: 1200,
      easing: `ease-in-out`,
      fill: `both`,
      iterations: Infinity,
      direction: `alternate`,
    }
  }
};

class SonyaAnimation {
  constructor() {
    this.sonya = document.querySelector(`#sonya`);
  }

  start() {
    if (!this.sonya) {
      return;
    }

    const {show, idle} = animations;
    this.showAnim = this.sonya.animate(...Object.values(show));

    this.showAnim.onfinish = () => {
      this.idle = this.sonya.animate(...Object.values(idle));
    };
  }

  end() {
    this.showAnim.cancel();
    if (this.idle) {
      this.idle.cancel();
    }

    this.showAnim.reverse();
    this.showAnim.play();
  }
}

const sonyaAnimation = new SonyaAnimation();

export default sonyaAnimation;
