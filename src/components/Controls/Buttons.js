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
  const leftOfCur = useSelector((state) => state.faces.leftOfCurrentFace);
  const rightOfCur = useSelector((state) => state.faces.rightOfCurrentFace);

  const currentFace = useSelector((state) => state.faces.currentFace);
  const lastCurrentFace = useSelector((state) => state.faces.lastCurrentFace);
  const lastBackFace = useSelector((state) => state.faces.lastBackFace);
  const lastLeftFace = useSelector((state) => state.faces.lastLeftFace);
  const lastRightFace = useSelector((state) => state.faces.lastRightFace);
  const lastTopFace = useSelector((state) => state.faces.lastTopFace);
  const lastBottomFace = useSelector((state) => state.faces.lastBottomFace);
  const backFace = useSelector((state) => state.faces.backFace);
  const leftFace = useSelector((state) => state.faces.leftFace);
  const rightFace = useSelector((state) => state.faces.rightFace);
  const topFace = useSelector((state) => state.faces.topFace);
  const bottomFace = useSelector((state) => state.faces.bottomFace);

  const matrix = useSelector((state) => state.faces.cubeMatrix);

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
        dispatch(facesActions.moveCubeMatrixUp());
        break;
      case "down":
        dispatch(axisActions.updateX(-45));
        dispatch(facesActions.moveCubeMatrixDown());
        break;
      default:
        break;
    }

    if (xAxisOr === 0 || xAxisOr === 45 || xAxisOr === 90 || xAxisOr === 315) {
      if (e.target.value === "left") {
        dispatch(axisActions.updateY(-45));
        dispatch(facesActions.moveCubeMatrixLeft());
      }
      if (e.target.value === "right") {
        dispatch(axisActions.updateY(45));
        dispatch(facesActions.moveCubeMatrixRight());
      }
    } else {
      if (e.target.value === "left") {
        dispatch(axisActions.updateY(45));
        dispatch(facesActions.moveCubeMatrixRight());
      }
      if (e.target.value === "right") {
        dispatch(axisActions.updateY(-45));
        dispatch(facesActions.moveCubeMatrixLeft());
      }
    }

    let prime;
    if (e.target.value.includes("-p")) {
      prime = true;
    }

    let frontWedge;
    let backWedge;
    let leftWedge;
    let rightWedge;
    let topWedge;
    let bottomWedge;

    if (currentFace !== "edge") {
      frontWedge = currentFace;
      backWedge = backFace;
      leftWedge = leftFace;
      rightWedge = rightFace;
      topWedge = topFace;
      bottomWedge = bottomFace;
    } else {
      frontWedge = lastCurrentFace;
      backWedge = lastBackFace;
      leftWedge = lastLeftFace;
      rightWedge = lastRightFace;
      topWedge = lastTopFace;
      bottomWedge = lastBottomFace;
    }

    switch (e.target.value) {
      case "f":
        dispatch(facesActions.rotateWedge({ face: frontWedge, prime: prime }));
        break;
      case "f-p":
        dispatch(facesActions.rotateWedge({ face: frontWedge, prime: prime }));
        break;
      case "b":
        dispatch(facesActions.rotateWedge({ face: backWedge, prime: prime }));
        break;
      case "b-p":
        dispatch(facesActions.rotateWedge({ face: backWedge, prime: prime }));
        break;
      case "l":
        dispatch(facesActions.rotateWedge({ face: leftWedge, prime: prime }));
        break;
      case "l-p":
        dispatch(facesActions.rotateWedge({ face: leftWedge, prime: prime }));
        break;
      case "r":
        dispatch(facesActions.rotateWedge({ face: rightWedge, prime: prime }));
        break;
      case "r-p":
        dispatch(facesActions.rotateWedge({ face: rightWedge, prime: prime }));
        break;
      case "u-p":
        dispatch(facesActions.rotateWedge({ face: topWedge, prime: prime }));
        break;
      case "u":
        dispatch(facesActions.rotateWedge({ face: topWedge, prime: prime }));
        break;
      case "d":
        dispatch(facesActions.rotateWedge({ face: bottomWedge, prime: prime }));
        break;
      case "d-p":
        dispatch(facesActions.rotateWedge({ face: bottomWedge, prime: prime }));
        break;
      default:
        break;
    }
  };

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

  const consoleLogHandler = () => {
    console.log(matrix);
  };

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
      <div value={"moves"}>
        <button onClick={buttonHandler} value={"l"}>
          l
        </button>
        <button onClick={buttonHandler} value={"l-p"}>
          l'
        </button>
        <button onClick={buttonHandler} value={"u"}>
          u
        </button>
        <button onClick={buttonHandler} value={"u-p"}>
          u'
        </button>
        <button onClick={buttonHandler} value={"f"}>
          f
        </button>
        <button onClick={buttonHandler} value={"f-p"}>
          f'
        </button>
        <button onClick={buttonHandler} value={"b"}>
          b
        </button>
        <button onClick={buttonHandler} value={"b-p"}>
          b'
        </button>
        <button onClick={buttonHandler} value={"d"}>
          d
        </button>
        <button onClick={buttonHandler} value={"d-p"}>
          d'
        </button>
        <button onClick={buttonHandler} value={"r"}>
          r
        </button>
        <button onClick={buttonHandler} value={"r-p"}>
          r'
        </button>
      </div>
      <div>
        <p>front: {currentFace}</p>
        <p>back: {backFace}</p>
        <p>left: {leftFace}</p>
        <p>right: {rightFace}</p>
        <p>top: {topFace}</p>
        <p>bottom: {bottomFace}</p>
        <p>left of cur: {leftOfCur}</p>
        <p>right of cur: {rightOfCur}</p>
        <button onClick={consoleLogHandler}>Console Log</button>
      </div>
    </div>
  );
};

export default Buttons;
