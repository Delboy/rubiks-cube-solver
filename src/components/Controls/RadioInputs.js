import { useSelector } from "react-redux";
import { axisActions, facesActions } from "../../orientation";
import { useDispatch } from "react-redux";

import classes from "./RadioInputs.module.css";

const RadioInputs = () => {
  const currentFace = useSelector((state) => state.faces.currentFace);

  const dispatch = useDispatch();

  // Focuses selected Face
  const onChangeCurrentFace = (e) => {
    console.log(e.target.value)
    // dispatch(facesActions.updateCurrentFace(e.target.value));
    dispatch(axisActions.changeFace(e.target.value))
  };

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
