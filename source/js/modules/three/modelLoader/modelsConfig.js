import { colors, reflectivity } from '../../helpers/colorsAndReflection.js'

const modelsSettings = [
  {
    name: `airplane`,
    type: `obj`,
    path: `./3d/module-6/scene-0-objects/airplane.obj`,
    color: colors.White,
    reflectivity: reflectivity.soft
  },
  {
    name: `suitcase`,
    type: `gltf`,
    path: `./3d/module-6/scene-0-objects/suitcase.gltf`,
  },
  {
    name: `watermelon`,
    type: `gltf`,
    path: `./3d/module-6/scene-0-objects/watermelon.gltf`,
  },
]

export default modelsSettings
