import { useState, useEffect, useRef } from "react";
import classes from "./CubeFace.module.css";

const CubeFace = (props) => {
  const [facing, setFacing] = useState("");
  const[blueIsOnSide, setBlueIsOnSide] = useState(false)
  const ref = useRef(props.face);

  const cubeFaceClassName = classes[props.face];

  useEffect(
    () => {

      // console.log(props.xAxis)
      const dimensions = ref.current.getBoundingClientRect();
      const width = Math.round(dimensions.width);
      const height = Math.round(dimensions.height);
      // console.log(props.face, dimensions)
      
      if (width === 200 && height === 200) {
        setFacing(props.face)
        props.onFaceChange(facing)
      }

      if (props.face === 'blue' && height === 200 && width === 33){
        setBlueIsOnSide(true)
        props.upDateSide(blueIsOnSide)
      } else if (props.face === 'blue'){
        setBlueIsOnSide(false)
        props.upDateSide(blueIsOnSide)
      }
     

    },[props, facing, blueIsOnSide, setBlueIsOnSide]
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
