import * as THREE from 'three';

import Pyramid from './objects/Pyramid.js';
import Lantern from './objects/Lantern.js';

import SVGObject from '../svgLoader/SVGObject.js';

class Scene1Story extends THREE.Group{
  constructor(){
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
    this.addLantern();

    this.loadLeaf1();
    this.loadLeaf2();
  }

  addPyramid(){
    const pyramid = new Pyramid();
    const scale = 0.7;
    pyramid.scale.set(scale, scale, scale);
    pyramid.rotation.copy(new THREE.Euler( 10 * THREE.Math.DEG2RAD, 0, 0, 'XYZ' ));
    pyramid.position.set(-15, -115, 40);

    this.add(pyramid);
  }

  addLantern(){
    const lantern = new Lantern();
    const scale = 0.8;
    lantern.scale.set(scale, scale, scale);
    lantern.rotation.copy(new THREE.Euler( 10 * THREE.Math.DEG2RAD, 20 * THREE.Math.DEG2RAD, 0, 'XYZ' ));
    lantern.position.set(290, -220, 80);

    this.add(lantern);
  }

  async loadLeaf1() {
    const leaf = await new SVGObject(`leaf1-storyScene1`).getObject();
    const scale = 1.9;
    leaf.position.set(-210, 10, 20);
    leaf.scale.set(scale, -scale, scale);
    leaf.rotation.copy(new THREE.Euler(0, 10 * THREE.Math.DEG2RAD, -1 * THREE.Math.DEG2RAD), `XYZ`);
    this.add(leaf);
  }

  async loadLeaf2() {
    const leaf = await new SVGObject(`leaf2-storyScene1`).getObject();
    const scale = 1.2;
    leaf.position.set(-240, -165, 20);
    leaf.scale.set(scale, -scale, scale);
    leaf.rotation.copy(new THREE.Euler(0, 10 * THREE.Math.DEG2RAD, 45 * THREE.Math.DEG2RAD), `XYZ`);
    this.add(leaf);
  }
}

export default Scene1Story;
