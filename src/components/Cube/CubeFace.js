import { useEffect, useRef } from "react";
import { facesActions } from "../../orientation";
import { useDispatch } from "react-redux";

import classes from "./CubeFace.module.css";

const CubeFace = (props) => {
  const dispatch = useDispatch()
  const ref = useRef(props.face)
  const cubeFaceClassName = classes[props.face];

  useEffect(
    () => {
      setTimeout(()=> {
        const dimensions = ref.current.getBoundingClientRect();
        const width = Math.round(dimensions.width);
        const height = Math.round(dimensions.height);
        const rightSideXcoord = Math.round(dimensions.x)
        
        if (width === 200 && height === 200) {
          dispatch(facesActions.updateCurrentFace(props.face))
        }
        
        const side = {
          face: props.face,
          coord: rightSideXcoord
        }
        dispatch(facesActions.updateCoord(side))
       
      }, 410)

    },[props, dispatch]
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
