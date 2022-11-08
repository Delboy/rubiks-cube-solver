import { useEffect, useRef } from "react";
import { axisActions, facesActions } from "../../orientation";
import { useDispatch } from "react-redux";

import CubeSegment from "./CubeSegment";
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

      if (
        (width === 200 && height === 200) ||
        (width === 283 && height === 283)
      ) {
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
      <CubeSegment color={'white'} />
      <CubeSegment color={'white'} />
      <CubeSegment color={'white'} />
      <CubeSegment color={'white'} />
      
      <div
        style={{
          backgroundColor: `var(--color-${props.face})`,
        }}
      >
      </div>
      <CubeSegment color={'white'} />
      <CubeSegment color={'white'} />
      <CubeSegment color={'white'} />
      <CubeSegment color={'white'} />
    </div>
  );
};

export default CubeFace;
