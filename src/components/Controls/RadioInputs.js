import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axisActions } from "../../orientation";
import { useDispatch } from "react-redux";

import classes from "./RadioInputs.module.css";

const RadioInputs = (props) => {
  const xAxis = useSelector((state) => state.xAxis);
  const yAxis = useSelector((state) => state.yAxis);
  const zAxis = useSelector((state) => state.zAxis);
  const [yAxisOr, setYaxisOr] = useState(0);
  const [xAxisOr, setXaxisOr] = useState(0);
  const [zAxisOr, setZaxisOr] = useState(0);

  const dispatch = useDispatch();

  // Takes coordinates and sets them to 360deg equivalent
  useEffect(() => {
    let yAxisOr = yAxis;
    let xAxisOr = xAxis;
    let zAxisOr = zAxis;

    // Converts all axis to positive number
    if (yAxisOr < 0) {
      yAxisOr = yAxisOr * -1;
    }
    if (xAxisOr < 0) {
      yAxisOr = yAxisOr * -1;
    }
    if (zAxisOr < 0) {
      zAxisOr = zAxisOr * -1;
    }

    // Takes the x and y axis number and coverts it into number between 0-360
    yAxisOr = ((yAxisOr % 360) + 360) % 360;
    xAxisOr = ((xAxisOr % 360) + 360) % 360;
    zAxisOr = ((zAxisOr % 360) + 360) % 360;

    setYaxisOr(yAxisOr);
    setXaxisOr(xAxisOr);
    setZaxisOr(zAxisOr);
  }, [yAxis, xAxis, zAxis]);

  const onChangeCurrentFace = (e) => {
    const currentX = xAxisOr;
    const currentY = yAxisOr;
    const currentZ = zAxisOr;

    let checkedFace;
    switch (e.target.value) {
      case "blue":
        checkedFace = { x: 0, y: 0, z: 0 };
        break;
      case "orange":
        checkedFace = { x: 0, y: 90, z: 0 };
        break;
      case "green":
        checkedFace = { x: 0, y: 180, z: 0 };
        break;
      case "red":
        checkedFace = { x: 0, y: 270, z: 0 };
        break;
      case "white":
        checkedFace = { x: 90, y: 0, z: 0 };
        break;
      case "yellow":
        checkedFace = { x: 270, y: 0, z: 0 };
        break;
      default:
        break;
    }
    
    let newX = checkedFace.x - currentX
    let newY = checkedFace.y - currentY
    let newZ = checkedFace.z - currentZ

    if(newX < -180){ newX += 360}
    if(newX > 180){ newX -= 360}
    if(newY < -180){ newY += 360}
    if(newY > 180){ newY -= 360}
    if(newZ < -180){ newZ += 360}
    if(newZ > 180){ newZ -= 360}
   
    dispatch(axisActions.updateX(newX));
    dispatch(axisActions.updateY(newY));
    dispatch(axisActions.updateZ(newZ));
  };

  return (
    <div className={classes.inputs} onChange={onChangeCurrentFace}>
      <label>
        <input type="radio" name="cube-facing" value="blue" defaultChecked />{" "}
        Blue
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
  );
};

export default RadioInputs;
