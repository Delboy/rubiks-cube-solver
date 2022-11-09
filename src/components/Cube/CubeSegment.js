import { useSelector, useDispatch } from "react-redux";
import { facesActions } from "../../orientation";
import { useState } from "react";

const CubeSegment = (props) => {
  const colorSelected = useSelector((state) => state.faces.colorSelected);
  const colorCount = useSelector((state) => state.faces.colorCount);
  const [backgroundColor, setBackgroundColor] = useState({});

  const dispatch = useDispatch();

  const setColorHandler = (e) => {
    let colorSelecetedAmount = colorCount[colorSelected];
    let backgroundColor = e.target.style.backgroundColor
      .substring(12)
      .slice(0, -1);

    // If the color selected is the same as the segments color remove the color
    if (colorSelected === backgroundColor) {
      setBackgroundColor({ backgroundColor: null });
      dispatch(facesActions.removeFromColorCounter(colorSelected));
      return;
    }

    // If the color selected is the same as segments color, do nothing
    if (colorSelected === backgroundColor) {
      return;
    }

    // If the segment has a color, remove that color and replace with the color selcted
    if (backgroundColor && colorSelecetedAmount < 8) {
      setBackgroundColor({ backgroundColor: `var(--color-${colorSelected})` });
      dispatch(facesActions.removeFromColorCounter(backgroundColor));
      dispatch(facesActions.addToColorCounter(colorSelected));
      return;
    }

    // If the segment has no color, add the color selected
    if (colorSelecetedAmount < 8) {
      setBackgroundColor({ backgroundColor: `var(--color-${colorSelected})` });
      dispatch(facesActions.addToColorCounter(colorSelected));
      return;
    }
  };

  return <div onClick={setColorHandler} style={backgroundColor}></div>;
};

export default CubeSegment;
