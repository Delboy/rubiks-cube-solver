import { useEffect, useState } from "react";
import classes from "./Cube.module.css";
import CubeFace from "./CubeFace";

const Cube = (props) => {
  const [disableButton, setDisableButton] = useState(false)
  const [currentFace, setCurrentFace] = useState("blue");
  const [isBlueOnSide, setIsBlueOnSide] = useState(false)
  const [yAxis, setYaxis] = useState(0);
  const [xAxis, setXaxis] = useState(0);
  const [zAxis, setZaxis] = useState(0);
  const [yAxisOr, setYaxisOr] = useState(0);
  const [xAxisOr, setXaxisOr] = useState(0);
  const [zAxisOr, setZaxisOr] = useState(0);

  
  // Takes coordinates and sets them to 360deg equivalent
  useEffect(() => {
    let yAxisOr = yAxis;
    let xAxisOr = xAxis;
    let zAxisOr = zAxis;

    // Converts all axis to positive number
    if (yAxisOr < 0) {
      yAxisOr = yAxisOr * -1;
    }
    if (xAxisOr < 0) {
      yAxisOr = yAxisOr * -1;
    }
    if (zAxisOr < 0) {
      zAxisOr = zAxisOr * -1;
    }

    // Takes the x and y axis number and coverts it into number between 0-360
    yAxisOr = ((yAxisOr % 360) + 360) % 360;
    xAxisOr = ((xAxisOr % 360) + 360) % 360;
    zAxisOr = ((zAxisOr % 360) + 360) % 360;

    setYaxisOr(yAxisOr);
    setXaxisOr(xAxisOr);
    setZaxisOr(zAxisOr);

    
  }, [yAxis, xAxis, zAxis]);

  // Finds where the blue side
  useEffect(() => {
    

  })

  let rotation = {
    transform: `translateZ(-100px) rotateY(${yAxis}deg) rotateX(${xAxis}deg) rotateZ(${zAxis}deg)`,
  };

  const buttonHandler = (e) => {
    setDisableButton(true)
    
    setTimeout(() => {
      setDisableButton(false)
    }, 510)

    if (e.target.value === "x+") {
      setXaxis(prevState => prevState + 45)
    }
    if (e.target.value === "x-") {
      setXaxis(prevState => prevState - 45)
    }
    if (e.target.value === "y+") {
      setYaxis(yAxis + 45);
    }
    if (e.target.value === "y-") {
      setYaxis(prevState => prevState - 45)
    }
    if (e.target.value === "z+") {
      setZaxis(prevState => prevState + 45)
    }
    if (e.target.value === "z-") {
      setZaxis(prevState => prevState - 45)
    }
  };

  const updateFaceHandler = (face) => {
    setCurrentFace(face);
  };

  const updateSideHandler = (boolean) => {
    setIsBlueOnSIde(boolean)
  }

  const consoleHandler = () => {
    console.log(currentFace)
    console.log('Is blue one side?', isBlueOnSide)
  }

  return (
    <>
      <div className={classes.scene}>
        <div className={classes.cube} style={rotation}>
          <CubeFace
            key={1}
            face={"blue"}
            onFaceChange={updateFaceHandler}
            upDateSide={updateSideHandler}
            xAxis={xAxis}
            yAxis={yAxis}
            zAxis={zAxis}
          />
          <CubeFace
            key={2}
            face={"green"}
            onFaceChange={updateFaceHandler}
            upDateSide={updateSideHandler}
            xAxis={xAxis}
            yAxis={yAxis}
            zAxis={zAxis}
          />
          <CubeFace
            key={3}
            face={"red"}
            onFaceChange={updateFaceHandler}
            upDateSide={updateSideHandler}
            xAxis={xAxis}
            yAxis={yAxis}
            zAxis={zAxis}
          />
          <CubeFace
            key={4}
            face={"orange"}
            onFaceChange={updateFaceHandler}
            upDateSide={updateSideHandler}
            xAxis={xAxis}
            yAxis={yAxis}
            zAxis={zAxis}
          />
          <CubeFace
            key={5}
            face={"yellow"}
            onFaceChange={updateFaceHandler}
            upDateSide={updateSideHandler}
            xAxis={xAxis}
            yAxis={yAxis}
            zAxis={zAxis}
          />
          <CubeFace
            key={6}
            face={"white"}
            onFaceChange={updateFaceHandler}
            upDateSide={updateSideHandler}
            xAxis={xAxis}
            yAxis={yAxis}
            zAxis={zAxis}
          />
        </div>
        <div className={classes.buttons}>
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
          <button onClick={consoleHandler}>Console log</button>
        </div>
        <div>
          <p>X = {xAxisOr}</p>
          <p>Y = {yAxisOr}</p>
          <p>z = {zAxisOr}</p>
        </div>
      </div>
    </>
  );
};

export default Cube;
