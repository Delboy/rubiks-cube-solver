import { useSelector } from "react-redux";
import { facesActions } from "../../orientation";

import classes from "./Cube.module.css";
import CubeFace from "./CubeFace";
import { useDispatch } from "react-redux";
import { axisActions } from "../../orientation";
import { useEffect } from "react";


const Cube = () => {
  const xAxis = useSelector((state) => state.axises.xAxis);
  const yAxis = useSelector((state) => state.axises.yAxis);
  const currentFace = useSelector((state) => state.faces.currentFace);
  
  const cubeMatrix = useSelector((state) => state.faces.cubeMatrix);
 
  const dispatch = useDispatch();

  // Uses the cube matrix to set which face is which color
  useEffect(() => {
    dispatch(facesActions.setCurrentFace(cubeMatrix[4][0]))
    dispatch(facesActions.setTopFace(cubeMatrix[2][0]))
    dispatch(facesActions.setBackFace(cubeMatrix[0][0]))
    dispatch(facesActions.setBottomFace(cubeMatrix[6][0]))
    dispatch(facesActions.setLeftFace(cubeMatrix[4][6]))
    dispatch(facesActions.setRightFace(cubeMatrix[4][2]))

    // One up from current faces
    dispatch(facesActions.setOneAboveCurrentFace(cubeMatrix[3][0]))
    dispatch(facesActions.setOneAboveTopFace(cubeMatrix[1][0]))
    dispatch(facesActions.setOneAboveBackFace(cubeMatrix[7][0]))
    dispatch(facesActions.setOneAboveBottomFace(cubeMatrix[5][0]))
    dispatch(facesActions.setOneAboveLeftFace(cubeMatrix[3][6]))
    dispatch(facesActions.setOneAboveRightFace(cubeMatrix[3][2]))

    // One down from current faces
    dispatch(facesActions.setOneBellowCurrentFace(cubeMatrix[5][0]))
    dispatch(facesActions.setOneBellowTopFace(cubeMatrix[3][0]))
    dispatch(facesActions.setOneBellowBackFace(cubeMatrix[1][0]))
    dispatch(facesActions.setOneBellowBottomFace(cubeMatrix[7][0]))
    dispatch(facesActions.setOneBellowLeftFace(cubeMatrix[5][6]))
    dispatch(facesActions.setOneBellowRightFace(cubeMatrix[5][2]))

    if(cubeMatrix[4][0] === 'yellow'){
      dispatch(facesActions.setRightFace(cubeMatrix[2][6]));
      dispatch(facesActions.setLeftFace(cubeMatrix[2][2]));
    }
    if(cubeMatrix[4][0] === 'white'){
      dispatch(facesActions.setRightFace(cubeMatrix[6][6]));
      dispatch(facesActions.setLeftFace(cubeMatrix[6][2]));
    }
 
  },[cubeMatrix, dispatch])

  // Updates previous current face. Used to help determine what face to rotate when clicking buttons.
  useEffect(() => {
    if(currentFace !== 'edge' && currentFace !== 'faceEdge'){
      dispatch(facesActions.setLastCurrentFaces())
    }
  }, [currentFace, dispatch])

  // Takes coordinates and sets them to 360deg equivalent
  useEffect(() => {
    let newX = xAxis;
    let newY = yAxis;

    // Takes the x, y and z axis value and coverts it into number between 0-360
    newY = ((newY % 360) + 360) % 360;
    newX = ((newX % 360) + 360) % 360;

    dispatch(axisActions.updateXOr(newX));
    dispatch(axisActions.updateYOr(newY));
    
  }, [yAxis, xAxis, dispatch]);

  // Updates the css class name to change the cube orientation
  let rotation = {
    transform: `translateZ(-100px) rotateX(${xAxis}deg) rotateY(${yAxis}deg)`,
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
