import * as THREE from 'three';

import Pyramid from './objects/Pyramid.js';
import Lantern from './objects/Lantern.js';

class Scene1Story extends THREE.Group{
  constructor(){
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
    this.addLantern();
  }

  addPyramid(){
    const pyramid = new Pyramid();
    
    pyramid.scale.set(0.35, 0.35, 0.35);
    pyramid.rotation.copy(new THREE.Euler( 10 * THREE.Math.DEG2RAD, 0, 0, 'XYZ' ));
    pyramid.position.set(-8, -60, 15);

    this.add(pyramid);
  }

  addLantern(){
    const lantern = new Lantern();
    
    lantern.scale.set(0.42, 0.42, 0.42);
    lantern.rotation.copy(new THREE.Euler( 10 * THREE.Math.DEG2RAD, 20 * THREE.Math.DEG2RAD, 0, 'XYZ' ));
    lantern.position.set(150, -115, 15);

    this.add(lantern);
  }
}

export default Scene1Story;
