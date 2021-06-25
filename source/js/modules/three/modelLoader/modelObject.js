import modelsSettings from './modelsConfig.js';

class ModelObject {
  constructor(name) {
    this.name = name;
  }

  getObject() {
    const modelObj = modelsSettings.find((obj) => {
      return obj.name === this.name;
    });
    return modelObj;
  }
}

export default ModelObject;
