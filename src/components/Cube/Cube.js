import { useSelector } from "react-redux";

import classes from "./Cube.module.css";
import CubeFace from "./CubeFace";
import Buttons from "../Controls/Buttons";
import { useDispatch } from "react-redux";
import { axisActions } from "../../orientation";
import { useEffect } from "react";

const Cube = (props) => {
  const xAxis = useSelector((state) => state.axises.xAxis);
  const yAxis = useSelector((state) => state.axises.yAxis);
  const zAxis = useSelector((state) => state.axises.zAxis);
  const xAxisOr = useSelector((state) => state.axises.xAxisOr);
  const yAxisOr = useSelector((state) => state.axises.yAxisOr);
  const zAxisOr = useSelector((state) => state.axises.zAxisOr);
  
  const currentFace = useSelector((state) => state.faces.currentFace);
  const rightSideFace = useSelector((state) => state.faces.rightSideFace);

  const dispatch = useDispatch()

  // Takes coordinates and sets them to 360deg equivalent
  useEffect(() => {
    let newX = xAxis;
    let newY = yAxis;
    let newZ = zAxis;

    // Takes the x, y and z axis value and coverts it into number between 0-360
    newY = ((newY % 360) + 360) % 360;
    newX = ((newX % 360) + 360) % 360;
    newZ = ((newZ % 360) + 360) % 360;

    dispatch(axisActions.updateXOr(newX));
    dispatch(axisActions.updateYOr(newY));
    dispatch(axisActions.updateZOr(newZ));

  }, [yAxis, xAxis, zAxis, dispatch]);

  // Updates the css class name to change the cube orientation
  let rotation = {
    transform: `translateZ(-100px) rotateX(${xAxis}deg) rotateY(${yAxis}deg)  rotateZ(${zAxis}deg)`,
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
          <p>Xor = {xAxisOr}</p>
          <p>Yor = {yAxisOr}</p>
          <p>zor = {zAxisOr}</p>
        </div>
      </div>
    </>
  );
};

export default Cube;
