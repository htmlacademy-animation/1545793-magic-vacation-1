export default () => {
  let rulesItem = document.querySelector(`.rules__list li:last-child`);
  let btnOn = document.querySelector(`.rules__link`);

  rulesItem.addEventListener(`animationend`, () => {
    btnOn.classList.add(`active`);
  });
};
