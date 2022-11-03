import { useSelector } from "react-redux";
import { axisActions } from "../../orientation";
import { facesActions } from "../../orientation";
import { useDispatch } from "react-redux";

import classes from "./RadioInputs.module.css";

const RadioInputs = () => {
  const xAxisOr = useSelector((state) => state.axises.xAxisOr);
  const yAxisOr = useSelector((state) => state.axises.yAxisOr);
  const zAxisOr = useSelector((state) => state.axises.zAxisOr);

  const currentFace = useSelector((state) => state.faces.currentFace);

  const dispatch = useDispatch();

  // Focuses selected Face
  const onChangeCurrentFace = (e) => {
    dispatch(facesActions.updateCurrentFace(e.target.value));

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

  const inputHandleChange = () => {
    
  }

  return (
    <div className={classes.inputs}>
      <label>
        <input
          type="radio"
          name="cube-facing"
          value="blue"
          checked={currentFace === "blue" ? true : false}
          onChange={onChangeCurrentFace}
        />
        Blue
      </label>
      <label>
        <input
          type="radio"
          name="cube-facing"
          value="green"
          checked={currentFace === "green" ? true : false}
          onChange={onChangeCurrentFace}
        />
        Green
      </label>
      <label>
        <input
          type="radio"
          name="cube-facing"
          value="orange"
          checked={currentFace === "orange" ? true : false}
          onChange={onChangeCurrentFace}
        />
        Orange
      </label>
      <label>
        <input
          type="radio"
          name="cube-facing"
          value="red"
          checked={currentFace === "red" ? true : false}
          onChange={onChangeCurrentFace}
        />
        Red
      </label>
      <label>
        <input
          type="radio"
          name="cube-facing"
          value="yellow"
          checked={currentFace === "yellow" ? true : false}
          onChange={onChangeCurrentFace}
        />
        Yellow
      </label>
      <label>
        <input
          type="radio"
          name="cube-facing"
          value="white"
          checked={currentFace === "white" ? true : false}
          onChange={onChangeCurrentFace}
        />
        White
      </label>
    </div>
  );
};

export default RadioInputs;
