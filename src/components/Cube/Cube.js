import { useEffect, useState } from "react";
import classes from "./Cube.module.css";
import CubeFace from "./CubeFace";

const Cube = (props) => {
  const [disableButton, setDisableButton] = useState(false)
  const [currentFace, setCurrentFace] = useState("blue");
  const [yAxis, setYaxis] = useState(0);
  const [xAxis, setXaxis] = useState(0);
  const [zAxis, setZaxis] = useState(0);
  // const [yAxisOr, setYaxisOr] = useState(0);
  // const [xAxisOr, setXaxisOr] = useState(0);
  // const [zAxisOr, setZaxisOr] = useState(0);

  // const [currentFace, setCurrentFace] = useState("blue");

  // useEffect(() => {
  //   let yAxisOr = yAxis;
  //   let xAxisOr = xAxis;
  //   let zAxisOr = zAxis;

  //   // Converts all axis to positive number
  //   if (yAxisOr < 0) {
  //     yAxisOr = yAxisOr * -1;
  //   }
  //   if (xAxisOr < 0) {
  //     yAxisOr = yAxisOr * -1;
  //   }
  //   if (zAxisOr < 0) {
  //     zAxisOr = zAxisOr * -1;
  //   }

  //   // Takes the x and y axis number and coverts it into number between 0-360
  //   yAxisOr = ((yAxisOr % 360) + 360) % 360;
  //   xAxisOr = ((xAxisOr % 360) + 360) % 360;
  //   zAxisOr = ((zAxisOr % 360) + 360) % 360;

  //   setYaxisOr(yAxisOr);
  //   setXaxisOr(xAxisOr);
  //   setZaxisOr(zAxisOr);

    
  // }, [yAxis, xAxis, zAxis]);

  let rotation = {
    transform: `translateZ(-100px) rotateY(${yAxis}deg) rotateX(${xAxis}deg) rotateZ(${zAxis}deg)`,
  };

  const buttonHandler = (e) => {
    console.log(currentFace)
    setDisableButton(true)
    
    setTimeout(() => {
      setDisableButton(false)
    }, 500)

    if (e.target.value === "up") {
      switch ("blue") {
        case "blue":
          setXaxis(xAxis - 45);
          return;
        case "green":
          setXaxis(xAxis + 45);
          return;
        case "orange":
          setZaxis(zAxis - 45);
          return;
        case "red":
          setZaxis(zAxis + 45);
          return;
        // case "white":
        //   setXaxis(xAxis - 45);
        //   return;
        // case "yellow":
        //   setXaxis(xAxis - 45);
        //   return;
        default:
          return;
      }
    }

    if (e.target.value === "down") {
      switch ("blue") {
        case "blue":
          setXaxis(xAxis + 45);
          return;
        case "green":
          setXaxis(xAxis - 45);
          return;
        case "orange":
          setZaxis(zAxis + 45);
          return;
        case "red":
          setZaxis(zAxis - 45);
          return;
        // case "white":
        //   setXaxis(xAxis + 45);
        //   return;
        // case "yellow":
        //   setXaxis(xAxis + 45);
        //   return;
        default:
          return;
      }
    }

    if (e.target.value === "left") {
      setYaxis(yAxis + 45);
    }
    if (e.target.value === "right") {
      setYaxis(yAxis - 45);
    }
  };

  const updateFaceHandler = (face) => {
    setCurrentFace(face);
  };

  return (
    <>
      <div className={classes.scene}>
        <div className={classes.cube} style={rotation}>
          <CubeFace
            key={1}
            face={"blue"}
            onFaceChange={updateFaceHandler}
            xAxis={xAxis}
            yAxis={yAxis}
            zAxis={zAxis}
          />
          <CubeFace
            key={2}
            face={"green"}
            onFaceChange={updateFaceHandler}
            xAxis={xAxis}
            yAxis={yAxis}
            zAxis={zAxis}
          />
          <CubeFace
            key={3}
            face={"red"}
            onFaceChange={updateFaceHandler}
            xAxis={xAxis}
            yAxis={yAxis}
            zAxis={zAxis}
          />
          <CubeFace
            key={4}
            face={"orange"}
            onFaceChange={updateFaceHandler}
            xAxis={xAxis}
            yAxis={yAxis}
            zAxis={zAxis}
          />
          <CubeFace
            key={5}
            face={"yellow"}
            onFaceChange={updateFaceHandler}
            xAxis={xAxis}
            yAxis={yAxis}
            zAxis={zAxis}
          />
          <CubeFace
            key={6}
            face={"white"}
            onFaceChange={updateFaceHandler}
            xAxis={xAxis}
            yAxis={yAxis}
            zAxis={zAxis}
          />
        </div>
        <div className={classes.buttons}>
          <button onClick={buttonHandler} disabled={disableButton} value="up">
            Up
          </button>
          <button onClick={buttonHandler} disabled={disableButton} value="down">
            Down
          </button>
          <button onClick={buttonHandler} disabled={disableButton} value="left">
            Left
          </button>
          <button onClick={buttonHandler} disabled={disableButton} value="right">
            Right
          </button>
        </div>
      </div>
    </>
  );
};

export default Cube;
