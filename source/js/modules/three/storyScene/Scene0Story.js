import * as THREE from 'three';

import SVGObject from '../svgLoader/SVGObject.js';

class Scene0Story extends THREE.Group{
  constructor(){
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.loadFlower();
  }
    async loadFlower() {
    const flower = await new SVGObject(`flower-storyScene0`).getObject();
    const scale = 0.7;
    flower.position.set(-220, 150, 200);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(0, 40 * THREE.Math.DEG2RAD, 5 * THREE.Math.DEG2RAD), `XYZ`);
    this.add(flower);
  }
}

export default Scene0Story;
