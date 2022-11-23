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
  const [cornerSecondPos, setCornerSecondPos] = useState(null);
  const [cornerThirdPos, setCornerThirdPos] = useState(null);

  const pairsColor = useSelector((state) => state.faces.segmentState[pairsPos]);
  const cornerSecondColor = useSelector(
    (state) => state.faces.segmentState[cornerSecondPos]
  );
  const cornerThirdColor = useSelector(
    (state) => state.faces.segmentState[cornerThirdPos]
  );

  const [cursor, setCursor] = useState("");

  const dispatch = useDispatch();

  const setColorHandler = (e) => {
    if (cursor === "not-allowed") {
      return;
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
    // Disables cursor if user is trying to create an impossible edge or corner
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
          setPairsPos(second);
        } else {
          setPairsPos(first);
        }
      }
    });

    const corners = [
      ["btl", "ybl", "otr"],
      ["btr", "ybr", "rtl"],
      ["bbl", "wtl", "obr"],
      ["bbr", "wtr", "rbl"],
      ["gtl", "ytr", "rtr"],
      ["gtr", "ytl", "otl"],
      ["gbl", "wbr", "rbr"],
      ["gbr", "wbl", "obl"],
    ];

    corners.forEach((corner) => {
      if (corner.includes(props.position)) {
        let firstCnr = corner[0];
        let secondCnr = corner[1];
        let thirdCnr = corner[2];

        if (firstCnr === props.position) {
          setCornerSecondPos(secondCnr);
          setCornerThirdPos(thirdCnr);
        } else if (secondCnr === props.position) {
          setCornerSecondPos(firstCnr);
          setCornerThirdPos(thirdCnr);
        } else {
          setCornerSecondPos(firstCnr);
          setCornerThirdPos(secondCnr);
        }
      }
    });

    if (
      pairsColor === colorSelected ||
      cornerSecondColor === colorSelected ||
      cornerThirdColor === colorSelected ||
      (colorSelected === 'green' && (cornerSecondColor === 'blue' || cornerThirdColor === 'blue')) ||
      (colorSelected === 'blue' && (cornerSecondColor === 'green' || cornerThirdColor === 'green')) ||
      (colorSelected === 'red' && (cornerSecondColor === 'orange' || cornerThirdColor === 'orange')) ||
      (colorSelected === 'orange' && (cornerSecondColor === 'red' || cornerThirdColor === 'red')) ||
      (colorSelected === 'white' && (cornerSecondColor === 'yellow' || cornerThirdColor === 'yellow')) ||
      (colorSelected === 'yellow' && (cornerSecondColor === 'white' || cornerThirdColor === 'white'))
    ) {
      setCursor("not-allowed");
    } else {
      setCursor("");
    }
  };

  const bgColor = {
    backgroundColor: `var(--color-${segmentColor})`,
    cursor: `${cursor}`,
  };

  return (
    <div
      onClick={setColorHandler}
      onMouseOver={hoverHandler}
      style={bgColor}
    ></div>
  );
};

export default CubeSegment;
