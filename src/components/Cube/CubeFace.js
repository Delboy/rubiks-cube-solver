import { useEffect, useRef } from "react";
import { axisActions, facesActions } from "../../orientation";
import { useDispatch } from "react-redux";

import classes from "./CubeFace.module.css";

const CubeFace = (props) => {
  const dispatch = useDispatch();
  const ref = useRef(props.face);
  const cubeFaceClassName = classes[props.face];

  // Works out which color face is facing the user
  useEffect(() => {
    setTimeout(() => {
      const dimensions = ref.current.getBoundingClientRect();
      const width = Math.round(dimensions.width);
      const height = Math.round(dimensions.height);

      if (width === 200 && height === 200) {
        dispatch(facesActions.updateCurrentFace(props.face));
      }
    }, 410);
  }, [props, dispatch]);

  const faceClickHandler = () => {
    dispatch(axisActions.changeFace(props.face));
  };

  return (
    <div
      className={`${classes.cubeFace} ${cubeFaceClassName}`}
      ref={ref}
      onClick={faceClickHandler}
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
