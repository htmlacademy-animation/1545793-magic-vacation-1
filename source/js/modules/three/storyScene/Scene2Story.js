import * as THREE from 'three';

import {loadModel} from '../../three/modelLoader/modelLoader.js';
import {colors, reflectivity} from '../../helpers/colorsAndReflection.js';
import Floor from './objects/Floor.js';
import Snowman from './objects/Snowman.js';
import Road from './objects/Road.js';
import Cylinders from './objects/Cylinders.js';
import {isMobile} from '../IntroAndStory.js';
import {animConpass} from '../../helpers/animations.js';

class Scene2Story extends THREE.Group {
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
    this.addSnowman();
    this.addRoad();
    this.addCylinders();
    this.addCompass();
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
    loadModel(`wallCornerUnit`, this.isShadow, this.setMaterial({color: colors.SkyLightBlue, side: THREE.DoubleSide, ...reflectivity.soft}), (mesh) => {
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
    const mesh = new Floor({color: colors.MountainBlue, ...reflectivity.soft});
    const scale = 1.8;
    mesh.position.set(0, 0, 0);
    mesh.scale.set(scale, scale, scale);
    mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
    this.add(mesh);
  }

  addSceneStatic() {
    this.counterLoadObj += 1;
    loadModel(`scene2static`, this.isShadow, null, (mesh) => {
      const scale = 1;
      mesh.position.set(0, 0, 0);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.add(mesh);
    });
  }

  addRoad() {
    this.counterLoadObj += 1;
    const road = new Road();
    const scale = 1;

    road.scale.set(scale, scale, scale);
    road.position.set(0, 3, 0);
    road.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0));
    this.add(road);
  }

  addSnowman() {
    this.counterLoadObj += 1;
    const snowman = new Snowman(this.isShadow);
    const scale = 1;
    snowman.scale.set(scale, scale, scale);
    snowman.position.set(220, 115, 400);
    this.add(snowman);
  }

  addCylinders() {
    this.counterLoadObj += 1;
    const cylinders = new Cylinders(this.isShadow);
    const scale = 1;
    cylinders.scale.set(scale, scale, scale);
    cylinders.position.set(0, 30, 0);
    this.add(cylinders);
  }

  addCompass() {
    this.counterLoadObj += 1;
    loadModel(`compass`, this.isShadow, null, (mesh) => {
      const scale = 1;
      mesh.position.set(0, 0, 0);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.compass = mesh;
      this.add(mesh);
    });
  }

  animations() {
    if (this.startTime < 0) {
      this.startTime = new THREE.Clock();
      return;
    }

    const t = this.startTime.getElapsedTime();

    animConpass(t, 0.2, this.compass.getObjectByName(`ArrowCenter`));
  }
}

export default Scene2Story;
