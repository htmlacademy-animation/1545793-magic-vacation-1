import * as THREE from 'three';
import { OrbitControls } from '../../../../node_modules/three/examples/jsm/controls/OrbitControls.js';

import SceneIntro from './introScene/SceneIntro.js';
import SceneAllStory from './storyScene/StorySceneAll.js';

let isOrbitControl = true;
// isOrbitControl = false;

class IntroAndStory {
  constructor() {
    this.canvasID = `screen__canvas--introAndStory`;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.textureWidth = 2048;
    this.textureHeight = 1024;
    this.textureRatio = this.textureWidth / this.textureHeight;
    this.cameraAspect = this.width / this.height;
    this.cameraFov = 45;

    this.lights;
    this.directionalLight;

    this.introGroupObj;
    this.SceneAllStory;

    this.render = this.render.bind(this);
    this.updateSize = this.updateSize.bind(this);

    this.isAnim = false;

  }

  init() {
    window.addEventListener(`resize`, this.updateSize);

    this.canvas = document.getElementById(this.canvasID);

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setClearColor(0x5f458c, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.scene = new THREE.Scene();

    this.addScene();

    this.camera = new THREE.PerspectiveCamera(this.cameraFov, this.cameraAspect, 0.1, 5000);

    if (isOrbitControl) {
      this.controls = new OrbitControls(this.camera, document.getElementById('top'));
      this.controls.zoomSpeed = 0.1;
    }

    this.camera.position.set(0, 0, 1405);
    // this.setCameraIntro();

    const lights = this.setLights();
    this.lights = lights;
    this.lights.position.z = this.camera.position.z;
    this.scene.add(this.lights);

    this.isAnim = true;

    this.render();
  }

  addScene() {
    this.addSceneIntro();
    this.addSceneAllStory();
  }

  addSceneIntro() {
    const sceneIntro = new SceneIntro();
    const scale = 1;
    sceneIntro.scale.set(scale, scale, scale);
    sceneIntro.position.set(0, 0, 0);
    this.introGroupObj = sceneIntro;
    this.scene.add(sceneIntro)
  }

  addSceneAllStory() {
    const sceneAllStory = new SceneAllStory();
    const scale = 1;
    sceneAllStory.scale.set(scale, scale, scale);
    sceneAllStory.position.set(0, 0, -3000);
    sceneAllStory.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, -45 * THREE.Math.DEG2RAD, 0));
    this.SceneAllStory = sceneAllStory;
    this.scene.add(sceneAllStory)
  }

  setLights() {
    const lightsGroup = new THREE.Group();

    let directionalLight = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 0.6);
    directionalLight.position.set(0, 1000, 3000);
    directionalLight.rotation.copy(new THREE.Euler(15 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 'YXZ'));
    this.directionalLight = directionalLight;
    lightsGroup.add(directionalLight);

    let pointLight1 = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.80, 4000, 0.5);
    pointLight1.position.set(-785, -350, 0);
    lightsGroup.add(pointLight1);

    let pointLight2 = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.30, 4000, 0.5);
    pointLight2.position.set(730, 500, 0);
    lightsGroup.add(pointLight2);

    return lightsGroup;
  }

  setStory(sceneID) {
    this.activeScene = sceneID;

    let angle = 0;

    switch (sceneID) {
      case 'intro':
        this.setCameraIntro();
        this.setPositionLightCamera();
        break;
      case 'scene0':
        angle = 90;
        this.setCameraStory(angle);
        break;
      case 'scene1':
        angle = 0;
        this.setCameraStory(angle);
        break;
      case 'scene2':
        angle = -90;
        this.setCameraStory(angle);
        break;
      case 'scene3':
        angle = 180;
        this.setCameraStory(angle);
        break;
    }

  }

  setCameraIntro(){
    this.camera.position.set(0, 0, this.introGroupObj.position.z + 1405);
    this.controls.target.set(this.introGroupObj.position.x, this.introGroupObj.position.y, this.introGroupObj.position.z);
  }

  setCameraStory(angle){
    const posX = 1900 * Math.cos(angle * THREE.Math.DEG2RAD);
    const posZ = 1900 * Math.sin(angle * THREE.Math.DEG2RAD);
    this.camera.position.set(this.SceneAllStory.position.x + posX, 600, this.SceneAllStory.position.z + posZ);
    this.controls.target.set(this.SceneAllStory.position.x, this.SceneAllStory.position.y, this.SceneAllStory.position.z);

    this.setPositionLightCamera();
  }

  setPositionLightCamera(){
    this.lights.position.x = this.camera.position.x;
    this.lights.position.z = this.camera.position.z;
  }

  render() {
    this.renderer.render(this.scene, this.camera);

    if (isOrbitControl) {
      this.controls.update();
    }

    if (this.isAnim) {
      requestAnimationFrame(this.render);
    } else {
      cancelAnimationFrame(this.render);
    }
  }

  stopAnim() {
    this.isAnim = false;
  }

  updateSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.cameraAspect = this.width / this.height;

    this.camera.aspect = this.cameraAspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    // this.render();
  }
}

export default IntroAndStory
