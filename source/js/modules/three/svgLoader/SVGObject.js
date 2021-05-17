import svgLoader from './svgLoader';

class SVGObject {
  constructor(name) {
    this.name = name;
  }

  async getObject() {
    const svgs = await svgLoader;
    const svg = svgs.getObjectByName(this.name);

    return svg;
  }
}

export default SVGObject;
