import * as THREE from 'three';
import {loadModel} from '../../three/modelLoader/modelLoader.js';
import {loadSVG} from '../../three/svgLoader/svgLoader.js';
import {colors, reflectivity} from '../../helpers/colorsAndReflection.js';
import Saturn from '../../three/storyScene/objects/Saturn.js';
import {isMobile} from '../IntroAndStory.js';
import {animIntroObj, animSuitcaseIntro, animAirplaneIntro, animOpacity, isFinishFirsAnimObj, setPositionIntroObj} from '../../helpers/animations.js';


class SceneIntro extends THREE.Group {
  constructor() {
    super();

    this.isShadow = !isMobile;

    this.counterLoadObj = 0;

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
    const {color, matcapMaterial, roughness, metalness} = options;

    if (isMobile && matcapMaterial) {
      const textureLoader = new THREE.TextureLoader();
      const matcap = textureLoader.load(matcapMaterial);

      return new THREE.MeshMatcapMaterial({color: new THREE.Color(color), matcap});
    }

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness,
      metalness,
    });
  }

  setOptAnimObj() {
    this.suitcase.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [0.5, 0.5, 0.5],
      startPosition: [0, 0, 100],
      finishPosition: [-70, -170, 400],
      startRotation: [-100, 0, 0],
      finishRotation: [20, -50, -10],
      amp: -0.35,
      period: 0.35
    };

    this.airplane.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [1.1, 1.1, 1.1],
      startRotationAirplane: [0, -90, -180],
      finishRotationAirplane: [-30, -90, 30],
      startPositionYZ: [0, 0, 0],
      finishPositionYZ: [0, 230, -200],
      startRotationAxis: 0,
      finishRotationAxis: 200,
      amp: 0.3,
      period: 0.4
    };

    this.flamingo.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [-2, -2, 2],
      startPosition: [0, 0, 100],
      finishPositionLS: [-480, 370, 100],
      finishPositionPO: [-150, 370, 100],
      amp: -0.3,
      period: 0.3
    };

    this.watermelon.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [1, 1, 1],
      startPosition: [0, 0, 100],
      finishPositionLS: [-300, -150, 800],
      finishPositionPO: [-140, -150, 800],
      amp: -0.3,
      period: 0.3
    };

    this.leaf.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [1.4, -1.4, 1.4],
      startPosition: [0, 0, 100],
      finishPositionLS: [660, 330, 150],
      finishPositionPO: [260, 330, 150],
      amp: 0.3,
      period: 0.3
    };

    this.question.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [1.6, -1.6, 1.6],
      startPosition: [0, 0, 100],
      finishPositionLS: [100, -330, 100],
      finishPositionPO: [100, -330, 100],
      amp: -0.2,
      period: 0.3
    };

    this.snowflake.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [1.4, 1.4, 1.4],
      startPosition: [0, 0, 100],
      finishPositionLS: [-450, -10, 100],
      finishPositionPO: [-180, -10, 100],
      amp: 0.3,
      period: 0.2
    };

    this.saturn.optAnim = {
      startScale: [0, 0, 0],
      finishScale: [0.6, 0.6, 0.6],
      startPosition: [0, 0, 100],
      finishPositionLS: [400, -100, 500],
      finishPositionPO: [130, -100, 500],
      amp: -0.3,
      period: 0.3
    };
  }

  addPlane() {
    this.counterLoadObj += 1;
    const plane = new THREE.PlaneGeometry(500, 500);
    const planeMesh = new THREE.Mesh(plane, this.setMaterial({color: colors.Purple, ...reflectivity.basic, flatShading: true}));

    planeMesh.position.set(0, 0, -50);
    this.plane = planeMesh;
    this.add(this.plane);
  }

  addAirplane() {
    this.counterLoadObj += 1;
    loadModel(`airplane`, this.isShadow, this.setMaterial({color: colors.White, ...reflectivity.soft}), (mesh) => {

      const groupScale = this.getGroup(`scale`, mesh);
      const groupRotationAirplane = this.getGroup(`rotationAirplane`, groupScale);
      const groupPositionYZ = this.getGroup(`positionYZ`, groupRotationAirplane);
      const groupRotationAxis = this.getGroup(`rotationAxis`, groupPositionYZ);
      const groupMove = this.getGroup(`move`, groupRotationAxis);


      // const scale = 1.2;
      // mesh.position.set(250, 130, 150);
      // mesh.scale.set(scale, scale, scale);
      // mesh.rotation.copy(new THREE.Euler(60 * THREE.Math.DEG2RAD, 140 * THREE.Math.DEG2RAD, -15 * THREE.Math.DEG2RAD));

      const scale = 0;
      groupScale.scale.set(scale, scale, scale);
      groupRotationAirplane.rotation.copy(new THREE.Euler(90 * THREE.Math.DEG2RAD, -90 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
      groupMove.position.set(140, -170, 0);

      this.airplane = groupMove;
      this.add(this.airplane);
    });
  }

  addSuitcase() {
    this.counterLoadObj += 1;
    loadModel(`suitcase`, this.isShadow, null, (mesh) => {
      mesh.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, -90 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));

      const groupScale = this.getGroup(`scale`, mesh);
      const groupRotation = this.getGroup(`rotation`, groupScale);
      const groupPositionXY = this.getGroup(`positionXY`, groupRotation);
      const groupMove = this.getGroup(`move`, groupPositionXY);

      const scale = 0;
      groupScale.scale.set(scale, scale, scale);
      groupMove.position.set(0, 0, 50);
      groupRotation.rotation.copy(new THREE.Euler(-100 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));

      this.suitcase = groupMove;
      this.add(this.suitcase);
    });
  }

  getGroup(name, child) {
    const group = new THREE.Group();
    group.name = name;
    group.add(child);
    return group;
  }

  addWatermelon() {
    this.counterLoadObj += 1;
    loadModel(`watermelon`, this.isShadow, null, (mesh) => {
      const scale = 0;
      mesh.position.set(-300, -150, 800);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.copy(new THREE.Euler(20 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD, 130 * THREE.Math.DEG2RAD));
      this.watermelon = mesh;
      this.add(mesh);
    });
  }

  loadKeyhole() {
    this.counterLoadObj += 1;
    loadSVG(`keyhole`, this.isShadow, (svgGroup) => {
      const scale = 1.5;
      svgGroup.position.set(-1000 * scale, 1010 * scale, 10);
      svgGroup.scale.set(scale, -scale, scale);
      this.add(svgGroup);
    });
  }

  loadFlamingo() {
    this.counterLoadObj += 1;
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
    this.counterLoadObj += 1;
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
    this.counterLoadObj += 1;
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
    this.counterLoadObj += 1;
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
    this.counterLoadObj += 1;
    const saturn = new Saturn(false, this.isShadow);
    const scale = 0;
    saturn.scale.set(scale, scale, scale);
    saturn.position.set(400, -100, 500);
    saturn.rotation.copy(new THREE.Euler(0, 0, 20 * THREE.Math.DEG2RAD));
    this.saturn = saturn;
    this.add(saturn);
  }

  hidePlane(dur, delay) {
    setTimeout(() => {
      animOpacity(this.plane, 0, dur);
    }, delay);
  }

  showPlane() {
    this.plane.material.opacity = 1;
  }

  startAnimimations() {
    const duration = 1500;
    this.objectsArr = [
      this.watermelon,
      this.flamingo,
      this.leaf,
      this.question,
      this.snowflake,
      this.saturn
    ];

    this.setOptAnimObj();

    animIntroObj(this.objectsArr, duration, `easeOutCubic`);
    animSuitcaseIntro(this.suitcase, duration, `easeOutCubic`);
    setTimeout(() => {
      animAirplaneIntro(this.airplane, duration, `easeOutCubic`);
    }, 500);
  }

  setPositionIntroObj() {
    if (isFinishFirsAnimObj) {
      setPositionIntroObj(this.objectsArr);
    }
  }
}

export default SceneIntro;
