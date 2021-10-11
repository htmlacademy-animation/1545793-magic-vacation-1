import * as THREE from 'three';
import {setMaterial} from '../../../helpers/setMaterial';
import {getLathePointsForCircle} from '../../../helpers/latheGeometry.js';
import {colors, reflectivity} from '../../../helpers/colorsAndReflection.js';
import {isShadow} from '../../../helpers/isShadow.js';

class Chandelier extends THREE.Group {
  constructor(isDark, isShadowKey) {
    super();

    this.isDark = isDark;
    this.isShadow = isShadowKey;

    this.color1 = this.isDark ? colors.ShadowedDominantRed : colors.DominantRed;
    this.color2 = this.isDark ? colors.ShadowedBrightPurple : colors.BrightPurple;
    this.color3 = colors.MetalGrey;

    this.constructChildren();
  }

  constructChildren() {
    this.addSphereBig();
    this.addRing();
    this.addCylinder();
    this.addSphereSmall();

    isShadow(this);
  }

  addSphereBig() {
    const sphere = new THREE.SphereGeometry(60, 50, 50);
    this.sphereBigMesh = new THREE.Mesh(sphere, setMaterial({color: this.color1, ...reflectivity.soft}));
    this.sphereBigMesh.position.set(0, -1000, 0);
    this.add(this.sphereBigMesh);
  }

  addRing() {
    const points = getLathePointsForCircle(40, 2, 80);
    const ring = new THREE.LatheBufferGeometry(points, 50);
    this.ringMesh = new THREE.Mesh(ring, setMaterial({color: this.color2, flatShading: true, side: THREE.DoubleSide, ...reflectivity.soft}));
    this.ringMesh.rotation.copy(new THREE.Euler(0, 0, -10 * THREE.Math.DEG2RAD));
    const topOffset = this.sphereBigMesh.position.y;
    this.ringMesh.position.set(0, topOffset, 0);
    this.ringMesh.name = `ring`;
    this.add(this.ringMesh);
  }

  addCylinder() {
    const cylinder = new THREE.CylinderBufferGeometry(1, 1, 1000, 10);
    this.cylinderMesh = new THREE.Mesh(cylinder, setMaterial({color: this.color3, flatShading: true, ...reflectivity.soft}));

    const topOffset = this.sphereBigMesh.position.y + cylinder.parameters.height / 2;
    this.cylinderMesh.position.set(0, topOffset, 0);
    this.add(this.cylinderMesh);
  }

  addSphereSmall() {
    const sphere = new THREE.SphereGeometry(10, 30, 30);
    this.sphereSmallMesh = new THREE.Mesh(sphere, setMaterial({color: this.color2, ...reflectivity.soft}));

    const topOffset = this.sphereBigMesh.position.y + this.sphereBigMesh.geometry.parameters.radius * 2;
    this.sphereSmallMesh.position.set(this.cylinderMesh.position.x, topOffset, this.cylinderMesh.position.z);
    this.add(this.sphereSmallMesh);
  }
}

export default Chandelier;
