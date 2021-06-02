import * as THREE from 'three';
import { loadModel } from '../../three/modelLoader/modelLoader.js';
import { loadSVG } from '../../three/svgLoader/svgLoader.js';
import { colors, reflectivity } from '../../helpers/colorsAndReflection.js';
import Saturn from '../../three/storyScene/objects/Saturn.js';


class SceneIntro extends THREE.Group{
  constructor(){
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addPlane();
    this.addAirplane();
    this.addSuitcase();
    this.addWatermelon();
    this.loadKeyhole();
    this.loadFlamingo();
    this.loadLeaf();
    this.loadQuestion();
    this.loadSnowflake();
    this.addSaturn();
  }

  setMaterial(options = {}) {
    const { color, ...other } = options;

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      ...other
    });
  }

  addPlane() {
    const plane = new THREE.PlaneGeometry(500, 500);
    const planeMesh = new THREE.Mesh(plane, this.setMaterial({ color: colors.Purple, ...reflectivity.basic, flatShading: true }));

    planeMesh.position.set(0, 0, 5);
    this.add(planeMesh);
  }

  addAirplane() {
    loadModel('airplane', this.setMaterial({ color: colors.White, ...reflectivity.soft }), (mesh) => {
      const scale = 1.2;
      mesh.position.set(250, 130, 150);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(60 * THREE.Math.DEG2RAD, 140 * THREE.Math.DEG2RAD, -15 * THREE.Math.DEG2RAD));
      this.add(mesh);
    })
  }

  addSuitcase() {
    loadModel('suitcase', null, (mesh) => {
      const scale = 0.5;
      mesh.position.set(-50, -150, 300);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, -140 * THREE.Math.DEG2RAD, 20 * THREE.Math.DEG2RAD));
      this.add(mesh);
    })
  }

  addWatermelon() {
    loadModel('watermelon', null, (mesh) => {
      const scale = 1;
      mesh.position.set(-300, -150, 800);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 130 * THREE.Math.DEG2RAD));
      this.add(mesh);
    })
  }

  loadKeyhole() {
    loadSVG(`keyhole`, (svgGroup) => {
      const scale = 1.5;
      svgGroup.position.set(-1000 * scale, 1010 * scale, 10);
      svgGroup.scale.set(scale, -scale, scale);
      this.add(svgGroup);
    });
  }

  loadFlamingo() {
    loadSVG(`flamingo`, (svgGroup) => {
      const scale = 2;
      svgGroup.position.set(-480, 370, 100);
      svgGroup.scale.set(-scale, -scale, scale);
      svgGroup.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 30 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD));
      this.add(svgGroup);
    });
  }

  loadLeaf() {
    loadSVG(`leaf`, (svgGroup) => {
      const scale = 1.4;
      svgGroup.position.set(660, 350, 150);
      svgGroup.scale.set(scale, -scale, scale);
      svgGroup.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD, -60 * THREE.Math.DEG2RAD));
      this.add(svgGroup);
    });
  }

  loadQuestion() {
    loadSVG(`question`, (svgGroup) => {
      const scale = 1.6;
      svgGroup.position.set(100, -330, 100);
      svgGroup.scale.set(scale, -scale, scale);
      svgGroup.rotation.copy(new THREE.Euler(-30 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 20 * THREE.Math.DEG2RAD));
      this.add(svgGroup);
    });
  }

  loadSnowflake() {
    loadSVG(`snowflake`, (svgGroup) => {
      const scale = 1.4;
      svgGroup.position.set(-450, -10, 100);
      svgGroup.scale.set(scale, scale, scale);
      svgGroup.rotation.copy(new THREE.Euler(-10 * THREE.Math.DEG2RAD, 30 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD));
      this.add(svgGroup);
    });
  }

  addSaturn() {
    const saturn = new Saturn();
    const scale = 0.6;
    saturn.scale.set(scale, scale, scale);
    saturn.position.set(400, -100, 500);
    saturn.rotation.copy(new THREE.Euler(0, 0, 20 * THREE.Math.DEG2RAD));
    this.add(saturn);
  }
}

export default SceneIntro;
