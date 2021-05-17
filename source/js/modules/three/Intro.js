import * as THREE from 'three';
import bubbleRawShaderMaterial from '../three/bubbleRawShaderMaterial';

import SVGObject from '../three/svgLoader/SVGObject.js'

export default class Intro {
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
  }

  async loadKeyhole() {
    const keyhole = await new SVGObject(`keyhole`).getObject();
    const scale = 1.5;
    keyhole.position.set(-1000 * scale, 1010 * scale, 0);
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
