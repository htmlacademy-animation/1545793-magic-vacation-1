import * as THREE from 'three';

import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader.js';
import svgSettings from './svgConfig.js'

const svgLoader = new SVGLoader();

const awaitLoader = (SvgLoader, url) => {
  return new Promise((resolve, reject) => {
    SvgLoader.load(url, (data) => resolve(data), null, reject);
  });
};

const createSvgGroup = (data, settings) => {
  const paths = data.paths;
  const group = new THREE.Group();

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(settings.color),
    });

    const shapes = path.toShapes(false);

    for (let j = 0; j < shapes.length; j++) {

      const shape = shapes[j];
      const geometry = new THREE.ExtrudeBufferGeometry(shape, {
        depth: settings.depth,
        bevelEnabled: true,
        bevelThickness: settings.cap,
      });
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
    }
  }

  group.name = settings.name;

  return group;
};

export default svgSettings.reduce(async (resultPromise, setting) => {
  const data = await awaitLoader(svgLoader, setting.src);
  const svgGroup = createSvgGroup(data, setting);

  const result = await resultPromise;
  result.add(svgGroup);
  return result;
}, new THREE.Group());
