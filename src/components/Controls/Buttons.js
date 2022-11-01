import { useState } from "react";

import { axisActions } from "../../orientation";
import { useDispatch } from "react-redux";
import Radioinputs from "./RadioInputs";

import classes from "./Buttons.module.css";

const Buttons = () => {
  const [disableButton, setDisableButton] = useState(false);
  const dispatch = useDispatch();

  const buttonHandler = (e) => {
    setDisableButton(true);

    setTimeout(() => {
      setDisableButton(false);
    }, 410);

    if (e.target.value === "x+") {
      dispatch(axisActions.updateX(45));
    }
    if (e.target.value === "x-") {
      dispatch(axisActions.updateX(-45));
    }
    if (e.target.value === "y+") {
      dispatch(axisActions.updateY(45));
    }
    if (e.target.value === "y-") {
      dispatch(axisActions.updateY(-45));
    }
    if (e.target.value === "z+") {
      dispatch(axisActions.updateZ(45));
    }
    if (e.target.value === "z-") {
      dispatch(axisActions.updateZ(-45));
    }
  };

  return (
    <div className={classes.buttons}>
      <div className={classes.radio}>
        <Radioinputs />
      </div>
      <div>
        <button onClick={buttonHandler} disabled={disableButton} value="x+">
          x+
        </button>
        <button onClick={buttonHandler} disabled={disableButton} value="x-">
          x-
        </button>
        <button onClick={buttonHandler} disabled={disableButton} value="y+">
          y+
        </button>
        <button onClick={buttonHandler} disabled={disableButton} value="y-">
          y-
        </button>
        <button onClick={buttonHandler} disabled={disableButton} value="z+">
          z+
        </button>
        <button onClick={buttonHandler} disabled={disableButton} value="z-">
          z-
        </button>
      </div>
    </div>
  );
};

export default Buttons;
