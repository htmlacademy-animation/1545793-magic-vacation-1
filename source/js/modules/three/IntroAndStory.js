import * as THREE from 'three';
import SceneIntro from './introScene/SceneIntro.js';
import SceneAllStory from './storyScene/StorySceneAll.js';
import {loadModel} from '../three/modelLoader/modelLoader.js';
import {animateScale, animateMoveY, animateWithFPS} from '../helpers/animations.js';
import CameraAndLight from './CameraAndLight.js';
import startAnim from '../startAnim.js';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass';
import bubbleRawShaderMaterial from './storyScene/materials/bubbleRawShaderMaterial';

export const isMobile = /android|ipad|iphone|ipod/i.test(navigator.userAgent) && !window.MSStream;
export let isLandscape;
export let activeScene;

class IntroAndStory {
  constructor() {
    this.canvasID = `screen__canvas--introAndStory`;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvasCenter = {x: this.width, y: this.height};
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

    this.roomSettings = [
      {
        options: {hue: 0.0}
      },
      {options: {
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
      }
      }
    ];

    this.bubbleGlareOffset = 0.8;
    this.bubbleGlareStartRadianAngle = 2;
    this.bubbleGlareEndRadianAngle = 2.8;

    this.bubblesDuration = 3000;

    this.bubbles = [
      {
        radius: this.width * 0.1,
        initialPosition: [this.canvasCenter.x - this.width * 0.25, this.canvasCenter.y - this.height * 1.8],
        position: [this.canvasCenter.x - this.width * 0.25, this.canvasCenter.y - this.height * 1.8],
        finalPosition: [this.canvasCenter.x - this.width * 0.25, this.canvasCenter.y + this.height * 1.8],
        amplitude: 80,
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle
      },
      {
        radius: this.width * 0.15,
        initialPosition: [this.canvasCenter.x, this.canvasCenter.y - this.height * 1.3],
        position: [this.canvasCenter.x, this.canvasCenter.y - this.height * 1.3],
        finalPosition: [this.canvasCenter.x, this.canvasCenter.y + this.height * 2.6],
        amplitude: -100,
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle
      },
      {
        radius: this.width * 0.05,
        initialPosition: [this.canvasCenter.x + this.width * 0.1, this.canvasCenter.y - this.height * 2],
        position: [this.canvasCenter.x + this.width * 0.1, this.canvasCenter.y - this.height * 2],
        finalPosition: [this.canvasCenter.x + this.width * 0.1, this.canvasCenter.y + this.height * 1.2],
        amplitude: 60,
        glareOffset: this.bubbleGlareOffset,
        glareAngleStart: this.bubbleGlareStartRadianAngle,
        glareAngleEnd: this.bubbleGlareEndRadianAngle
      },
    ];
  }

  init() {
    window.addEventListener(`resize`, this.updateSize);

    this.canvas = document.getElementById(this.canvasID);

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.sceneSize = new THREE.Vector2();

    this.isLandscape();

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, logarithmicDepthBuffer: true});
    this.renderer.setClearColor(0x5f458c, 1);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(this.cameraFov, this.cameraAspect, 0.1, 5000);

    this.addScene();

    this.composer = new EffectComposer(this.renderer);
    this.composer.setPixelRatio(window.devicePixelRatio);
    this.composer.setPixelRatio(window.devicePixelRatio);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    this.getEffectMaterial = (texture) => new THREE.RawShaderMaterial(bubbleRawShaderMaterial({
      map: {value: texture},
      options: {value: this.roomSettings[1].options},
      ...this.addBubble(1),
    }));
    this.effectMaterial = this.getEffectMaterial();

    const effectPass = new ShaderPass(this.effectMaterial, `map`);
    this.composer.addPass(effectPass);

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

  getSceneSize() {
    this.renderer.getSize(this.sceneSize);
    return this.sceneSize;
  }

  addBubble(index) {
    const {width, height} = this.getSceneSize();
    const pixelRatio = this.renderer.getPixelRatio();

    if (this.roomSettings[index].options.isMagnifier) {
      return {
        magnification: {
          value: {
            bubbles: this.bubbles,
            resolution: [width * pixelRatio, height * pixelRatio],
          }
        },
      };
    }

    return {};
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
    activeScene = this.activeScene;

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
        this.resetHueShift(0);
        this.resetBubbles();
        this.cameraAndLight.setCameraStory(angle, duration, `easeLinear`);
        break;
      case `scene1`:
        angle = 90;
        this.resetHueShift(1);
        this.animateHueShift();

        this.resetBubbles();
        this.animateBubbles(0);
        this.animateBubbles(1);
        this.animateBubbles(2);

        this.cameraAndLight.setCameraStory(angle, duration, `easeLinear`);
        break;
      case `scene2`:
        angle = 180;
        this.resetHueShift(0);
        this.resetBubbles();
        this.cameraAndLight.setCameraStory(angle, duration, `easeLinear`);
        break;
      case `scene3`:
        angle = 270;
        this.resetHueShift(0);
        this.resetBubbles();
        this.cameraAndLight.setCameraStory(angle, duration, `easeLinear`);
        break;
    }

  }

  animIntroScene() {
    if (this.introGroupObj.children.length !== this.introGroupObj.counterLoadObj) {
      document.querySelector(`.progress-bar`).textContent = `${Math.round(this.introGroupObj.children.length / this.introGroupObj.counterLoadObj * 100) + 10} %`;
      return;
    } else if (this.introSceneIaAnim !== true) {
      this.introSceneIaAnim = true;
      startAnim();
      this.introGroupObj.startAnimimations();
    }
  }

  render() {
    // this.renderer.render(this.scene, this.camera);
    this.composer.render();

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

    const {width, height} = this.getSceneSize();
    const pixelRatio = this.renderer.getPixelRatio();
    const resolution = [width * pixelRatio, height * pixelRatio];
    this.effectMaterial.uniforms.magnification.value.resolution = resolution;
  }

  resetHueShift(index) {
    this.roomSettings[index].options.hue = this.roomSettings[index].options.hue;
  }

  hueShiftIntensityAnimationTick(from, to) {
    return (progress) => {
      let hueShift;
      if (progress < 0.5) {
        hueShift = from + progress * (to - from);
      } else {
        hueShift = to + progress * (from - to);
      }
      this.roomSettings[1].options.hue = hueShift;
    };
  }

  animateHueShift() {
    const {initalHue, finalHue, duration, variation} = this.roomSettings[1].options.animationSettings.hue;
    const offset = (Math.random() * variation * 2 + (1 - variation));
    let anim = () => {
      animateWithFPS(this.hueShiftIntensityAnimationTick(initalHue, finalHue * offset), duration * offset, 30, () => {
        if (this.activeScene === `scene1`) {
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
            if (this.activeScene === `scene1`) {
              anim();
            }
          }
      );
    };
    anim();
  }
}

export default IntroAndStory;
