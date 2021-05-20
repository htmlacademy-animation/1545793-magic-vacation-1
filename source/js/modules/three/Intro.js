import * as THREE from 'three';
import bubbleRawShaderMaterial from './storyScene/materials/bubbleRawShaderMaterial';
import SVGObject from '../three/svgLoader/SVGObject.js';
import { colors, reflectivity } from '../helpers/colorsAndReflection.js';

class Intro {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvasID = `screen__canvas--intro`;
    this.texture = {src: `./img/module-5/scenes-textures/scene-0.png`, options: {hue: 0.0}};
    this.textureWidth = 2048;
    this.textureHeight = 1024;
    this.textureRatio = this.textureWidth / this.textureHeight;
    this.cameraAspect = this.width / this.height;

    this.render = this.render.bind(this);
    this.updateSize = this.updateSize.bind(this);
  }

  setMaterial (options = {}) {
    const {color, ...other} = options;
  
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      ...other
    });
  }

  setLights() {
    const lightsGroup = new THREE.Group();

    let directionalLight = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 0.10);
    directionalLight.position.set(0, 1200 * Math.tan(-15 * THREE.Math.DEG2RAD), 1200);
    lightsGroup.add(directionalLight);

    let pointLight1 = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.80, 3000, 0.5);
    pointLight1.position.set(-785, -350, 0);
    lightsGroup.add(pointLight1);

    let pointLight2 = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.30, 3000, 0.5);
    pointLight2.position.set(730, 400, 0);
    lightsGroup.add(pointLight2);

    return lightsGroup;
  }

  init(){
    if (!this.initialized) {
      this.prepareScene();
      this.initialized = true;
    }

    this.animationRequest = requestAnimationFrame(this.render);
  }

  prepareScene() {
    window.addEventListener(`resize`, this.updateSize);

    this.canvas = document.getElementById(this.canvasID);

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setClearColor(0x5f458c, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.camera = new THREE.PerspectiveCamera(45, this.cameraAspect, 0.1, 1200);
    this.camera.position.z = 1200;

    this.scene = new THREE.Scene();

    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const loadedTexture = textureLoader.load(this.texture.src);

    this.createSvgObjs();

    loadManager.onLoad = () => {
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.RawShaderMaterial(bubbleRawShaderMaterial({
        map: {value: loadedTexture},
        options: {value: this.texture.options}
      }));
      const image = new THREE.Mesh(geometry, material);

      image.scale.x = this.textureWidth;
      image.scale.y = this.textureHeight;

      const lights = this.setLights();
      lights.position.z = this.camera.position.z;
      this.scene.add(lights);

      this.scene.add(image);
      this.render();
    };
  }

  createSvgObjs(){
    this.loadKeyhole();
    this.loadFlamingo();
    this.loadLeaf();
    this.loadQuestion();
    this.loadSnowflake();
    this.addPlane();
  }

  addPlane() {
    const plane = new THREE.PlaneGeometry(500, 500);
    const planeMesh = new THREE.Mesh(plane, this.setMaterial({ color: colors.Purple, ...reflectivity.basic, flatShading: true}));

    planeMesh.position.set(0, 0, 5);
    this.scene.add(planeMesh);
  }

  async loadKeyhole() {
    const keyhole = await new SVGObject(`keyhole`).getObject();
    const scale = 1.5;
    keyhole.position.set(-1000 * scale, 1010 * scale, 10);
    keyhole.scale.set(scale, -scale, scale);
    this.scene.add(keyhole);
  }

  async loadFlamingo() {
    const flamingo = await new SVGObject(`flamingo`).getObject();
    const scale = 2;
    flamingo.position.set(-480, 370, 100);
    flamingo.scale.set(-scale, -scale, scale);
    flamingo.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 30 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD), `XYZ`);
    this.scene.add(flamingo);
  }

  async loadLeaf() {
    const leaf = await new SVGObject(`leaf`).getObject();
    const scale = 1.5;
    leaf.position.set(660, 350, 100);
    leaf.scale.set(scale, -scale, scale);
    leaf.rotation.copy(new THREE.Euler(10 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD, -60 * THREE.Math.DEG2RAD), `XYZ`);
    this.scene.add(leaf);
  }

  async loadQuestion() {
    const question = await new SVGObject(`question`).getObject();
    const scale = 1.6;
    question.position.set(100, -330, 100);
    question.scale.set(scale, -scale, scale);
    question.rotation.copy(new THREE.Euler(-30 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 20 * THREE.Math.DEG2RAD), `XYZ`);
    this.scene.add(question);
  }

  async loadSnowflake() {
    const snowflake = await new SVGObject(`snowflake`).getObject();
    const scale = 1.4;
    snowflake.position.set(-450, -10, 100);
    snowflake.scale.set(scale, scale, scale);
    snowflake.rotation.copy(new THREE.Euler(-10 * THREE.Math.DEG2RAD, 30 * THREE.Math.DEG2RAD, 10 * THREE.Math.DEG2RAD), `XYZ`);
    this.scene.add(snowflake);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
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
    this.render();
  }
}

export default Intro
