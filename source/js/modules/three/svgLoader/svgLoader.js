import * as THREE from 'three';
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader.js';
import {setMaterial} from '../../helpers/setMaterial.js';
import SVGObject from './SVGObject.js';


const createSvgGroup = (data, isShadow, settings) => {
  const paths = data.paths;
  const group = new THREE.Group();

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];

    const material = setMaterial({
      color: new THREE.Color(settings.color),
      ...settings.reflectivity
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

      if (isShadow) {
        mesh.castShadow = settings.castShadow;
        mesh.receiveShadow = settings.receiveShadow;
      }

      group.add(mesh);
    }
  }

  group.name = settings.name;

  return group;
};

export const loadSVG = (nameSvg, isShadow, callback) => {
  let svg;
  if (!nameSvg) {
    return;
  }

  const svgObj = new SVGObject(nameSvg).getObject();

  const loadManager = new THREE.LoadingManager();
  const loader = new SVGLoader(loadManager);

  loader.load(svgObj.src, (data) => {
    svg = createSvgGroup(data, isShadow, svgObj);

    callback(svg);
  });
};
