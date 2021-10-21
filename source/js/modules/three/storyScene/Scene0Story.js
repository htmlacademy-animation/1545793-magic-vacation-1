import * as THREE from 'three';

import {loadModel} from '../../three/modelLoader/modelLoader.js';
import {loadSVG} from '../../three/svgLoader/svgLoader.js';
import {colors, reflectivity} from '../../helpers/colorsAndReflection.js';
import Floor from './objects/Floor.js';
import Rug from './objects/Rug.js';
import Chandelier from './objects/Chandelier.js';
import {isMobile} from '../IntroAndStory.js';
import {animDogTail, animSaturn} from '../../helpers/animations.js';

class Scene0Story extends THREE.Group {
  constructor() {
    super();

    this.startTime = -1;
    this.counterLoadObj = 0;

    this.isShadow = !isMobile;

    this.constructChildren();
  }

  constructChildren() {
    this.addWallCornerUnit();
    this.addFloor();
    this.addSceneStatic();
    this.loadFlower();
    this.addRug();
    this.addChandelier();
    this.addDog();
  }

  setMaterial(options = {}) {
    const {color, side, matcapMaterial, roughness, metalness} = options;

    if (isMobile && matcapMaterial) {
      const textureLoader = new THREE.TextureLoader();
      const matcap = textureLoader.load(matcapMaterial);

      return new THREE.MeshMatcapMaterial({color: new THREE.Color(color), side, matcap});
    }

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      side,
      roughness,
      metalness,
    });
  }

  addWallCornerUnit() {
    this.counterLoadObj += 1;
    loadModel(`wallCornerUnit`, this.isShadow, this.setMaterial({color: colors.Purple, side: THREE.DoubleSide, ...reflectivity.soft}), (mesh) => {
      const scale = 1;
      mesh.position.set(0, 0, 0);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.wall = mesh;
      this.add(mesh);
    });
  }

  addFloor() {
    this.counterLoadObj += 1;
    const mesh = new Floor({color: colors.DarkPurple, ...reflectivity.soft});
    const scale = 1.8;
    mesh.position.set(0, 0, 0);
    mesh.scale.set(scale, scale, scale);
    mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
    this.add(mesh);
  }

  addSceneStatic() {
    this.counterLoadObj += 1;
    loadModel(`scene0static`, this.isShadow, null, (mesh) => {
      const scale = 1;
      mesh.position.set(0, 0, 0);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.add(mesh);
    });
  }

  loadFlower() {
    this.counterLoadObj += 1;
    loadSVG(`flower-storyScene0`, this.isShadow, (svgGroup) => {
      const scale = 1;
      svgGroup.position.set(60, 420, 440);
      svgGroup.scale.set(scale, -scale, scale);
      svgGroup.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 90 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.add(svgGroup);
    });
  }

  addRug() {
    this.counterLoadObj += 1;
    const rug = new Rug();
    const scale = 1;
    rug.scale.set(scale, scale, scale);
    rug.position.set(0, 3, 0);
    rug.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0));
    this.add(rug);
  }

  addChandelier() {
    this.counterLoadObj += 1;
    const chandelier = new Chandelier(false, this.isShadow);
    const scale = 1;
    chandelier.scale.set(scale, scale, scale);
    chandelier.position.set(330, 1500, 250);
    chandelier.rotation.copy(new THREE.Euler(0, -45 * THREE.Math.DEG2RAD, 0));
    this.chandelier = chandelier;
    this.add(chandelier);
  }

  addDog() {
    this.counterLoadObj += 1;
    loadModel(`dog`, this.isShadow, null, (mesh) => {
      const scale = 1;
      mesh.position.set(500, 0, 430);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 60 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.dog = mesh;
      this.add(mesh);
    });
  }

  animations() {
    if (this.startTime < 0) {
      this.startTime = new THREE.Clock();
      return;
    }

    const t = this.startTime.getElapsedTime();

    const ring = this.chandelier.children.find((obj) => {
      return obj.name === `ring`;
    });

    animDogTail(t, this.dog.getObjectByName(`Tail`));
    animSaturn(t, 0.02, this.chandelier, ring);
  }
}

export default Scene0Story;
