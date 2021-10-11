import * as THREE from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import ModelObject from '../../three/modelLoader/modelObject.js';
import hideObjForMobile from '../../helpers/hideObjForMobile.js';
import {isMobile} from '../IntroAndStory.js';
import {setMaterial} from '../../helpers/setMaterial.js';
import {reflectivity} from '../../helpers/colorsAndReflection.js';

const onComplete = (obj3d, isShadow, settings, material, callback) => {
  if (material) {
    obj3d.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  } else if (isMobile) {
    hideObjForMobile(obj3d);

    obj3d.traverse((child) => {
      if (child.isMesh) {
        const {color} = child.material;
        child.material = setMaterial({color, ...reflectivity.basic});
      }
    });
  }

  if (isShadow) {
    obj3d.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = settings.castShadow;
        child.receiveShadow = settings.receiveShadow;
      }
    });
  }

  if (isMobile) {
    hideObjForMobile(obj3d);
  }

  if (typeof callback === `function`) {
    callback.call(null, obj3d);
  }
};

const onGltfComplete = (gltf, isShadow, settings, material, callback) => {
  if (!gltf.scene) {
    return;
  }
  onComplete(gltf.scene, isShadow, settings, material, callback);
};

const LoaderByType = {
  gltf: GLTFLoader,
  obj: OBJLoader,
};

const LoadingFnByType = {
  gltf: onGltfComplete,
  obj: onComplete,
};

export const loadModel = (nameObj, isShadow, material, callback) => {
  if (!nameObj) {
    return;
  }

  const modelObj = new ModelObject(nameObj).getObject();

  const Loader = LoaderByType[modelObj.type];
  const loadingFn = LoadingFnByType[modelObj.type];
  if (!Loader || !loadingFn) {
    return;
  }

  const loadManager = new THREE.LoadingManager();
  const loader = new Loader(loadManager);

  loader.load(modelObj.path, (model) => loadingFn(model, isShadow, modelObj, material, callback));
};
