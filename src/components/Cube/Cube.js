import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


import classes from "./Cube.module.css";
import CubeFace from "./CubeFace";
import Buttons from '../Controls/Buttons'

const Cube = (props) => {
  
  const xAxis = useSelector(state => state.xAxis)
  const yAxis = useSelector(state => state.yAxis)
  const zAxis = useSelector(state => state.zAxis)

  
  const [currentFace, setCurrentFace] = useState("blue");
  const [rightSideFace, setRightSideFace] = useState('red')
  const [backFace, setBackFace] = useState('green')
  const [coordArray, setCoordArray] = useState([
    { face: 'blue', coord: 0 },
    { face: 'red', coord: 0 },
    { face: 'green', coord: 0 },
    { face: 'orange', coord: 0 },
    { face: 'yellow', coord: 0 },
    { face: 'white', coord: 0 }
  ])

  // Sets the Front face
  const updateFaceHandler = (face) => {
    setCurrentFace(face);
  };

  // sets the Back face 
  useEffect(() => {
    if(currentFace === 'blue'){
      setBackFace('green')
    }
    if(currentFace === 'green'){
      setBackFace('blue')
    }
    if(currentFace === 'red'){
      setBackFace('orange')
    }
    if(currentFace === 'orange'){
      setBackFace('red')
    }
    if(currentFace === 'white'){
      setBackFace('yellow')
    }
    if(currentFace === 'yellow'){
      setBackFace('white')
    }
  }, [currentFace])

  // Sets the Right side face
  const updateSideHandler = (side) => {
    let newArray = coordArray
    
    newArray.forEach(obj => {
      if (obj.face === side.face) {
        
        obj.coord = side.coord
        return
      } else {
        return obj
      }
    })

    newArray.sort(function(a, b){return b.coord - a.coord});

    if(newArray[0].coord === newArray[1].coord){
      if(newArray[0].face === currentFace || newArray[0].face === backFace){
        setRightSideFace(newArray[1].face)
      } else {
        setRightSideFace(newArray[0].face)
      }
    } else {
      setRightSideFace(newArray[0].face)
    }

    setCoordArray(newArray)
    
  }
  
  // Updates the css class name to change the cube orientation
  let rotation = {
    transform: `translateZ(-100px) rotateY(${yAxis}deg) rotateX(${xAxis}deg) rotateZ(${zAxis}deg)`,
  };

  const consoleHandler = () => {
    console.log(coordArray);
    console.log("current face: ", currentFace);
    console.log("right side face: ", rightSideFace);
  };

  return (
    <>
      <div className={classes.scene}>
        <div className={classes.cube} style={rotation}>
          <CubeFace
            key={1}
            face={"blue"}
            onFaceChange={updateFaceHandler}
            upDateSide={updateSideHandler}
          />
          <CubeFace
            key={2}
            face={"green"}
            onFaceChange={updateFaceHandler}
            upDateSide={updateSideHandler}
          />
          <CubeFace
            key={3}
            face={"red"}
            onFaceChange={updateFaceHandler}
            upDateSide={updateSideHandler}
          />
          <CubeFace
            key={4}
            face={"orange"}
            onFaceChange={updateFaceHandler}
            upDateSide={updateSideHandler}
          />
          <CubeFace
            key={5}
            face={"yellow"}
            onFaceChange={updateFaceHandler}
            upDateSide={updateSideHandler}
          />
          <CubeFace
            key={6}
            face={"white"}
            onFaceChange={updateFaceHandler}
            upDateSide={updateSideHandler}
          />
        </div>
        <Buttons />
        <button onClick={consoleHandler}>Console log</button>
        <div>
          <p>X = {xAxis}</p>
          <p>Y = {yAxis}</p>
          <p>z = {zAxis}</p>
          {/* <p>X = {xAxisOr}</p>
          <p>Y = {yAxisOr}</p>
          <p>z = {zAxisOr}</p> */}
        </div>
      </div>
    </>
  );
};

export default Cube;
