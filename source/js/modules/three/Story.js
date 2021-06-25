import * as THREE from 'three';
import bubbleRawShaderMaterial from './storyScene/materials/bubbleRawShaderMaterial';
import {animateWithFPS} from '../helpers/animations.js';
import Scene0Story from './storyScene/Scene0Story.js';
import Scene1Story from './storyScene/Scene1Story.js';
import Scene2Story from './storyScene/Scene2Story.js';
import Scene3Story from './storyScene/Scene3Story.js';

export let activeScene;
let animSceneKey = false;

export const setMaterial = (options = {}) => {
  const {color, ...other} = options;

  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    ...other
  });
};

export class Story {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvasCenter = {x: this.width, y: this.height};

    this.canvasID = `screen__canvas--story`;
    this.textures = [
      {src: `./img/module-5/scenes-textures/scene-1.png`,
        options: {hue: 0.0},
        scene: new Scene0Story()},
      {src: `./img/module-5/scenes-textures/scene-2.png`, options: {
        hue: 0.1,
        isMagnifier: true,
        animationSettings: {
          hue: {
            initalHue: 0.1,
            finalHue: -0.5,
            duration: 3000,
            variation: 0.3,
          },
        }
      },
      scene: new Scene1Story()
      },
      {src: `./img/module-5/scenes-textures/scene-3.png`,
        options: {hue: 0.0},
        scene: new Scene2Story()
      },
      {src: `./img/module-5/scenes-textures/scene-4.png`,
        options: {hue: 0.0},
        scene: new Scene3Story()
      },
    ];
    this.textureWidth = 2048;
    this.textureHeight = 1024;
    this.textureRatio = this.textureWidth / this.textureHeight;
    this.cameraAspect = this.width / this.height;
    this.position = {z: 1500};

    this.bubbleGlareOffset = 0.8;
    this.bubbleGlareStartRadianAngle = 2;
    this.bubbleGlareEndRadianAngle = 2.8;

    this.bubblesDuration = 3000;

    this.bubbles = [
      {
        radius: this.width * 0.1,
        initialPosition: [this.canvasCenter.x - this.width * 0.5, this.canvasCenter.y - this.height * 1.8],
        position: [this.canvasCenter.x - this.width * 0.5, this.canvasCenter.y - this.height * 1.8],
        finalPosition: [this.canvasCenter.x - this.width * 0.5, this.canvasCenter.y + this.height * 1.8],
        amplitude: 80,
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle
      },
      {
        radius: this.width * 0.15,
        initialPosition: [this.canvasCenter.x - this.width * 0.18, this.canvasCenter.y - this.height * 1.3],
        position: [this.canvasCenter.x - this.width * 0.18, this.canvasCenter.y - this.height * 1.3],
        finalPosition: [this.canvasCenter.x - this.width * 0.18, this.canvasCenter.y + this.height * 2.6],
        amplitude: -100,
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle
      },
      {
        radius: this.width * 0.05,
        initialPosition: [this.canvasCenter.x, this.canvasCenter.y - this.height * 2],
        position: [this.canvasCenter.x, this.canvasCenter.y - this.height * 2],
        finalPosition: [this.canvasCenter.x, this.canvasCenter.y + this.height * 1.2],
        amplitude: 60,
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle
      },
    ];

