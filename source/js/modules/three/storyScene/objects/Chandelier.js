import * as THREE from 'three';
import { setMaterial } from '../../Story.js'
import { getLathePointsForCircle } from '../../../helpers/latheGeometry.js'

class Chandelier extends THREE.Group {
  constructor() {
    super();

    this.color1 = 0xfc2947;
    this.color2 = 0x5b3ea5;
    this.color3 = 0x8388ab;

    this.sphereBigMesh;
    this.ringMesh;
    this.cylinderMesh;
    this.sphereSmallMesh;


    this.constructChildren();
  }

  constructChildren() {
    this.addSphereBig();
    this.addRing();
    this.addCylinder();
    this.addSphereSmall();
  }

  addSphereBig() {
    const sphere = new THREE.SphereGeometry(60, 50, 50);
    this.sphereBigMesh = new THREE.Mesh(sphere, setMaterial({ color: this.color1, flatShading: true }));

    this.add(this.sphereBigMesh);
  }

  addRing() {
    const points = getLathePointsForCircle((120 -80), 2, 80);

    const ring = new THREE.LatheBufferGeometry(points, 50);
    this.ringMesh = new THREE.Mesh(ring, setMaterial({ color: this.color2, flatShading: true, side: THREE.DoubleSide }));
    this.ringMesh.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, 0, 18 * THREE.Math.DEG2RAD), `XYZ`);

    this.add(this.ringMesh);
  }

  addCylinder() {
    const cylinder = new THREE.CylinderBufferGeometry(1, 1, 1000, 10);
    this.cylinderMesh = new THREE.Mesh(cylinder, setMaterial({ color: this.color3, flatShading: true}));

    const topOffset = this.sphereBigMesh.position.y + cylinder.parameters.height / 2;
    this.cylinderMesh.position.set(0, topOffset, 0);
    this.add(this.cylinderMesh);
  }

  addSphereSmall() {
    const sphere = new THREE.SphereGeometry(10, 30, 30);
    this.sphereSmallMesh = new THREE.Mesh(sphere, setMaterial({ color: this.color2, flatShading: true }));

    const topOffset = this.sphereBigMesh.position.y + this.sphereBigMesh.geometry.parameters.radius * 2;
    this.sphereSmallMesh.position.set(this.cylinderMesh.position.x, topOffset, this.cylinderMesh.position.z);
    this.add(this.sphereSmallMesh);
  }
}

export default Chandelier;
