import { axisActions, facesActions } from "../../orientation";
import { useDispatch, useSelector } from "react-redux";
import Radioinputs from "./RadioInputs";
import RotateWedgeButtons from "./RotateWedgeButtons";
import RotateCubeButtons from "./RotateCubeButtons";

import classes from "./Buttons.module.css";

const Buttons = () => {
  const dispatch = useDispatch();

  // Current Faces
  const currentFace = useSelector((state) => state.faces.currentFace);
  const backFace = useSelector((state) => state.faces.backFace);
  const leftFace = useSelector((state) => state.faces.leftFace);
  const rightFace = useSelector((state) => state.faces.rightFace);
  const topFace = useSelector((state) => state.faces.topFace);
  const bottomFace = useSelector((state) => state.faces.bottomFace);

  // Previous Current Face
  const lastCurrentFace = useSelector((state) => state.faces.lastCurrentFace);
  const lastBackFace = useSelector((state) => state.faces.lastBackFace);
  const lastLeftFace = useSelector((state) => state.faces.lastLeftFace);
  const lastRightFace = useSelector((state) => state.faces.lastRightFace);
  const lastTopFace = useSelector((state) => state.faces.lastTopFace);
  const lastBottomFace = useSelector((state) => state.faces.lastBottomFace);

  // One above Current Face
  const oneAboveCur = useSelector((state) => state.faces.oneAboveCurrentFace);
  const oneAboveBack = useSelector((state) => state.faces.oneAboveBackFace);
  const oneAboveLeft = useSelector((state) => state.faces.oneAboveLeftFace);
  const oneAboveRight = useSelector((state) => state.faces.oneAboveRightFace);
  const oneAboveTop = useSelector((state) => state.faces.oneAboveTopFace);
  const oneAboveBottom = useSelector((state) => state.faces.oneAboveBottomFace);

  // One bellow Current Face
  const oneBellowCur = useSelector((state) => state.faces.oneBellowCurrentFace);
  const oneBellowBack = useSelector((state) => state.faces.oneBellowBackFace);
  const oneBellowLeft = useSelector((state) => state.faces.oneBellowLeftFace);
  const oneBellowRight = useSelector((state) => state.faces.oneBellowRightFace);
  const oneBellowTop = useSelector((state) => state.faces.oneBellowTopFace);
  const oneBellowBottom = useSelector(
    (state) => state.faces.oneBellowBottomFace
  );

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

    if (e.target.value === "left") {
      dispatch(axisActions.updateY(-45));
      dispatch(facesActions.moveCubeMatrixLeft());
    }
    if (e.target.value === "right") {
      dispatch(axisActions.updateY(45));
      dispatch(facesActions.moveCubeMatrixRight());
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

    if (currentFace !== "edge" || currentFace !== "faceEdge") {
      frontWedge = currentFace;
      backWedge = backFace;
      leftWedge = leftFace;
      rightWedge = rightFace;
      topWedge = topFace;
      bottomWedge = bottomFace;
    }
    if (currentFace === "edge") {
      frontWedge = lastCurrentFace;
      backWedge = lastBackFace;
      leftWedge = lastLeftFace;
      rightWedge = lastRightFace;
      topWedge = lastTopFace;
      bottomWedge = lastBottomFace;
    }
    if (currentFace === "faceEdge" && oneAboveCur === "yellow") {
      frontWedge = oneBellowCur;
      backWedge = oneBellowBack;
      leftWedge = oneBellowLeft;
      rightWedge = oneBellowRight;
      topWedge = oneBellowTop;
      bottomWedge = oneBellowBottom;
    }
    if (currentFace === "faceEdge" && oneBellowCur === "white") {
      frontWedge = oneAboveCur;
      backWedge = oneAboveBack;
      leftWedge = oneAboveLeft;
      rightWedge = oneAboveRight;
      topWedge = oneAboveTop;
      bottomWedge = oneAboveBottom;
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

  return (
    <div className={classes.buttons}>
      <div className={classes.radio}>
        <Radioinputs />
      </div>
      <RotateCubeButtons onButtonPress={buttonHandler} />
      <div className={classes.wedges}>
        <RotateWedgeButtons onButtonPress={buttonHandler} />
      </div>
    </div>
  );
};

export default Buttons;
