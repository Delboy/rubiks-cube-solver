import { axisActions, facesActions } from "../../orientation";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Radioinputs from "./RadioInputs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

import classes from "./Buttons.module.css";

const Buttons = () => {
  const dispatch = useDispatch();

  const xAxisOr = useSelector((state) => state.axises.xAxisOr);

  const [onYellowOrWhite, setOnYellowOrWhite] = useState(false);

  // Checks if user is facing the yellow or white face. This is used to render either a normal arrow or rotate arrow button.
  useEffect(() => {
    if (xAxisOr === 90 || xAxisOr === 270) {
      setOnYellowOrWhite(true);
    } else {
      setOnYellowOrWhite(false);
    }
  }, [xAxisOr]);

  // Handles button presses
  const buttonHandler = (e) => {
    switch (e.target.value) {
      case "up":
        dispatch(axisActions.updateX(45));
        dispatch(facesActions.moveCubeMatrixUp())
        break;
      case "down":
        dispatch(axisActions.updateX(-45));
        dispatch(facesActions.moveCubeMatrixDown())
        break;
      default:
        break;
    }

    if (xAxisOr === 0 || xAxisOr === 45 || xAxisOr === 90 || xAxisOr === 315) {
      if (e.target.value === "left") {
        dispatch(axisActions.updateY(-45));
        dispatch(facesActions.moveCubeMatrixLeft())
      }
      if (e.target.value === "right") {
        dispatch(axisActions.updateY(45));
        dispatch(facesActions.moveCubeMatrixRight())
      }
    } else {
      if (e.target.value === "left") {
        dispatch(axisActions.updateY(45));
        dispatch(facesActions.moveCubeMatrixRight())
      }
      if (e.target.value === "right") {
        dispatch(axisActions.updateY(-45));
        dispatch(facesActions.moveCubeMatrixLeft())
      }
    }
  }

  // Font awesome icons
  const rotateRightArrow = (
    <FontAwesomeIcon icon={faArrowRotateRight} className="noPointerEvents" />
  );
  const rotateLeftArrow = (
    <FontAwesomeIcon icon={faArrowRotateLeft} className="noPointerEvents" />
  );
  const upArrow = (
    <FontAwesomeIcon icon={faCircleArrowUp} className="noPointerEvents" />
  );
  const downArrow = (
    <FontAwesomeIcon icon={faCircleArrowDown} className="noPointerEvents" />
  );
  const leftArrow = (
    <FontAwesomeIcon icon={faCircleArrowLeft} className="noPointerEvents" />
  );
  const rightArrow = (
    <FontAwesomeIcon icon={faCircleArrowRight} className="noPointerEvents" />
  );

  return (
    <div className={classes.buttons}>
      <div className={classes.arrowButtons}>
        <button className={classes.topBtn} onClick={buttonHandler} value="up">
          {upArrow}
        </button>
        <div className={classes.middleBtns}>
          <button onClick={buttonHandler} value="left">
            {onYellowOrWhite ? rotateLeftArrow : leftArrow}
          </button>

          <i className="fas fa-solid fa-circle"></i>

          <button onClick={buttonHandler} value="right">
            {onYellowOrWhite ? rotateRightArrow : rightArrow}
          </button>
        </div>
        <button onClick={buttonHandler} value="down">
          {downArrow}
        </button>
      </div>
      <div className={classes.radio}>
        <Radioinputs />
      </div>
      <div>
      </div>
    </div>
  );
};

export default Buttons;
