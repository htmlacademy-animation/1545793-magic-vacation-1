import * as THREE from 'three';

import {loadModel} from '../../three/modelLoader/modelLoader.js';
import {loadSVG} from '../../three/svgLoader/svgLoader.js';
import {colors, reflectivity} from '../../helpers/colorsAndReflection.js';
import Floor from './objects/Floor.js';
import Pyramid from './objects/Pyramid.js';
import Lantern from './objects/Lantern.js';
import {isMobile} from '../IntroAndStory.js';
import {animLeaf} from '../../helpers/animations.js';
import hideObjForMobile from '../../helpers/hideObjForMobile.js';

class Scene1Story extends THREE.Group {
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
    this.loadLeaf1();
    this.loadLeaf2();
    this.addPyramid();
    this.addLantern();

    if (isMobile) {
      hideObjForMobile(this);
    }

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
    loadModel(`wallCornerUnit`, this.isShadow, this.setMaterial({color: colors.Blue, side: THREE.DoubleSide, ...reflectivity.basic}), (mesh) => {
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
    const mesh = new Floor({color: colors.BrightBlue, ...reflectivity.soft});
    const scale = 1.8;
    mesh.position.set(0, 0, 0);
    mesh.scale.set(scale, scale, scale);
    mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
    this.add(mesh);
  }

  addSceneStatic() {
    this.counterLoadObj += 1;
    loadModel(`scene1static`, this.isShadow, null, (mesh) => {
      const scale = 1;
      mesh.position.set(0, 0, 0);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.add(mesh);
    });
  }

  loadLeaf1() {
    this.counterLoadObj += 1;
    const leafGroup = this.setLeaf1();
    const scale = 2.8;
    leafGroup.position.set(80, 0, 300);
    leafGroup.scale.set(scale, -scale, scale);
    leafGroup.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 90 * THREE.Math.DEG2RAD, -10 * THREE.Math.DEG2RAD));
    this.leaf1 = leafGroup;
    this.add(leafGroup);
  }

  setLeaf1() {
    const leafGroup = new THREE.Group();

    loadSVG(`leaf1-storyScene1`, this.isShadow, (svgGroup) => {
      svgGroup.position.set(-60, -120, 0);
      leafGroup.add(svgGroup);
    });

    return leafGroup;
  }

  loadLeaf2() {
    this.counterLoadObj += 1;
    const leafGroup = this.setLeaf2();
    const scale = 1.9;
    leafGroup.position.set(80, 0, 300);
    leafGroup.scale.set(scale, -scale, scale);
    leafGroup.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 90 * THREE.Math.DEG2RAD, 35 * THREE.Math.DEG2RAD));
    this.leaf2 = leafGroup;
    this.add(leafGroup);
  }

  setLeaf2() {
    const leafGroup = new THREE.Group();

    loadSVG(`leaf1-storyScene1`, this.isShadow, (svgGroup) => {
      svgGroup.position.set(-60, -120, 0);
      leafGroup.add(svgGroup);
    });

    return leafGroup;
  }

  addPyramid() {
    this.counterLoadObj += 1;
    const pyramid = new Pyramid(this.isShadow);
    const scale = 1;
    pyramid.scale.set(scale, scale, scale);
    pyramid.rotation.copy(new THREE.Euler(0, 45 * THREE.Math.DEG2RAD, 0, `XYZ`));
    pyramid.position.set(230, 150, 260);

    this.add(pyramid);
  }

  addLantern() {
    this.counterLoadObj += 1;
    const lantern = new Lantern(this.isShadow);
    const scale = 1;
    lantern.scale.set(scale, scale, scale);
    lantern.rotation.copy(new THREE.Euler(0, -25 * THREE.Math.DEG2RAD, 0, `XYZ`));
    lantern.position.set(650, 50, 120);

    this.add(lantern);
  }

  animations() {
    if (this.startTime < 0) {
      this.startTime = new THREE.Clock();
      return;
    }

    const t = this.startTime.getElapsedTime();

    animLeaf(t, this.leaf1, 0.1, 0.2);
    animLeaf(t, this.leaf2, -0.05, 0.1);

    if (t > 4) {
      this.startTime = new THREE.Clock();
    }
  }
}

export default Scene1Story;
