import * as THREE from 'three';
import { setMaterial } from '../../Story.js';
import { colors, reflectivity } from '../../../helpers/colorsAndReflection.js';

class Cylinders extends THREE.Group {
  constructor() {
    super();

    this.angle = 15;
    this.step = 15;
    this.radius = 700;

    this.constructCylinders();
  }

  constructCylinders() {

    for (let index = 0; index < 5; index++) {
      const cylinder = new THREE.CylinderBufferGeometry(12, 12, 80, 10);
      this.cylinderMesh = new THREE.Mesh(cylinder, setMaterial({color: colors.Grey, ...reflectivity.soft}));
      const posX = this.radius * Math.cos(this.angle * THREE.Math.DEG2RAD);
      const posZ = this.radius * Math.sin(this.angle * THREE.Math.DEG2RAD);
      this.cylinderMesh.position.set(posX, 0, posZ);
      this.angle += this.step;
      this.add(this.cylinderMesh);
    }

  }
}

export default Cylinders;
