import { useRef } from "react";

import CubeSegment from "./CubeSegment";
import classes from "./CubeFace.module.css";

const CubeFace = (props) => {
  const ref = useRef(props.face);

  const cubeFaceClassName = classes[props.face];

  const faceClickHandler = () => {
    // dispatch(axisActions.changeFace(props.face));
  };


  const faceInitial = props.face.slice(0, 1)
  
  return (
    <div
      className={`${classes.cubeFace} ${cubeFaceClassName}`}
      ref={ref}
      onClick={faceClickHandler}
    >
      <CubeSegment position={faceInitial+'tl'} />
      <CubeSegment position={faceInitial+'tm'} />
      <CubeSegment position={faceInitial+'tr'} />
      <CubeSegment position={faceInitial+'cl'} />
      
      <div
        style={{
          backgroundColor: `var(--color-${props.face})`,
        }}
      >
      </div>
      <CubeSegment position={faceInitial+'cr'} />
      <CubeSegment position={faceInitial+'bl'} />
      <CubeSegment position={faceInitial+'bm'} />
      <CubeSegment position={faceInitial+'br'} />
    </div>
  );
};

export default CubeFace;
