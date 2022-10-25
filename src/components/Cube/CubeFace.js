import { useState, useEffect, useRef } from "react";
import classes from "./CubeFace.module.css";

const CubeFace = (props) => {
  const [facing, setFacing] = useState("");

  const ref = useRef(props.face);

  const cubeFaceClassName = classes[props.face];

  useEffect(
    () => {
      // console.log(props.xAxis)
      const dimensions = ref.current.getBoundingClientRect();
      const width = dimensions.width;
      const height = dimensions.height;

      // console.log(dimensions)
      
      if (width === 200 && height === 200) {
        
        setFacing(props.face)
        props.onFaceChange(facing)
        
      }
    },
    [props, facing]
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
