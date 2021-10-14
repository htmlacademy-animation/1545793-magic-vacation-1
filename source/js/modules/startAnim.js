import {animStartScreenTextLine} from './letters-animation.js';

export default () => {
  animStartScreenTextLine();
  document.body.classList.add(`page__load`);
  const introText = document.querySelector(`.intro__message__text`);
  introText.classList.add(`intro__message__textAnim`);
  const introLabel = document.querySelector(`.intro__label`);
  introLabel.style.opacity = 1;
  introLabel.style.transition = `1s`;

  document.querySelector(`.progress-bar`).remove();
  document.querySelector(`.overlap`).remove();
};
