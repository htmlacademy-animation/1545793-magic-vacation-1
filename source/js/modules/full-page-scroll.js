import throttle from 'lodash/throttle';
import Timer from './timer';
import NumbersAnimation from './numbersPrizesAnimation.js';
import SonyaAnimation from '../modules/helpers/sonyaAnimation';

// const INTRO_PAGE_ID = 0;
// const STORY_PAGE_ID = 1;
const PRIZE_PAGE_ID = 2;
const RULES_PAGE_ID = 3;
const GAME_PAGE_ID = 4;
let firstStartPagePrixes = true;

export default class FullPageScroll {
  constructor() {
    const gameCounter = document.querySelector(`.game__counter`).children;

    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.bgPrizeElement = document.querySelector(`.bg_prize`);
    this.screenPrizesElement = document.querySelector(`.screen--prizes`);
    this.rules = document.querySelector(`.rules__link`);
    this.svgPrizeOne = document.getElementById(`svgPrizeOne`);
    this.svgPrizeTwo = document.getElementById(`svgPrizeTwo`);
    this.svgPrizeThree = document.getElementById(`svgPrizeThree`);

    this.activeScreen = 0;
    this.prevActiveScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);

    this.ticker = new Timer(gameCounter, 5);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.prevActiveScreen = this.activeScreen;
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    const addActiveScreen = () => {
      this.screenElements.forEach((screen) => {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
      });
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      this.screenElements[this.activeScreen].classList.add(`active`);
    };

    if (this.activeScreen === PRIZE_PAGE_ID) {
      this.bgPrizeElement.classList.add(`active`);
      this.screenPrizesElement.classList.add(`off`);
      setTimeout(() => {
        addActiveScreen();
      }, 500);
    } else {
      this.bgPrizeElement.classList.remove(`active`);
      this.screenPrizesElement.classList.remove(`off`);
      addActiveScreen();
    }

    if (this.activeScreen !== RULES_PAGE_ID) {
      this.rules.classList.remove(`active`);
    }

    if (this.activeScreen === PRIZE_PAGE_ID) {


      if (firstStartPagePrixes) {
        firstStartPagePrixes = false;

        this.svgPrizeOne.src = `img/primary-award-from.svg`;
        this.svgPrizeTwo.src = `img/secondary-award.svg`;
        this.svgPrizeThree.src = `img/additional-award-to.svg`;

        new NumbersAnimation(`.prizes__desc b`, 0, 0, 1, 3).startTimer();

        setTimeout(() => {
          new NumbersAnimation(`.prizes__desc b`, 1, 0, 1, 7).startTimer();
        }, 2500);

        setTimeout(() => {
          new NumbersAnimation(`.prizes__desc b`, 2, 11, 80, 900).startTimer();
        }, 5300);
      }
    }

    if (this.activeScreen === GAME_PAGE_ID) {
      this.ticker.startTimer();
      SonyaAnimation.start();
    }

    if (this.prevActiveScreen === GAME_PAGE_ID) {
      this.ticker.resetTimer();
      this.ticker.stopTimer();
      SonyaAnimation.end();
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
