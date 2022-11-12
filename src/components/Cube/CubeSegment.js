import { useSelector, useDispatch } from "react-redux";
import { facesActions } from "../../orientation";

const CubeSegment = (props) => {
  const colorSelected = useSelector((state) => state.faces.colorSelected);
  const colorCount = useSelector((state) => state.faces.colorCount);
  const segmentColor = useSelector(state => state.faces.segmentState[props.position])
  
  const dispatch = useDispatch();

  const setColorHandler = (e) => {
    let colorSelecetedAmount = colorCount[colorSelected];
    
    const payload = {
      position: props.position,
      color: colorSelected
    }

    // If the color selected is the same as the segments color remove the color
    if (colorSelected === segmentColor) {
      dispatch(facesActions.setSegmentColor({position: props.position, color: null}))
      dispatch(facesActions.removeFromColorCounter(colorSelected));
      return;
    }

    // If the segment has a color, remove that color and replace with the color selcted
    if (segmentColor && colorSelecetedAmount < 8) {
      dispatch(facesActions.setSegmentColor(payload))
      dispatch(facesActions.removeFromColorCounter(segmentColor));
      dispatch(facesActions.addToColorCounter(colorSelected));
      return;
    }

    // If the segment has no color, add the color selected
    if (colorSelecetedAmount < 8) {
      dispatch(facesActions.setSegmentColor(payload))
      dispatch(facesActions.addToColorCounter(colorSelected));
      return;
    }

    // If clear is selected color, remove the color 
    if (colorSelected === 'clear'){
      dispatch(facesActions.setSegmentColor({position: props.position, color: null}))
      dispatch(facesActions.removeFromColorCounter(segmentColor));
      return
    }
  };

  const bgColor = {backgroundColor: `var(--color-${segmentColor})`}

  return <div onClick={setColorHandler} style={bgColor}></div>;
};

export default CubeSegment;
