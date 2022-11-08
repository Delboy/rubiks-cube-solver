import { useSelector } from "react-redux";

import classes from "./Cube.module.css";
import CubeFace from "./CubeFace";
import { useDispatch } from "react-redux";
import { axisActions } from "../../orientation";
import { useEffect } from "react";

const Cube = () => {
  const xAxis = useSelector((state) => state.axises.xAxis);
  const yAxis = useSelector((state) => state.axises.yAxis);
  const zAxis = useSelector((state) => state.axises.zAxis);
  
  const dispatch = useDispatch();

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
    transform: `translateZ(-100px) rotateX(${xAxis}deg) rotateY(${yAxis}deg) rotateZ(${zAxis}deg)`,
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
      </div>
    </>
  );
};

export default Cube;