import * as THREE from 'three';
import {getLathePointsForCircle, getLatheDegrees} from '../../../helpers/latheGeometry.js';
import {colors} from '../../../helpers/colorsAndReflection.js';
import roadShaderMaterial from '../materials/roadShaderMaterial.js';

class Road extends THREE.Group {
  constructor() {
    super();

    this.colorBase = colors.Grey;
    this.colorStripe = colors.White;

    this.startDeg = 0;
    this.finishDeg = 90;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase();
  }

  addBase() {
    const points = getLathePointsForCircle(165, 3, 737);
    const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);

    const base = new THREE.LatheBufferGeometry(points, 50, start, length);
    const material = new THREE.ShaderMaterial(roadShaderMaterial({
      baseColor: {value: new THREE.Color(this.colorBase)},
      stripeColor: {value: new THREE.Color(this.colorStripe)}
    }));
    this.roadMesh = new THREE.Mesh(base, material);
    this.roadMesh.receiveShadow = true;
    this.add(this.roadMesh);
  }
}

export default Road;
