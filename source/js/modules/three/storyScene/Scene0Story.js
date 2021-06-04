import * as THREE from 'three';

import { loadModel } from '../../three/modelLoader/modelLoader.js';
import { loadSVG } from '../../three/svgLoader/svgLoader.js';
import { colors, reflectivity } from '../../helpers/colorsAndReflection.js';
import Floor from './objects/Floor.js';
import Rug from './objects/Rug.js';
import Chandelier from './objects/Chandelier.js';
import {isMobile} from '../IntroAndStory.js';

class Scene0Story extends THREE.Group{
  constructor(){
    super();

    this.wall;
    this.floor;

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
    // this.addSuitcase();
    this.addDog();
  }

  setMaterial(options = {}) {
    const { color, side, ...other } = options;

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      side,
      ...other
    });
  }

  addWallCornerUnit(){
    loadModel('wallCornerUnit', this.isShadow, this.setMaterial({ color: colors.Purple, side: THREE.DoubleSide, ...reflectivity.soft }), (mesh) => {
      const scale = 1;
      mesh.position.set(0, 0, 0);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.wall = mesh;
      this.add(mesh);
    })
  }

  addFloor() {
    const mesh = new Floor( {color: colors.DarkPurple, ...reflectivity.soft} );
    const scale = 1;
    mesh.position.set(0, 0, 0);
    mesh.scale.set(scale, scale, scale);
    mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
    this.add(mesh);
  }

  addSceneStatic() {
    loadModel('scene0static', this.isShadow, null, (mesh) => {
      const scale = 1;
      mesh.position.set(0, 0, 0);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.add(mesh);
    })
  }

  loadFlower() {
    loadSVG(`flower-storyScene0`, this.isShadow, (svgGroup) => {
      const scale = 1;
      svgGroup.position.set(60, 420, 440);
      svgGroup.scale.set(scale, -scale, scale);
      svgGroup.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 90 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.add(svgGroup);
    });
  }

  addRug() {
    const rug = new Rug();
    const scale = 1;
    rug.scale.set(scale, scale, scale);
    rug.position.set(0, 0, 0);
    rug.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0));
    this.add(rug);
  }

  addChandelier() {
    const chandelier = new Chandelier(false, this.isShadow);
    const scale = 1;
    chandelier.scale.set(scale, scale, scale);
    chandelier.position.set(330, 500, 250);
    this.add(chandelier);
  }

  addSuitcase() {
    loadModel('suitcase', this.isShadow, null, (mesh) => {
      const scale = 1;
      mesh.position.set(300, 0, 780);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 15 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.add(mesh);
    })
  }

  addDog() {
    loadModel('dog', this.isShadow, null, (mesh) => {
      const scale = 1;
      mesh.position.set(500, 0, 430);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 60 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.add(mesh);
    })
  }
}

export default Scene0Story;
