import * as THREE from 'three';
import bubbleRawShaderMaterial from '../three/bubbleRawShaderMaterial';

export default class Story {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvasID = `screen__canvas--story`;
    this.textures = [
      `./img/module-5/scenes-textures/scene-1.png`,
      `./img/module-5/scenes-textures/scene-2.png`,
      `./img/module-5/scenes-textures/scene-3.png`,
      `./img/module-5/scenes-textures/scene-4.png`,
    ];
    this.textureWidth = 2048;
    this.textureHeight = 1024;
    this.textureRatio = this.textureWidth / this.textureHeight;
    this.cameraAspect = this.width / this.height;

    this.render = this.render.bind(this);
    this.updateSize = this.updateSize.bind(this);
  }

  init() {
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
    const loadedTextures = this.textures.map((texture) =>
      textureLoader.load(texture)
    );

    loadManager.onLoad = () => {
      loadedTextures.forEach((texture, positionX) => {
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.RawShaderMaterial(bubbleRawShaderMaterial(texture));
        const image = new THREE.Mesh(geometry, material);

        image.scale.x = this.textureWidth;
        image.scale.y = this.textureHeight;
        image.position.x = this.textureWidth * positionX;

        this.scene.add(image);
        this.render();
      });
    };
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

  setScene(sceneID) {
    this.camera.position.x = this.textureWidth * sceneID;
    this.render();
  }
}
