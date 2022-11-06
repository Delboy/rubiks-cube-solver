import { axisActions } from "../../orientation";
import { useDispatch, useSelector } from "react-redux";
import Radioinputs from "./RadioInputs";

import classes from "./Buttons.module.css";

const Buttons = () => {
  const xAxisOr = useSelector((state) => state.axises.xAxisOr)
  const dispatch = useDispatch();

  const buttonHandler = (e) => {
    switch(e.target.value){
      case 'x+':
        dispatch(axisActions.updateX(45))
        break
      case 'x-':
        dispatch(axisActions.updateX(-45))
        break
      case 'y+':
        dispatch(axisActions.updateY(45))
        break
      case 'y-':
        dispatch(axisActions.updateY(-45))
        break
      case 'z+':
        dispatch(axisActions.updateZ(45))
        break
      case 'z-':
        dispatch(axisActions.updateZ(-45))
        break
      case 'up':
        dispatch(axisActions.updateX(45))
        break
      case 'down':
        dispatch(axisActions.updateX(-45))
        break
      default:
        break
    }
    
    if(xAxisOr < 180){
      if (e.target.value === "left") {
        dispatch(axisActions.updateY(-45));
      }
      if (e.target.value === "right") {
        dispatch(axisActions.updateY(45));
      }
    } else {
      if (e.target.value === "left") {
        dispatch(axisActions.updateY(45));
      }
      if (e.target.value === "right") {
        dispatch(axisActions.updateY(-45));
      }
    }
  };

  return (
    <div className={classes.buttons}>
      <div className={classes.radio}>
        <Radioinputs />
      </div>
      <div>
        <button onClick={buttonHandler} value="x+">
          x+
        </button>
        <button onClick={buttonHandler} value="x-">
          x-
        </button>
        <button onClick={buttonHandler} value="y+">
          y+
        </button>
        <button onClick={buttonHandler} value="y-">
          y-
        </button>
        <button onClick={buttonHandler} value="z+">
          z+
        </button>
        <button onClick={buttonHandler} value="z-">
          z-
        </button>
        <button onClick={buttonHandler} value="up">
          up
        </button>
        <button onClick={buttonHandler} value="down">
          down
        </button>
        <button onClick={buttonHandler} value="left">
          left
        </button>
        <button onClick={buttonHandler} value="right">
          right
        </button>
      </div>
    </div>
  );
};

export default Buttons;
