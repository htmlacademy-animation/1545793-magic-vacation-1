import svgConfig from './svgConfig.js';

class SVGObject {
  constructor(name) {
    this.name = name;
  }

  getObject() {
    const svg = svgConfig.find((obj) => {
      return obj.name === this.name;
    });
    return svg;
  }
}

export default SVGObject;
