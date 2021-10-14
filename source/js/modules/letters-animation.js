let animationTopScreenTextLine;
let animationDateTextLine;


class AccentTypographyBuild {
  constructor(elementSelector, timer, classForActivate, property) {
    this._TIME_SPACE = 100;
    this._elementSelector = elementSelector;
    this._timer = timer;
    this._classForActivate = classForActivate;
    this._property = property;
    this._element = document.querySelector(this._elementSelector);
    this._timeOffset = 100;
    this.prePareText();
  }

  createElement(letter, index) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.style.transition = `${this._property} ${this._timer}ms ease ${this._timeOffset}ms`;
    if ((index % 5) === 0) {
      this._timeOffset = 300;
    } else if ((index % 3) === 0) {
      this._timeOffset = 200;
    } else if ((index % 2) === 0) {
      this._timeOffset = 250;
    } else {
      this._timeOffset = 150;
    }
    return span;
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    const text = this._element.textContent.trim().split(` `).filter((latter) => latter !== ``);

    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, latter, index) => {
        fragment.appendChild(this.createElement(latter, index));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._classForActivate);
  }

  destroyAnimation() {
    this._element.classList.remove(this._classForActivate);
  }
}

export function setStartScreenTextLine() {
  animationTopScreenTextLine = new AccentTypographyBuild(`.intro__title`, 500, `active`, `transform`);
  animationDateTextLine = new AccentTypographyBuild(`.intro__date`, 500, `active`, `transform`);
}

export function animStartScreenTextLine() {
  setTimeout(() => {
    animationTopScreenTextLine.runAnimation();
  }, 200);
  setTimeout(() => {
    animationDateTextLine.runAnimation();
  }, 300);
}
