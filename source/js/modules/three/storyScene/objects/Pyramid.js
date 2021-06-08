import * as THREE from 'three';
import { setMaterial } from '../../Story.js';
import { colors, reflectivity } from '../../../helpers/colorsAndReflection.js';
import { isShadow } from '../../../helpers/isShadow.js';

class Pyramid extends THREE.Group {
  constructor(isShadow) {
    super();

    this.isShadow = isShadow;

    this.constructChildren();
  }

  constructChildren() {
    this.addPyramid();

    isShadow(this);
  }

  addPyramid() {
    const cone = new THREE.ConeBufferGeometry(Math.hypot(250, 250) / 2, 280, 4);
    const mesh = new THREE.Mesh(cone, setMaterial({ color: colors.Blue, ...reflectivity.soft, flatShading: true}));
    this.add(mesh);
  }
}

export default Pyramid;
