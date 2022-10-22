import { useState } from "react";
import classes from "./Cube.module.css";

import CubeFace from "./CubeFace";

const Cube = (props) => {
  

  const cubeOrientation = classes[props.currentFace];
  console.log(cubeOrientation);

  return (
    <>
      <div className={classes.scene}>
        <div className={`${classes.cube} ${cubeOrientation}`}>
          <CubeFace face={"front"} />
          <CubeFace face={"back"} />
          <CubeFace face={"right"} />
          <CubeFace face={"left"} />
          <CubeFace face={"top"} />
          <CubeFace face={"bottom"} />
        </div>
      </div>
    </>
  );
};

export default Cube;
