import * as THREE from 'three';
import { setMaterial } from '../../Story.js'
import { getLathePointsForCircle, getLatheDegrees } from '../../../helpers/latheGeometry.js'

class Rug extends THREE.Group {
  constructor() {
    super();

    this.colorBase = 0x7a5ab2;
    this.colorStrips = 0x583f8c;

    this.baseMesh;

    this.startDeg = 16;
    this.finishDeg = 74;

    this.lengthStrip = (this.finishDeg - this.startDeg) / 7;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase();
    this.addStrips();
  }

  addBase() {
    const points = getLathePointsForCircle(180, 3, 763);
    const { start, length } = getLatheDegrees(this.startDeg, this.finishDeg);

    const base = new THREE.LatheBufferGeometry(points, 50, start, length);
    this.baseMesh = new THREE.Mesh(base, setMaterial({ color: this.colorBase, flatShading: true }));

    this.add(this.baseMesh);
  }

  addStrips() {
    for (let index = 1; index < 6; index += 2) {
      const points = getLathePointsForCircle(180, 3, 763);
      const { start, length } = getLatheDegrees(this.startDeg + this.lengthStrip * index, this.startDeg + this.lengthStrip * (index + 1));

      const sprip = new THREE.LatheBufferGeometry(points, 5, start, length);
      const mesh = new THREE.Mesh(sprip, setMaterial({ color: this.colorStrips, flatShading: true }));
      mesh.position.set(0, 1, 0);
      console.log('000');
      this.add(mesh);
    }
  }
}

export default Rug;
