const namesHideObj = [`Skis`, `surfobj`, `Table`, `Starfish_Null`, `Lantern`];

export default (objs3D) => {
  namesHideObj.forEach((name) => {
    const obj = objs3D.getObjectByName(name);
    if (obj) {
      obj.visible = false;
    }
  });
};
