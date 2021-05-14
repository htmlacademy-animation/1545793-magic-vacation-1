import * as THREE from 'three';
import { setMaterial } from '../../Story.js'

class Pyramid extends THREE.Group {
  constructor() {
    super();

    this.color = 0x0062c3;

    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();
  }

  addPyramid() {
    const cone = new THREE.ConeBufferGeometry(Math.hypot(250, 250) / 2, 280, 4);
    const mesh = new THREE.Mesh(cone, setMaterial({ color: this.color, flatShading: true}));
    this.add(mesh);
  }
}

export default Pyramid;
