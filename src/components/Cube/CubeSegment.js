import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { facesActions } from "../../orientation";

const CubeSegment = (props) => {
  const colorSelected = useSelector((state) => state.faces.colorSelected);
  const colorCount = useSelector((state) => state.faces.colorCount);
  const segmentColor = useSelector(
    (state) => state.faces.segmentState[props.position]
  );
  const [pairsPos, setPairsPos] = useState(null);
  const pairsColor = useSelector((state) => state.faces.segmentState[pairsPos]);
  const [cursor, setCursor] = useState('')

  const dispatch = useDispatch();

  const setColorHandler = (e) => {
    if(cursor === 'not-allowed'){
      return
    }
    let colorSelecetedAmount = colorCount[colorSelected];

    const payload = {
      position: props.position,
      color: colorSelected,
    };

    // If the color selected is the same as the segments color remove the color
    if (colorSelected === segmentColor) {
      dispatch(
        facesActions.setSegmentColor({ position: props.position, color: null })
      );
      dispatch(facesActions.removeFromColorCounter(colorSelected));
      return;
    }

    // If the segment has a color, remove that color and replace with the color selcted
    if (segmentColor && colorSelecetedAmount < 8) {
      dispatch(facesActions.setSegmentColor(payload));
      dispatch(facesActions.removeFromColorCounter(segmentColor));
      dispatch(facesActions.addToColorCounter(colorSelected));
      return;
    }

    // If the segment has no color, add the color selected
    if (colorSelecetedAmount < 8) {
      dispatch(facesActions.setSegmentColor(payload));
      dispatch(facesActions.addToColorCounter(colorSelected));
      return;
    }

    // If clear is selected color, remove the color
    if (colorSelected === "clear") {
      dispatch(
        facesActions.setSegmentColor({ position: props.position, color: null })
      );
      dispatch(facesActions.removeFromColorCounter(segmentColor));
      return;
    }
  };

  const hoverHandler = () => {
    // is position in corner?
    const position = props.position.slice(1);

    let seg;
    if (
      position.includes("tr") ||
      position.includes("tl") ||
      position.includes("bl") ||
      position.includes("br")
    ) {
      seg = "corner";
    } else {
      seg = "edge";
    }
    // Edge Pieces

    const edges = [
      ["btm", "ybm"],
      ["bcl", "ocr"],
      ["bcr", "rcl"],
      ["bbm", "wtm"],
      ["rtm", "ycr"],
      ["rbm", "wcr"],
      ["otm", "ycl"],
      ["obm", "wcl"],
      ["gtm", "ytm"],
      ["gcl", "rcr"],
      ["gcr", "ocl"],
      ["gbm", "wbm"],
    ];

    edges.forEach((edge) => {
      if (edge.includes(props.position)) {
        let first = edge[0];
        let second = edge[1];

        if (first === props.position) {
          console.log("1");
          setPairsPos(second);
        } else {
          console.log("2");
          setPairsPos(first);
        }
      }
    });

    if(pairsColor === colorSelected){
      setCursor('not-allowed')
    } else {
      setCursor('')
    }
  };

  const bgColor = { backgroundColor: `var(--color-${segmentColor})`, cursor: `${cursor}`};

  return (
    <div
      onClick={setColorHandler}
      onMouseOver={hoverHandler}
      style={bgColor}
    ></div>
  );
};

export default CubeSegment;
