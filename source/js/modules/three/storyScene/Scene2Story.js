import * as THREE from 'three';

import Snowman from './objects/Snowman.js';

class Scene2Story extends THREE.Group{
  constructor(){
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addSnowman();
  }

  addSnowman(){
    const snowman = new Snowman();
    
    snowman.scale.set(0.95, 0.95, 0.95);
    snowman.rotation.copy(new THREE.Euler( 15 * THREE.Math.DEG2RAD, -45 * THREE.Math.DEG2RAD, 0, 'XYZ' ));
    snowman.position.set(-125, -115, 0);

    this.add(snowman);
  }
}

export default Scene2Story;
