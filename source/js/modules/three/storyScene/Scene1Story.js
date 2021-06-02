import * as THREE from 'three';

import { loadModel } from '../../three/modelLoader/modelLoader.js';
import { loadSVG } from '../../three/svgLoader/svgLoader.js';
import { colors, reflectivity } from '../../helpers/colorsAndReflection.js';
import Floor from './objects/Floor.js';
import Pyramid from './objects/Pyramid.js';
import Lantern from './objects/Lantern.js';


class Scene1Story extends THREE.Group{
  constructor(){
    super();

    this.wall;
    this.floor;

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
    this.addSuitcase();
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
    loadModel('wallCornerUnit', this.setMaterial({ color: colors.Blue, side: THREE.DoubleSide, ...reflectivity.basic }), (mesh) => {
      const scale = 1;
      mesh.position.set(0, 0, 0);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.wall = mesh;
      this.add(mesh);
    })
  }

  addFloor() {
    const mesh = new Floor( {color: colors.BrightBlue, ...reflectivity.soft} );
    const scale = 1;
    mesh.position.set(0, 0, 0);
    mesh.scale.set(scale, scale, scale);
    mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
    this.add(mesh);
  }

  addSceneStatic() {
    loadModel('scene1static', null, (mesh) => {
      const scale = 1;
      mesh.position.set(0, 0, 0);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.add(mesh);
    })
  }

  loadLeaf1() {
    loadSVG(`leaf1-storyScene1`, (svgGroup) => {
      const scale = 2.8;
      svgGroup.position.set(80, 350, 410);
      svgGroup.scale.set(scale, -scale, scale);
      svgGroup.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 90 * THREE.Math.DEG2RAD, -10 * THREE.Math.DEG2RAD));
      this.add(svgGroup);
    });
  }

  loadLeaf2() {
    loadSVG(`leaf1-storyScene1`, (svgGroup) => {
      const scale = 1.9;
      svgGroup.position.set(80, 120, 520);
      svgGroup.scale.set(scale, -scale, scale);
      svgGroup.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 90 * THREE.Math.DEG2RAD, 35 * THREE.Math.DEG2RAD));
      this.add(svgGroup);
    });
  }

  addPyramid() {
    const pyramid = new Pyramid();
    const scale = 1;
    pyramid.scale.set(scale, scale, scale);
    pyramid.rotation.copy(new THREE.Euler( 0, 45 * THREE.Math.DEG2RAD, 0, 'XYZ' ));
    pyramid.position.set(230, 150, 260);

    this.add(pyramid);
  }

  addLantern() {
    const lantern = new Lantern();
    const scale = 1;
    lantern.scale.set(scale, scale, scale);
    lantern.rotation.copy(new THREE.Euler( 0, -25 * THREE.Math.DEG2RAD, 0, 'XYZ' ));
    lantern.position.set(650, 50, 120);

    this.add(lantern);
  }

  addSuitcase() {
    loadModel('suitcase', null, (mesh) => {
      const scale = 1;
      mesh.position.set(300, 0, 780);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 15 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      this.add(mesh);
    })
  }
}

export default Scene1Story;
