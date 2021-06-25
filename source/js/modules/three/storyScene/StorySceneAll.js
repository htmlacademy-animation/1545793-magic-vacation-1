import * as THREE from 'three';
import Scene0Story from './Scene0Story.js';
import Scene1Story from './Scene1Story.js';
import Scene2Story from './Scene2Story.js';
import Scene3Story from './Scene3Story.js';

class StorySceneAll extends THREE.Group {
  constructor() {
    super();

    this.constructChildren();
  }

  constructChildren() {
    this.addScene0Story();
    this.addScene1Story();
    this.addScene2Story();
    this.addScene3Story();
  }

  addScene0Story() {
    const scene0Story = new Scene0Story();
    scene0Story.position.set(0, 0, 0);
    this.scene0Story = scene0Story;
    this.add(scene0Story);
  }

  addScene1Story() {
    const scene1Story = new Scene1Story();
    scene1Story.position.set(0, 0, 0);
    scene1Story.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 90 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
    this.scene1Story = scene1Story;
    this.add(scene1Story);
  }

  addScene2Story() {
    const scene2Story = new Scene2Story();
    scene2Story.position.set(0, 0, 0);
    scene2Story.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 180 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
    this.scene2Story = scene2Story;
    this.add(scene2Story);
  }

  addScene3Story() {
    const scene3Story = new Scene3Story();
    scene3Story.position.set(0, 0, 0);
    scene3Story.rotation.copy(new THREE.Euler(0 * THREE.Math.DEG2RAD, 270 * THREE.Math.DEG2RAD, 0 * THREE.Math.DEG2RAD));
    this.scene3Story = scene3Story;
    this.add(scene3Story);
  }

  animationsScene(activeScene) {
    switch (activeScene) {
      case `fromIntroToScene0`:
        if (this.children[0].children.length !== this.children[0].counterLoadObj) {
          return;
        } else {
          this.children[0].animations();
        }
        break;
      case `scene0`:
        if (this.children[0].children.length !== this.children[0].counterLoadObj) {
          return;
        } else {
          this.children[0].animations();
        }
        break;
      case `scene1`:
        if (this.children[1].children.length !== this.children[1].counterLoadObj) {
          return;
        } else {
          this.children[1].animations();
        }
        break;
      case `scene2`:
        if (this.children[2].children.length !== this.children[2].counterLoadObj) {
          return;
        } else {
          this.children[2].animations();
        }
        break;
      case `scene3`:
        if (this.children[3].children.length !== this.children[3].counterLoadObj) {
          return;
        } else {
          this.children[3].animations();
        }
        break;
    }
  }
}

export default StorySceneAll;
