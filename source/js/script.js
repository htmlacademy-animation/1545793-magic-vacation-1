import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import rules from './modules/rules.js';
import lettersAnimation from './modules/letters-animation.js';
import Intro from './modules/three/Intro.js';

mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
rules();
lettersAnimation();

const intro = new Intro();

document.body.addEventListener(`screenChanged`, (e) => {
  if (e.detail.screenName === `top`) {
    intro.init();
  } else {
    intro.stopAnim();
  }
});

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.addEventListener(`load`, () => {
  document.body.classList.add(`page__load`);
});
