import * as THREE from 'three';
import { setMaterial } from '../../Story.js';
import { getLathePointsForCircle } from '../../../helpers/latheGeometry.js';
import { colors, reflectivity } from '../../../helpers/colorsAndReflection.js';

class Saturn extends THREE.Group {
  constructor(isDark) {
    super();

    this.isDark = isDark;

    this.color1 = this.isDark ? colors.ShadowedDominantRed : colors.DominantRed
    this.color2 = this.isDark ? colors.ShadowedBrightPurple : colors.BrightPurple;

    this.sphereBigMesh;
    this.ringMesh;

    this.constructChildren();
  }

  constructChildren() {
    this.addSphereBig();
    this.addRing();
  }

  addSphereBig() {
    const sphere = new THREE.SphereGeometry(60, 50, 50);
    this.sphereBigMesh = new THREE.Mesh(sphere, setMaterial({ color: this.color1, ...reflectivity.soft }));

    this.add(this.sphereBigMesh);
  }

  addRing() {
    const points = getLathePointsForCircle((120 -80), 2, 80);

    const ring = new THREE.LatheBufferGeometry(points, 50);
    this.ringMesh = new THREE.Mesh(ring, setMaterial({ color: this.color2, flatShading: true, side: THREE.DoubleSide, ...reflectivity.soft }));
    this.ringMesh.rotation.copy(new THREE.Euler(15 * THREE.Math.DEG2RAD, 0, 0));

    this.add(this.ringMesh);
  }
}

export default Saturn;
