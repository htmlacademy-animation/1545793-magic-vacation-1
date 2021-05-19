import * as THREE from 'three';
import { setMaterial } from '../../Story.js'
import { getLathePointsForCircle, getLatheDegrees } from '../../../helpers/latheGeometry.js'

class Road extends THREE.Group {
  constructor() {
    super();

    this.colorBase = 0x676f7f;

    this.baseMesh;

    this.startDeg = 0;
    this.finishDeg = 90;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase();
  }

  addBase() {
    const points = getLathePointsForCircle(160, 3, 732);
    const { start, length } = getLatheDegrees(this.startDeg, this.finishDeg);

    const base = new THREE.LatheBufferGeometry(points, 50, start, length);
    this.baseMesh = new THREE.Mesh(base, setMaterial({ color: this.colorBase, flatShading: true }));

    this.add(this.baseMesh);
  }
}

export default Road;
