import { useState } from "react";
import classes from "./Cube.module.css";

const Cube = () => {
  const [currentFace, setCurrentFace] = useState("blue");

  const radioSelectHandler = (e) => {
     setCurrentFace(e.target.value)
  }

  
  const cubeOrientation = (classes[currentFace])
  console.log(cubeOrientation)

  return (
    <>
      <div className={classes.scene}>
        <div className={`${classes.cube} ${cubeOrientation}`}>
          <div className={`${classes.cubeFace} ${classes.cubeFaceFront}`}>
            front
          </div>
          <div className={`${classes.cubeFace} ${classes.cubeFaceBack}`}>
            back
          </div>
          <div className={`${classes.cubeFace} ${classes.cubeFaceRight}`}>
            right
          </div>
          <div className={`${classes.cubeFace} ${classes.cubeFaceLeft}`}>
            left
          </div>
          <div className={`${classes.cubeFace} ${classes.cubeFaceTop}`}>
            top
          </div>
          <div className={`${classes.cubeFace} ${classes.cubeFaceBottom}`}>
            bottom
          </div>
        </div>
      </div>
      <br></br>
      <div className={classes.inputs} onChange={radioSelectHandler}>
        <label>
          <input type="radio" name="cube-facing" value="blue" defaultChecked /> Blue
        </label>
        <label>
          <input type="radio" name="cube-facing" value="green" /> Green
        </label>
        <label>
          <input type="radio" name="cube-facing" value="orange" /> Orange
        </label>
        <label>
          <input type="radio" name="cube-facing" value="red" /> Red
        </label>
        <label>
          <input type="radio" name="cube-facing" value="yellow" /> Yellow
        </label>
        <label>
          <input type="radio" name="cube-facing" value="white" /> White
        </label>
      </div>
    </>
  );
};

export default Cube;
