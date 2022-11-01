import { useState, useEffect, useRef } from "react";
import classes from "./CubeFace.module.css";

const CubeFace = (props) => {
  const [facing, setFacing] = useState("");
  const ref = useRef(props.face)
  const cubeFaceClassName = classes[props.face];

  useEffect(
    () => {
      setTimeout(()=> {
        const dimensions = ref.current.getBoundingClientRect();
        const width = Math.round(dimensions.width);
        const height = Math.round(dimensions.height);
        const rightSideXcoord = Math.round(dimensions.x)
        
        const side = {
          face: props.face,
          coord: rightSideXcoord
        }
        props.upDateSide(side)
        console.log(props.face)
        console.log(width, height)
        if (width === 200 && height === 200) {
          setFacing(props.face)
          props.onFaceChange(facing)
        }
      }, 410)

    },[props, facing]
  ); 

  return (
    <div
      className={`${classes.cubeFace} ${cubeFaceClassName}`}
      ref={ref}
    >
      <div>TL</div>
      <div>TM</div>
      <div>TR</div>
      <div>CL</div>
      <div>C</div>
      <div>CR</div>
      <div>BL</div>
      <div>BM</div>
      <div>BR</div>
    </div>
  );
};

export default CubeFace;
