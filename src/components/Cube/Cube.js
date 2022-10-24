import { useEffect, useState } from "react";
import classes from "./Cube.module.css";
import CubeFace from "./CubeFace";

const Cube = (props) => {
  const [yAxis, setYaxis] = useState(0);
  const [xAxis, setXaxis] = useState(0);
  const [zAxis, setZaxis] = useState(0);
  const [yAxisOr, setYaxisOr] = useState(0);
  const [xAxisOr, setXaxisOr] = useState(0);
  const [zAxisOr, setZaxisOr] = useState(0);

  const [currentFace, setCurrentFace] = useState("blue");

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

    console.log("Y Or: ", yAxisOr);
    console.log("X Or: ", xAxisOr);
    console.log("Z Or: ", zAxisOr);

    // Checks co-ordinates and updates current face
    if (yAxisOr === 0 && xAxisOr === 0) {
      setCurrentFace("blue");
      return;
    }
    // if (yAxisOr === 0 && xAxisOr === 90) {
    //   setCurrentFace("white");
    //   return;
    // }
    // if (yAxisOr === 90 && xAxisOr === 0 && zAxisOr === 90) {
    //   setCurrentFace("white");
    //   return;
    // }
    // if (yAxisOr === 180 && xAxisOr === 270 && zAxisOr === 0) {
    //   setCurrentFace("white");
    //   return;
    // }
    // if (yAxisOr === 270 && xAxisOr === 90 && zAxisOr === 270) {
    //   setCurrentFace("white");
    //   return;
    // }
    // if (yAxisOr === 180 && xAxisOr === 90 && zAxisOr === 180) {
    //   setCurrentFace("white");
    //   return;
    // }
    // if (yAxisOr === 0 && xAxisOr === 270){
    //   setCurrentFace('yellow')
    //   return
    // }
    // if (yAxisOr === 90 && xAxisOr === 0 && zAxisOr === 270) {
    //   setCurrentFace("yellow");
    //   return;
    // }
    // if (yAxisOr === 180 && xAxisOr === 90 && zAxisOr === 0) {
    //   setCurrentFace("yellow");
    //   return;
    // }
    if (yAxisOr === 90) {
      setCurrentFace("orange");
      return;
    }
    if (yAxisOr === 180) {
      setCurrentFace("green");
      return;
    }
    if (yAxisOr === 270) {
      setCurrentFace("red");
      return;
    }
    // if((xAxisInt === 0 || xAxis % 360 === 0) && ((yAxisInt === 0 || yAxisInt % 360 === 0))){
    //   setCurrentFace('blue')
    // }
    // if((xAxisInt === 0 || xAxis % 360 === 0) && ((yAxisInt === 0 || yAxisInt % 360 === 0))){
    //   setCurrentFace('blue')
    // }
  }, [yAxis, xAxis, zAxis]);

  let rotation = {
    transform: `translateZ(-100px) rotateY(${yAxis}deg) rotateX(${xAxis}deg) rotateZ(${zAxis}deg)`,
  };

  const buttonHandler = (e) => {
    
    if (e.target.value === "up") {
      switch (currentFace) {
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
      switch (currentFace) {
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

    // if (e.target.value === "up" || e.target.value === "down") {
    //   setXaxis(newValue);
    // }

    // if (e.target.value === "left" || e.target.value === "right") {
    //   setYaxis(newValue);
    // }
  };

  useEffect(() => {
    console.log("currentFace: ", currentFace);
    console.log("Y: ", yAxis);
    console.log("X: ", xAxis);
    console.log("Z: ", zAxis);
  }, [xAxis, yAxis, zAxis, currentFace]);

  return (
    <>
      <div className={classes.scene}>
        <div className={classes.cube} style={rotation}>
          <CubeFace face={"front"} />
          <CubeFace face={"back"} />
          <CubeFace face={"right"} />
          <CubeFace face={"left"} />
          <CubeFace face={"top"} />
          <CubeFace face={"bottom"} />
        </div>
        <div className={classes.buttons}>
          <button onClick={buttonHandler} value="up">
            Up
          </button>
          <button onClick={buttonHandler} value="down">
            Down
          </button>
          <button onClick={buttonHandler} value="left">
            Left
          </button>
          <button onClick={buttonHandler} value="right">
            Right
          </button>
        </div>
      </div>
    </>
  );
};

export default Cube;
