import * as THREE from 'three';

import SVGObject from '../svgLoader/SVGObject.js';
import Rug from './objects/Rug.js';
import Chandelier from './objects/Chandelier.js';

class Scene3Story extends THREE.Group{
  constructor(){
    super();

    this.isDark = true;

    this.constructChildren();
  }

  constructChildren() {
    this.loadFlower();
    this.addRug();
    this.addChandelier();
  }

    async loadFlower() {
    const flower = await new SVGObject(`flower-storyScene3`).getObject();
    const scale = 0.7;
    flower.position.set(-220, 150, 200);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(0, 40 * THREE.Math.DEG2RAD, 5 * THREE.Math.DEG2RAD), `XYZ`);
    this.add(flower);
  }

  addRug() {
    const rug = new Rug(this.isDark);
    const scale = 0.7;

    rug.scale.set(scale, scale, scale);
    rug.position.set(0, -115, 0);
    rug.rotation.copy(new THREE.Euler(13 * THREE.Math.DEG2RAD, -52 * THREE.Math.DEG2RAD, 0), `XYZ`);
    this.add(rug);
  }

  addChandelier() {
    const chandelier = new Chandelier(this.isDark);
    chandelier.position.set(50, 240, 100);
    this.add(chandelier);
  }
}

export default Scene3Story;
