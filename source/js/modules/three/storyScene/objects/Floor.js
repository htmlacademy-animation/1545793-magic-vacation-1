import * as THREE from 'three';
import {getLatheDegrees} from '../../../helpers/latheGeometry.js';
import { isMobile } from '../../IntroAndStory.js';

class Floor extends THREE.Group {
  constructor(settings) {
    super();

    this.settings = settings;

    this.startDeg = 0;
    this.finishDeg = 90;

    this.constructChildren();
  }

  constructChildren() {
    this.addBase(this.settings);
  }

  setMaterial(options = {}) {
    const {color, matcapMaterial, roughness, metalness} = options;

    if (isMobile && matcapMaterial) {
      const textureLoader = new THREE.TextureLoader();
      const matcap = textureLoader.load(matcapMaterial);

      return new THREE.MeshMatcapMaterial({color: new THREE.Color(color), side: THREE.DoubleSide, matcap});
    }

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      side: THREE.DoubleSide,
      roughness,
      metalness,
    });
  }

  addBase(settings) {
    const {start, length} = getLatheDegrees(this.startDeg, this.finishDeg);
    const base = new THREE.CircleGeometry(1350, 10, start, length);
    const baseMesh = new THREE.Mesh(base, this.setMaterial(settings));
    baseMesh.rotation.copy(new THREE.Euler(90 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
    baseMesh.receiveShadow = true;
    this.add(baseMesh);
  }
}

export default Floor;
