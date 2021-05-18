import * as THREE from 'three';

import SVGObject from '../svgLoader/SVGObject.js';
import Rug from './objects/Rug.js';
import Chandelier from './objects/Chandelier.js';

class Scene0Story extends THREE.Group{
  constructor(){
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.loadFlower();
    this.addRug();
    this.addChandelier();
  }

    async loadFlower() {
    const flower = await new SVGObject(`flower-storyScene0`).getObject();
    const scale = 0.7;
    flower.position.set(-220, 150, 200);
    flower.scale.set(scale, -scale, scale);
    flower.rotation.copy(new THREE.Euler(0, 40 * THREE.Math.DEG2RAD, 5 * THREE.Math.DEG2RAD), `XYZ`);
    this.add(flower);
  }

  addRug() {
    const rug = new Rug();
    const scale = 0.7;

    rug.scale.set(scale, scale, scale);
    rug.position.set(0, -115, 0);
    rug.rotation.copy(new THREE.Euler(13 * THREE.Math.DEG2RAD, -52 * THREE.Math.DEG2RAD, 0), `XYZ`);
    this.add(rug);
  }

  addChandelier() {
    const chandelier = new Chandelier();
    const scale = 0.7;

    // chandelier.scale.set(scale, scale, scale);
    chandelier.position.set(50, 240, 100);
    // chandelier.rotation.copy(new THREE.Euler( 20 * THREE.Math.DEG2RAD, 0, 0), `XYZ`);
    this.add(chandelier);
  }
}

export default Scene0Story;
