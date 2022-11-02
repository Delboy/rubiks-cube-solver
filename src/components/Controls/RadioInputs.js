import { useSelector } from "react-redux";
import { axisActions } from "../../orientation";
import { facesActions } from "../../orientation";
import { useDispatch } from "react-redux";

import classes from "./RadioInputs.module.css";

const RadioInputs = (props) => {
  const xAxisOr = useSelector((state) => state.axises.xAxisOr);
  const yAxisOr = useSelector((state) => state.axises.yAxisOr);
  const zAxisOr = useSelector((state) => state.axises.zAxisOr);

  const currentFace = useSelector((state) => state.faces.currentFace);

  const dispatch = useDispatch();

  // Focuses selected Face
  const onChangeCurrentFace = (e) => {
    dispatch(facesActions.updateCurrentFace(e.target.value))

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

    let newX = checkedFace.x - currentX;
    let newY = checkedFace.y - currentY;
    let newZ = checkedFace.z - currentZ;

    if (newX < -180) {
      newX += 360;
    }
    if (newX > 180) {
      newX -= 360;
    }
    if (newY < -180) {
      newY += 360;
    }
    if (newY > 180) {
      newY -= 360;
    }
    if (newZ < -180) {
      newZ += 360;
    }
    if (newZ > 180) {
      newZ -= 360;
    }

    dispatch(axisActions.updateX(newX));
    dispatch(axisActions.updateY(newY));
    dispatch(axisActions.updateZ(newZ));
  };


  return (
    <div className={classes.inputs} onChange={onChangeCurrentFace}>
      <label>
        {currentFace === "blue" ? (
          <input type="radio" name="cube-facing" value="blue" checked />
        ) : (
          <input type="radio" name="cube-facing" value="blue" />
        )}
        Blue
      </label>
      <label>
      {currentFace === "green" ? (
          <input type="radio" name="cube-facing" value="green" checked />
        ) : (
          <input type="radio" name="cube-facing" value="green" />
        )}
        Green
      </label>
      <label>
      {currentFace === "orange" ? (
          <input type="radio" name="cube-facing" value="orange" checked />
        ) : (
          <input type="radio" name="cube-facing" value="orange" />
        )}
        Orange
      </label>
      <label>
      {currentFace === "red" ? (
          <input type="radio" name="cube-facing" value="red" checked />
        ) : (
          <input type="radio" name="cube-facing" value="red" />
        )}
        Red
      </label>
      <label>
      {currentFace === "yellow" ? (
          <input type="radio" name="cube-facing" value="yellow" checked />
        ) : (
          <input type="radio" name="cube-facing" value="yellow" />
        )}
         Yellow
      </label>
      <label>
      {currentFace === "white" ? (
          <input type="radio" name="cube-facing" value="white" checked />
        ) : (
          <input type="radio" name="cube-facing" value="white" />
        )}
        White
      </label>
    </div>
  );
};

export default RadioInputs;
