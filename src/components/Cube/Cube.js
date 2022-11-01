import { useSelector } from "react-redux";

import classes from "./Cube.module.css";
import CubeFace from "./CubeFace";
import Buttons from "../Controls/Buttons";

const Cube = (props) => {
  const xAxis = useSelector((state) => state.axises.xAxis);
  const yAxis = useSelector((state) => state.axises.yAxis);
  const zAxis = useSelector((state) => state.axises.zAxis);
  const currentFace = useSelector((state) => state.faces.currentFace);
  const rightSideFace = useSelector((state) => state.faces.rightSideFace);

  // Updates the css class name to change the cube orientation
  let rotation = {
    transform: `translateZ(-100px) rotateY(${yAxis}deg) rotateX(${xAxis}deg) rotateZ(${zAxis}deg)`,
  };

  const consoleHandler = () => {
    // console.log(coordArray);
    console.log("current face: ", currentFace);
    console.log("right side face: ", rightSideFace);
  };

  return (
    <>
      <div className={classes.scene}>
        <div className={classes.cube} style={rotation}>
          <CubeFace key={1} face={"blue"} />
          <CubeFace key={2} face={"green"} />
          <CubeFace key={3} face={"red"} />
          <CubeFace key={4} face={"orange"} />
          <CubeFace key={5} face={"yellow"} />
          <CubeFace key={6} face={"white"} />
        </div>
        <Buttons />
        <button onClick={consoleHandler}>Console log</button>
        <div>
          <p>X = {xAxis}</p>
          <p>Y = {yAxis}</p>
          <p>z = {zAxis}</p>
        </div>
      </div>
    </>
  );
};

export default Cube;
