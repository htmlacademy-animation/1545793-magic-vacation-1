import * as THREE from 'three';
import SceneIntro from './introScene/SceneIntro.js';
import SceneAllStory from './storyScene/StorySceneAll.js';
import {loadModel} from '../three/modelLoader/modelLoader.js';
import {animateScale, animateMoveY} from '../helpers/animations.js';
import CameraAndLight from './CameraAndLight.js';

export const isMobile = /android|ipad|iphone|ipod/i.test(navigator.userAgent) && !window.MSStream;
export let isLandscape;

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

    this.startTime = -1;

    this.isShadow = !isMobile;

    this.introSceneIaAnim = false;
    this.suitcaseOnLoad = false;

    this.render = this.render.bind(this);
    this.updateSize = this.updateSize.bind(this);

    this.isAnim = false;
  }

  init() {
    window.addEventListener(`resize`, this.updateSize);

    this.canvas = document.getElementById(this.canvasID);

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.isLandscape();

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setClearColor(0x5f458c, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(this.cameraFov, this.cameraAspect, 0.1, 5000);

    this.addScene();

    this.cameraAndLight = new CameraAndLight(this.camera, this.introGroupObj, this.SceneAllStory);

    this.cameraAndLight.position.set(this.SceneAllStory.position.x, this.SceneAllStory.position.y, this.SceneAllStory.position.z);
    this.scene.add(this.cameraAndLight);
    this.addSuitcase();

    if (!isMobile) {
      const lights = this.setLights();
      this.lights = lights;
      this.cameraAndLight.addChild(this.lights);
    }

    this.isAnim = true;
    document.addEventListener(`mousemove`, (e) => {
      let mouseY = e.pageY;
      let windowH = window.innerHeight;
      let coef = 1 - (mouseY / (windowH * 0.5));
      this.cameraAndLight.setCameraRotation(coef);
    });
    this.render();
  }

  addScene() {
    this.addSceneIntro();
    this.addSceneAllStory();
  }

  addSceneIntro() {
    const sceneIntro = new SceneIntro();
    this.sceneIntro = sceneIntro;
    const scale = 1;
    sceneIntro.scale.set(scale, scale, scale);
    sceneIntro.position.set(0, 0, 0);
    this.introGroupObj = sceneIntro;
    this.scene.add(sceneIntro);
  }

  addSceneAllStory() {
    const sceneAllStory = new SceneAllStory();
    const scale = 1;
    sceneAllStory.scale.set(scale, scale, scale);
    sceneAllStory.position.set(0, -500, -2500);
    sceneAllStory.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, -45 * THREE.Math.DEG2RAD, 0));
    this.SceneAllStory = sceneAllStory;
    this.scene.add(sceneAllStory);
  }

  setSuitcase() {
    const suitcaseGroup = new THREE.Group();

    loadModel(`suitcase`, this.isShadow, null, (mesh) => {
      const scale = 0;
      mesh.position.set(-300, 0, 800);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, -23 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      mesh.name = `suitcase`;
      this.suitcaseOnLoad = true;
      suitcaseGroup.add(mesh);
    });

    return suitcaseGroup;
  }

  addSuitcase() {
    const suitcase = this.setSuitcase();
    this.suitcase = suitcase;
    this.cameraAndLight.addChild(this.suitcase);
  }

  startAanimationsSuitcase() {
    if (this.suitcaseOnLoad !== true || this.suitcaseIaAnim !== true) {
      return;
    } else {
      setTimeout(() => {
        this.animationsSuitcase();
        this.suitcaseIaAnim = false;
      }, 100);
    }
  }

  animationsSuitcase() {
    const duration = 400;
    const suitcase = this.suitcase.getObjectByName(`suitcase`);
    animateMoveY(suitcase, 100, 0, duration, `easeInCubic`);
    animateScale(suitcase, [0.9, 0.9, 0.9], [0.85, 0.95, 0.9], duration, `easeOutCubic`, () => {
      animateScale(suitcase, [0.85, 0.95, 0.9], [0.9, 0.9, 1], duration / 2, `easeOutCubic`, () => {
        animateScale(suitcase, [0.9, 0.9, 1], [0.9, 0.95, 0.85], duration / 3, `easeOutCubic`, () => {
          animateScale(suitcase, [0.9, 0.95, 0.85], [0.9, 0.9, 0.9], duration / 3, `easeOutCubic`);
        });
      });
    });
  }

  setLights() {
    const lightsGroup = new THREE.Group();

    let pointLight1 = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.1);
    pointLight1.position.set(-500, 500, 1800);
    pointLight1.castShadow = true;
    pointLight1.shadow.camera.far = 3000;
    pointLight1.shadow.mapSize.width = 1000;
    pointLight1.shadow.mapSize.height = 1000;
    lightsGroup.add(pointLight1);

    // let cylinder = new THREE.SphereGeometry(30, 30, 30);
    // let material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    // let sphereBigMesh = new THREE.Mesh(cylinder, material);
    // sphereBigMesh.position.set(pointLight1.position.x, pointLight1.position.y, pointLight1.position.z);
    // lightsGroup.add(sphereBigMesh);

    let pointLight2 = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.1);
    pointLight2.position.set(700, 800, 1400);
    pointLight2.castShadow = true;
    pointLight2.shadow.camera.far = 3000;
    pointLight2.shadow.mapSize.width = 1000;
    pointLight2.shadow.mapSize.height = 1000;
    lightsGroup.add(pointLight2);

    // let cylinder2 = new THREE.SphereGeometry(10, 10, 30);
    // let material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // let sphereBigMesh2 = new THREE.Mesh(cylinder2, material2);
    // sphereBigMesh2.position.set(pointLight2.position.x, pointLight2.position.y, pointLight2.position.z);
    // lightsGroup.add(sphereBigMesh2);

    return lightsGroup;
  }

  setStory(sceneID) {
    this.activeScene = sceneID;

    const duration = 500;

    let angle = 0;

    if (sceneID === `intro`) {
      this.cameraAndLight.isIntroScene = true;
    } else {
      this.cameraAndLight.isIntroScene = false;
    }

    switch (sceneID) {
      case `intro`:
        this.cameraAndLight.setCameraIntro();
        break;
      case `fromIntroToScene0`:
        this.cameraAndLight.animIntroToStory(() => {
          this.introGroupObj.showPlane();
        });
        this.introGroupObj.hidePlane(300, 100);

        break;
      case `scene0`:
        angle = 0;
        this.cameraAndLight.setCameraStory(angle, duration, `easeLinear`);
        break;
      case `scene1`:
        angle = 90;
        this.cameraAndLight.setCameraStory(angle, duration, `easeLinear`);
        break;
      case `scene2`:
        angle = 180;
        this.cameraAndLight.setCameraStory(angle, duration, `easeLinear`);
        break;
      case `scene3`:
        angle = 270;
        this.cameraAndLight.setCameraStory(angle, duration, `easeLinear`);
        break;
    }

  }

  animIntroScene() {
    if (this.introGroupObj.children.length !== this.introGroupObj.counterLoadObj) {
      return;
    } else if (this.introSceneIaAnim !== true) {
      this.introSceneIaAnim = true;
      this.introGroupObj.startAnimimations();
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);

    this.animIntroScene();
    this.SceneAllStory.animationsScene(this.activeScene);
    this.startAanimationsSuitcase();

    if (this.isAnim) {
      requestAnimationFrame(this.render);
    } else {
      cancelAnimationFrame(this.render);
    }
  }

  isLandscape() {
    isLandscape = window.innerHeight < window.innerWidth;
  }

  updateSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.cameraAspect = this.width / this.height;

    this.isLandscape();

    this.camera.aspect = this.cameraAspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);

    this.sceneIntro.setPositionIntroObj();
  }
}

export default IntroAndStory;
