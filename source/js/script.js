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
import {setStartScreenTextLine} from './modules/letters-animation.js';
import IntroAndStory from './modules/three/IntroAndStory.js';

mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
rules();
setStartScreenTextLine();

export const introAndStory = new IntroAndStory();
introAndStory.init();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

// window.addEventListener(`load`, () => {
//   document.body.classList.add(`page__load`);
// });
