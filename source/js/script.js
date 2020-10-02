// modules
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

// init modules
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

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

window.addEventListener('load', () => {
    document.body.classList.add('page__load');
});
