import * as THREE from 'three';
import { loadModel } from '../../three/modelLoader/modelLoader.js';
import { loadSVG } from '../../three/svgLoader/svgLoader.js';
import { colors, reflectivity } from '../../helpers/colorsAndReflection.js';
import Saturn from '../../three/storyScene/objects/Saturn.js';
import { isMobile } from '../IntroAndStory.js';
import { animateScale, animateMove, animareFluctuation } from '../../helpers/animations.js';


class SceneIntro extends THREE.Group {
  constructor() {
    super();

    this.isShadow = !isMobile;

    this.airplane;
    this.suitcase;
    this.watermelon;
    this.flamingo;
    this.leaf;
    this.question;
    this.snowflake;
    this.saturn;

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
    loadModel('airplane', this.isShadow, this.setMaterial({ color: colors.White, ...reflectivity.soft }), (mesh) => {
      const scale = 1.2;
      mesh.position.set(250, 130, 150);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(60 * THREE.Math.DEG2RAD, 140 * THREE.Math.DEG2RAD, -15 * THREE.Math.DEG2RAD));
      this.airplane = mesh;
      this.add(mesh);
    })
  }

  addSuitcase() {
    loadModel('suitcase', this.isShadow, null, (mesh) => {
      const scale = 0.5;
      mesh.position.set(-50, -150, 300);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, -140 * THREE.Math.DEG2RAD, 20 * THREE.Math.DEG2RAD));
      this.suitcase = mesh;
      this.add(mesh);
    })
  }

  addWatermelon() {
    loadModel('watermelon', this.isShadow, null, (mesh) => {
      const scale = 0;
      mesh.position.set(-300, -150, 800);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 130 * THREE.Math.DEG2RAD));
      this.watermelon = mesh;
      this.add(mesh);
    })
  }

  loadKeyhole() {
    loadSVG(`keyhole`, this.isShadow, (svgGroup) => {
      const scale = 1.5;
      svgGroup.position.set(-1000 * scale, 1010 * scale, 10);
      svgGroup.scale.set(scale, -scale, scale);
      this.add(svgGroup);
    });
  }

  loadFlamingo() {
    loadSVG(`flamingo`, this.isShadow, (svgGroup) => {
      const scale = 0;
      svgGroup.position.set(-480, 370, 100);
      svgGroup.scale.set(-scale, -scale, scale);
      svgGroup.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 30 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD));
      this.flamingo = svgGroup;
      this.add(svgGroup);
    });
  }

  loadLeaf() {
    loadSVG(`leaf`, this.isShadow, (svgGroup) => {
      const scale = 0;
      svgGroup.position.set(660, 350, 150);
      svgGroup.scale.set(scale, -scale, scale);
      svgGroup.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD, -60 * THREE.Math.DEG2RAD));
      this.leaf = svgGroup;
      this.add(svgGroup);
    });
  }

  loadQuestion() {
    loadSVG(`question`, this.isShadow, (svgGroup) => {
      const scale = 0;
      svgGroup.position.set(100, -330, 100);
      svgGroup.scale.set(scale, -scale, scale);
      svgGroup.rotation.copy(new THREE.Euler(-30 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 20 * THREE.Math.DEG2RAD));
      this.question = svgGroup;
      this.add(svgGroup);
    });
  }

  loadSnowflake() {
    loadSVG(`snowflake`, this.isShadow, (svgGroup) => {
      const scale = 0;
      svgGroup.position.set(-450, -10, 100);
      svgGroup.scale.set(scale, scale, scale);
      svgGroup.rotation.copy(new THREE.Euler(-10 * THREE.Math.DEG2RAD, 30 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD));
      this.snowflake = svgGroup;
      this.add(svgGroup);
    });
  }

  addSaturn() {
    const saturn = new Saturn(false, this.isShadow);
    const scale = 0;
    saturn.scale.set(scale, scale, scale);
    saturn.position.set(400, -100, 500);
    saturn.rotation.copy(new THREE.Euler(0, 0, 20 * THREE.Math.DEG2RAD));
    this.saturn = saturn;
    this.add(saturn);
  }

  startAnimimations() {
    const duration = 1500;
    this.animationsFlamingo(duration);
    this.animationsLeaf(duration);
    this.animationsQuestion(duration);
    this.animationsSnowflake(duration);
    this.animationsSaturn(duration);
    this.animationsWatermelon(duration);
  }

  animationsFlamingo(duration) {
    const obj = this.flamingo;
    animateScale(obj, [0, 0, 0], [-2, -2, 2], duration, 'easeOutCubic');
    animateMove(obj, [0, 0, 100], [-480, 370, 100], duration, 'easeOutCubic', () => {
      animareFluctuation(obj, -0.3, 0.3)
    });
  }

  animationsLeaf(duration) {
    const obj = this.leaf;
    animateScale(obj, [0, 0, 0], [1.4, -1.4, 1.4], duration, 'easeOutCubic');
    animateMove(obj, [0, 0, 100], [660, 350, 150], duration, 'easeOutCubic', () => {
      animareFluctuation(obj, 0.3, 0.3)
    });
  }

  animationsQuestion(duration) {
    const obj = this.question;
    animateScale(obj, [0, 0, 0], [1.6, -1.6, 1.6], duration, 'easeOutCubic');
    animateMove(obj, [0, 0, 100], [100, -330, 100], duration, 'easeOutCubic', () => {
      animareFluctuation(obj, -0.2, 0.3)
    });
  }

  animationsSnowflake(duration) {
    const obj = this.snowflake;
    animateScale(obj, [0, 0, 0], [1.4, 1.4, 1.4], duration, 'easeOutCubic');
    animateMove(obj, [0, 0, 100], [-450, -10, 100], duration, 'easeOutCubic', () => {
      animareFluctuation(obj, 0.3, 0.2)
    });
  }

  animationsSaturn(duration) {
    const obj = this.saturn;
    animateScale(obj, [0, 0, 0], [0.6, 0.6, 0.6], duration, 'easeOutCubic');
    animateMove(obj, [0, 0, 100], [400, -100, 500], duration, 'easeOutCubic', () => {
      animareFluctuation(obj, -0.3, 0.3)
    });
  }

  animationsWatermelon(duration) {
    const obj = this.watermelon;
    animateScale(obj, [0, 0, 0], [1, 1, 1], duration, 'easeOutCubic');
    animateMove(obj, [0, 0, 100], [-300, -150, 800], duration, 'easeOutCubic', () => {
      animareFluctuation(obj, -0.3, 0.3)
    });
  }
}

export default SceneIntro;
