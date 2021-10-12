import * as THREE from 'three';
import {setMaterial} from '../../../helpers/setMaterial';
import {colors, reflectivity} from '../../../helpers/colorsAndReflection.js';
import {isShadow} from '../../../helpers/isShadow.js';

class Snowman extends THREE.Group {
  constructor(isShadowKey) {
    super();

    this.color1 = colors.SnowColor;
    this.color2 = colors.Orange;

    this.isShadow = isShadowKey;

    this.constructChildren();
  }

  constructChildren() {
    this.addSphereBig();
    this.addSphereSmall();
    this.addCone();

    isShadow(this);
  }

  addSphereBig() {
    const cylinder = new THREE.SphereGeometry(75, 30, 30);
    this.sphereBigMesh = new THREE.Mesh(cylinder, setMaterial({color: this.color1, ...reflectivity.strong}));
    this.add(this.sphereBigMesh);
  }

  addSphereSmall() {
    const cylinder = new THREE.SphereGeometry(44, 30, 30);
    this.sphereSmallMesh = new THREE.Mesh(cylinder, setMaterial({color: this.color1, ...reflectivity.strong}));

    this.sphereSmallMesh.position.set(0, 108, 0);
    this.add(this.sphereSmallMesh);
  }

  addCone() {
    const cone = new THREE.ConeBufferGeometry(Math.hypot(18, 18) / 2, 75, 30);
    this.coneMesh = new THREE.Mesh(cone, setMaterial({color: this.color2, ...reflectivity.soft}));

    const leftOffset = this.sphereSmallMesh.geometry.parameters.radius + 32 - cone.parameters.height / 2;
    const topOffset = this.sphereSmallMesh.position.y;
    this.coneMesh.position.set(leftOffset, topOffset, 0);
    this.coneMesh.rotation.copy(new THREE.Euler(0, 0, -90 * THREE.Math.DEG2RAD, `XYZ`));
    this.add(this.coneMesh);
  }
}

export default Snowman;