    this.render = this.render.bind(this);
    this.updateSize = this.updateSize.bind(this);
  }

  addBubble(index) {
    const width = this.renderer.getSize().width;
    const pixelRatio = this.renderer.getPixelRatio();

    if (this.textures[index].options.isMagnifier) {
      return {
        magnification: {
          value: {
            bubbles: this.bubbles,
            resolution: [width * pixelRatio, width / this.textureRatio * pixelRatio],
          }
        },
      };
    }

    return {};
  }

  // setSphere() {
  //   const geometry = new THREE.SphereGeometry(100, 50, 50);

  //   const material = new THREE.MeshStandardMaterial({
  //     color: 0xff0000,
  //     metalness: 0.05,
  //     emissive: 0x0,
  //     roughness: 0.5,
  //   });

  //   return new THREE.Mesh(geometry, material);
  // }

  setLights() {
    const lightsGroup = new THREE.Group();

    let directionalLight = new THREE.DirectionalLight(new THREE.Color(`rgb(255,255,255)`), 0.10);
    // let directionalLight = new THREE.DirectionalLight(new THREE.Color(`rgb(173, 255,47)`), 0.20);
    directionalLight.position.set(0, this.position.z * Math.tan(-15 * THREE.Math.DEG2RAD), this.position.z);
    lightsGroup.add(directionalLight);

    let pointLight1 = new THREE.PointLight(new THREE.Color(`rgb(246,242,255)`), 0.80, 3000, 0.5);
    // let pointLight1 = new THREE.PointLight(new THREE.Color(`rgb(255, 20, 147)`), 0.40, 3000, 1);
    pointLight1.position.set(-785, -350, 0);
    lightsGroup.add(pointLight1);

    let pointLight2 = new THREE.PointLight(new THREE.Color(`rgb(245,254,255)`), 0.30, 3000, 0.5);
    // let pointLight2 = new THREE.PointLight(new THREE.Color(`rgb(0, 255, 255)`), 0.40, 3000, 1);
    pointLight2.position.set(730, 400, 0);
    lightsGroup.add(pointLight2);

    return lightsGroup;
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

    this.camera = new THREE.PerspectiveCamera(35, this.cameraAspect, 0.1, 1500);
    this.camera.position.z = this.position.z;

    this.scene = new THREE.Scene();

    const loadManager = new THREE.LoadingManager();
    const textureLoader = new THREE.TextureLoader(loadManager);
    const loadedTextures = this.textures.map((texture) => ({src: textureLoader.load(texture.src), options: texture.options, scene: texture.scene}));

    loadManager.onLoad = () => {
      loadedTextures.forEach((texture, index) => {
        const geometry = new THREE.PlaneGeometry(1, 1);

        const material = new THREE.RawShaderMaterial(bubbleRawShaderMaterial({
          map: {value: texture.src},
          options: {value: texture.options},
          ...this.addBubble(index),
        }));

        const image = new THREE.Mesh(geometry, material);

        image.scale.x = this.textureWidth;
        image.scale.y = this.textureHeight;
        image.position.x = this.textureWidth * index;

        // const sphere = this.setSphere();
        // this.scene.add(sphere);

        const lights = this.setLights();
        lights.position.z = this.camera.position.z;
        // this.scene.add(lights);

        if (texture.scene) {
          texture.scene.position.x = this.textureWidth * index;
          this.scene.add(texture.scene);
          lights.position.x = this.textureWidth * index;
        }

        this.scene.add(lights);

        this.scene.add(image);
        this.render();
      });
    };
  }

  resetHueShift() {
    this.textures[1].options.hue = this.textures[1].options.hue;
  }

  hueShiftIntensityAnimationTick(from, to) {
    return (progress) => {
      let hueShift;
      if (progress < 0.5) {
        hueShift = from + progress * (to - from);
      } else {
        hueShift = to + progress * (from - to);
      }
      this.textures[1].options.hue = hueShift;
    };
  }

  animateHueShift() {
    const {initalHue, finalHue, duration, variation} = this.textures[1].options.animationSettings.hue;
    const offset = (Math.random() * variation * 2 + (1 - variation));
    let anim = () => {
      animateWithFPS(this.hueShiftIntensityAnimationTick(initalHue, finalHue * offset), duration * offset, 30, () => {
        if (activeScene === 1) {
          anim();
        }
      });
    };
    anim();
  }

  resetBubbles() {
    this.bubbles.forEach((_, index) => {
      this.bubbles[index].position = [...this.bubbles[index].initialPosition];
    });
  }

  bubblePositionAnimationTick(bubble, from, to) {
    return (progress) => {
      const y = from[1] + progress * (to[1] - from[1]);
      const offset = bubble.amplitude * Math.pow(1 - progress, 1) * Math.sin(progress * Math.PI * 10);
      const x = (offset + bubble.initialPosition[0]);

      bubble.position = [x, y];
    };
  }

  animateBubbles(index) {
    let anim = () => {
      animateWithFPS(
          this.bubblePositionAnimationTick(this.bubbles[index], this.bubbles[index].initialPosition, this.bubbles[index].finalPosition),
          this.bubblesDuration,
          30,
          () => {
            if (activeScene === 1) {
              anim();
            }
          }
      );
    };
    anim();
  }

  render() {
    this.renderer.render(this.scene, this.camera);

    if (activeScene === 1) {
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
    this.render();
  }

  setScene(sceneID) {
    this.camera.position.x = this.textureWidth * sceneID;

    activeScene = sceneID;
    this.render();

    if (sceneID === 1) {
      if (animSceneKey !== true) {
        animSceneKey = true;

        this.resetHueShift();
        this.animateHueShift();

        this.resetBubbles();
        this.animateBubbles(0);
        this.animateBubbles(1);
        this.animateBubbles(2);

      }
    } else {
      animSceneKey = false;
    }
  }
}
