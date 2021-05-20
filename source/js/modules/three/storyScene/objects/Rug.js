import * as THREE from 'three';
import { setMaterial } from '../../Story.js';
import { getLathePointsForCircle, getLatheDegrees } from '../../../helpers/latheGeometry.js';

class Rug extends THREE.Group {
  constructor() {
    super();

    this.colorBase = 0x7a5ab2;

    this.baseMesh;

    this.startDeg = 16;
    this.finishDeg = 74;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase();
  }

  addBase() {
    const points = getLathePointsForCircle(180, 3, 763);
    const { start, length } = getLatheDegrees(this.startDeg, this.finishDeg);

    const base = new THREE.LatheBufferGeometry(points, 50, start, length);
    this.baseMesh = new THREE.Mesh(base, setMaterial({ color: this.colorBase, flatShading: true }));

    this.add(this.baseMesh);
  }
}

export default Rug;
