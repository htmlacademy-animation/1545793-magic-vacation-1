import Swiper from "swiper";
import {introAndStory} from '../script.js';


export default () => {
  let storySlider;

  const setSlider = function () {
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
              introAndStory.setStory(`scene0`);
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              introAndStory.setStory(`scene1`);
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              introAndStory.setStory(`scene2`);
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              introAndStory.setStory(`scene3`);
            }
          },
        },
        observer: true,
        observeParents: true
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0) {
              introAndStory.setStory(`scene0`);
            } else if (storySlider.activeIndex === 2) {
              introAndStory.setStory(`scene1`);
            } else if (storySlider.activeIndex === 4) {
              introAndStory.setStory(`scene2`);
            } else if (storySlider.activeIndex === 6) {
              introAndStory.setStory(`scene3`);
            }
          },
        },
        observer: true,
        observeParents: true
      });
    }
  };

  document.body.addEventListener(`screenChanged`, (e) => {
    if (e.detail.screenName === `story`) {
      if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
        introAndStory.setStory(`fromIntroToScene0`);
        introAndStory.suitcaseIaAnim = true;
      } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
        introAndStory.setStory(`scene1`);
      } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
        introAndStory.setStory(`scene2`);
      } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
        introAndStory.setStory(`scene3`);
      }
    } else {
      introAndStory.setStory(`intro`);
    }
  });

  setSlider();
};
