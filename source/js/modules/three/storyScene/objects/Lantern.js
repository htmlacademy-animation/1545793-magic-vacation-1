import * as THREE from 'three';
import {setMaterial} from '../../../helpers/setMaterial';
import {colors, reflectivity} from '../../../helpers/colorsAndReflection.js';
import {isShadow} from '../../../helpers/isShadow.js';

class Lantern extends THREE.Group {
  constructor(isShadowKey) {
    super();

    this.color1 = colors.Blue;
    this.color2 = colors.LightBlue;

    this.isShadow = isShadowKey;

    this.name = `Lantern`;

    this.constructChildren();
  }

  constructChildren() {
    this.addBaseCylinder();
    this.addSphere();
    this.addCentreCylinder();
    this.addBox();
    this.addTrapezoid();
    this.addTrapezoidTop();

    isShadow(this);
  }

  addBaseCylinder() {
    const cylinder = new THREE.CylinderBufferGeometry(16, 16, 120, 30);
    this.cylinderMesh = new THREE.Mesh(cylinder, setMaterial({color: this.color1, ...reflectivity.soft}));
    this.add(this.cylinderMesh);
  }

  addSphere() {
    const sphere = new THREE.SphereGeometry(16, 30, 30);
    this.sphereMesh = new THREE.Mesh(sphere, setMaterial({color: this.color1, ...reflectivity.soft, flatShading: true}));

    const topOffset = this.cylinderMesh.position.y + this.cylinderMesh.geometry.parameters.height / 2;
    this.sphereMesh.position.set(0, topOffset, 0);
    this.add(this.sphereMesh);
  }

  addCentreCylinder() {
    const cylinder = new THREE.CylinderBufferGeometry(7, 7, 230, 30);
    this.centreCylinderMesh = new THREE.Mesh(cylinder, setMaterial({color: this.color1, ...reflectivity.soft, flatShading: true}));

    const topOffset = this.cylinderMesh.position.y + this.cylinderMesh.geometry.parameters.height / 2 + cylinder.parameters.height / 2;
    this.centreCylinderMesh.position.set(0, topOffset, 0);
    this.add(this.centreCylinderMesh);
  }

  addBox() {
    const box = new THREE.BoxBufferGeometry(37, 4, 37);
    this.boxMesh = new THREE.Mesh(box, setMaterial({color: this.color1, ...reflectivity.soft, flatShading: true}));

    const topOffset = this.centreCylinderMesh.position.y + this.centreCylinderMesh.geometry.parameters.height / 2;
    this.boxMesh.position.set(0, topOffset, 0);
    this.add(this.boxMesh);
  }

  addTrapezoid() {
    const trapezoid = new THREE.CylinderBufferGeometry(Math.hypot(42, 42) / 2, Math.hypot(34, 34) / 2, 60, 4);
    this.trapezoidMesh = new THREE.Mesh(trapezoid, setMaterial({color: this.color2, ...reflectivity.soft, flatShading: true}));

    const topOffset = this.boxMesh.position.y + trapezoid.parameters.height / 2;
    this.trapezoidMesh.position.set(0, topOffset, 0);
    this.trapezoidMesh.rotation.copy(new THREE.Euler(0, 45 * THREE.Math.DEG2RAD, 0, `XYZ`));
    this.add(this.trapezoidMesh);
  }

  addTrapezoidTop() {
    const trapezoid = new THREE.CylinderBufferGeometry(Math.hypot(45, 45) / 2, Math.hypot(57, 57) / 2, 6, 4);
    this.trapezoidTopMesh = new THREE.Mesh(trapezoid, setMaterial({color: this.color1, ...reflectivity.soft, flatShading: true}));

    const topOffset = this.trapezoidMesh.position.y + this.trapezoidMesh.geometry.parameters.height / 2;
    this.trapezoidTopMesh.position.set(0, topOffset, 0);
    this.trapezoidTopMesh.rotation.copy(new THREE.Euler(0, 45 * THREE.Math.DEG2RAD, 0, `XYZ`));
    this.add(this.trapezoidTopMesh);
  }
}

export default Lantern;
