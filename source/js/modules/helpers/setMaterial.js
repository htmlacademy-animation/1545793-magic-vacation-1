import * as THREE from 'three';
import {isMobile} from '../three/IntroAndStory.js';

export const setMaterial = (options = {}) => {
  const {color, matcapMaterial, roughness, metalness} = options;

  if (isMobile && matcapMaterial) {
    const textureLoader = new THREE.TextureLoader();
    const matcap = textureLoader.load(matcapMaterial);

    return new THREE.MeshMatcapMaterial({color: new THREE.Color(color), matcap});
  }

  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness,
    metalness,
  });
};
