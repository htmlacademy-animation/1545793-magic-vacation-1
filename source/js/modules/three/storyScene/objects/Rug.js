import * as THREE from 'three';
import {getLathePointsForCircle, getLatheDegrees} from '../../../helpers/latheGeometry.js';
import {colors} from '../../../helpers/colorsAndReflection.js';
import rugShaderMaterial from '../materials/rugShaderMaterial.js';

class Rug extends THREE.Group {
  constructor(isDark) {
    super();

    this.isDark = isDark;

    this.colorBase = this.isDark ? colors.ShadowedLightPurple : colors.LightPurple;
    this.colorStripe = this.isDark ? colors.ShadowedAdditionalPurple : colors.AdditionalPurple;

    this.startDeg = 16;
    this.finishDeg = 74;

    this.constructChildren();
  }

  constructChildren() {
    this.addRug();
  }

  addRug() {
    const points = getLathePointsForCircle(180, 3, 763);
    const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);

    const base = new THREE.LatheBufferGeometry(points, 50, start, length);
    const material = new THREE.ShaderMaterial(rugShaderMaterial({
      baseColor: {value: new THREE.Color(this.colorBase)},
      stripeColor: {value: new THREE.Color(this.colorStripe)}
    }));
    const rugMesh = new THREE.Mesh(base, material);
    rugMesh.receiveShadow = true;
    this.add(rugMesh);
  }
}

export default Rug;
