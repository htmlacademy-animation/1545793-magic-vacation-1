import * as THREE from 'three';
import { OrbitControls } from '../../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import SceneIntro from './introScene/SceneIntro.js';
import SceneAllStory from './storyScene/StorySceneAll.js';
import { loadModel } from '../three/modelLoader/modelLoader.js';
import { animateScale, animateMove } from '../helpers/animations.js';

export const isMobile = /android|ipad|iphone|ipod/i.test(navigator.userAgent) && !window.MSStream;

let isOrbitControl = true;

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

    this.startTime = -1;

    this.isShadow = !isMobile;

    this.introGroupObj;
    this.introSceneIaAnim = false;
    this.SceneAllStory;
    this.suitcase;
    this.suitcaseOnLoad = false;
    this.suitcaseIaAnim = false;

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

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(this.cameraFov, this.cameraAspect, 0.1, 5000);

    this.addScene();

    if (isOrbitControl) {
      this.controls = new OrbitControls(this.camera, document.getElementById('top'));
      this.controls.zoomSpeed = 0.1;
    }

    this.camera.position.set(0, 0, 1405);

    const lights = this.setLights();
    this.lights = lights;
    this.lights.position.z = this.camera.position.z;
    this.scene.add(this.lights);

    this.isAnim = true;
    this.render();
  }

  addScene() {
    this.addSuitcase();
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
    sceneAllStory.position.set(0, -500, -2500);
    sceneAllStory.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, -45 * THREE.Math.DEG2RAD, 0));
    this.SceneAllStory = sceneAllStory;
    this.scene.add(sceneAllStory)
  }

  setSuitcase() {
    const suitcaseGroup = new THREE.Group();

    loadModel('suitcase', this.isShadow, null, (mesh) => {
      const scale = 0;
      mesh.position.set(-350, -600, -1130);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, -23 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      mesh.name = 'suitcase';
      this.suitcaseOnLoad = true;
      suitcaseGroup.add(mesh);
    })

    return suitcaseGroup;
  }

  addSuitcase(){
    const suitcase = this.setSuitcase();
    this.suitcase = suitcase;
    this.scene.add(this.suitcase);
  }

  startAanimationsSuitcase(){
    if(this.suitcaseOnLoad != true || this.suitcaseIaAnim != true){
      return
    } else {
      this.animationsSuitcase();
      this.suitcaseIaAnim = false;
    }
  }

  animationsSuitcase(){
    const duration = 400;
    const suitcase = this.suitcase.getObjectByName('suitcase');
    animateMove(suitcase, [-350, -530, -1130], [-350, -600, -1130], duration, 'easeInCubic');
    animateScale(suitcase, [0.9, 0.9, 0.9], [0.85, 0.95, 0.9], duration, 'easeOutCubic', () => {
      animateScale(suitcase, [0.85, 0.95, 0.9], [0.9, 0.9, 1], duration / 2, 'easeOutCubic', () => {
        animateScale(suitcase, [0.9, 0.9, 1], [0.9, 0.95, 0.85], duration / 3, 'easeOutCubic', () => {
          animateScale(suitcase, [0.9, 0.95, 0.85], [0.9, 0.9, 0.9], duration / 3, 'easeOutCubic');
        });
      });
    });
  }

  setLights() {
    const lightsGroup = new THREE.Group();

    let directionalLight = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 1.3);
    directionalLight.position.set(200, 0, 0);
    directionalLight.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 'YXZ'));
    this.directionalLight = directionalLight;
    lightsGroup.add(directionalLight);

    // let cylinder3 = new THREE.SphereGeometry(10, 10, 30);
    // let material3 = new THREE.MeshBasicMaterial( { color: 0x000111 } );
    // let sphereBigMesh3 = new THREE.Mesh(cylinder3, material3);
    // sphereBigMesh3.position.set(directionalLight.position.x, directionalLight.position.y, directionalLight.position.z);
    // lightsGroup.add(sphereBigMesh3);

    let pointLight1 = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.1);
    pointLight1.position.set(-500, -100, -100)
    pointLight1.castShadow = true;
    pointLight1.shadow.camera.far = 3000;
    pointLight1.shadow.mapSize.width = 1000;
    pointLight1.shadow.mapSize.height = 1000;
    lightsGroup.add(pointLight1);

    // let cylinder = new THREE.SphereGeometry(10, 10, 30);
    // let material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    // let sphereBigMesh = new THREE.Mesh(cylinder, material);
    // sphereBigMesh.position.set(pointLight1.position.x, pointLight1.position.y, pointLight1.position.z);
    // lightsGroup.add(sphereBigMesh);

    let pointLight2 = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.1);
    pointLight2.position.set(800, 650, -500);
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

    let angle = 0;

    switch (sceneID) {
      case 'intro':
        this.setCameraIntro();
        this.setPositionObjStorySceneRelativeCamera(this.lights, 0);
        this.suitcase.position.set(0, 0, this.camera.position.z + 1000);
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

  setCameraIntro() {
    this.camera.position.set(0, 0, this.introGroupObj.position.z + 1405);
    this.controls.target.set(this.introGroupObj.position.x, this.introGroupObj.position.y, this.introGroupObj.position.z);
    this.directionalLight.target = this.introGroupObj;
  }

  setCameraStory(angle) {
    const posX = 1900 * Math.cos(angle * THREE.Math.DEG2RAD);
    const posZ = 1900 * Math.sin(angle * THREE.Math.DEG2RAD);
    this.camera.position.set(this.SceneAllStory.position.x + posX, this.SceneAllStory.position.y + 600, this.SceneAllStory.position.z + posZ);
    this.controls.target.set(this.SceneAllStory.position.x, this.SceneAllStory.position.y, this.SceneAllStory.position.z);
    this.setPositionObjStorySceneRelativeCamera(this.lights, angle);
    this.directionalLight.target = this.SceneAllStory;
    this.setPositionObjStorySceneRelativeCamera(this.suitcase, angle);
  }

  setPositionObjStorySceneRelativeCamera(obj, angle) {
    let angleObj = 0;

    switch (angle) {
      case 90:
        angleObj = 0
        break;
      case 0:
        angleObj = 90
        break;
      case -90:
        angleObj = 180
        break;
      case 180:
        angleObj = -90
        break;
    }
    obj.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, angleObj * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
    obj.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
  }

  animIntroScene() {
    if(this.introGroupObj.children.length != 10){
      return
    } else if (this.introSceneIaAnim != true) {
      this.introSceneIaAnim = true;
      this.introGroupObj.startAnimimations();
    }
  }

  render() {
    this.renderer.render(this.scene, this.camera);

    this.animIntroScene();
    this.startAanimationsSuitcase();

    if (isOrbitControl) {
      this.controls.update();
    }

    if (this.isAnim) {
      requestAnimationFrame(this.render);
    } else {
      cancelAnimationFrame(this.render);
    }
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
  }
}

export default IntroAndStory
