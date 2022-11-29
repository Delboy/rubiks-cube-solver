import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { facesActions } from "../../orientation";

const CubeSegment = (props) => {
  const colorSelected = useSelector((state) => state.faces.colorSelected);
  const cornerColorCount = useSelector((state) => state.faces.cornerColorCount);
  const edgeColorCount = useSelector((state) => state.faces.edgeColorCount);
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

  let isCorner = false
    if(
      props.position.slice(1) === 'tl' ||
      props.position.slice(1) === 'tr' ||
      props.position.slice(1) === 'bl' ||
      props.position.slice(1) === 'br' 
    ){
      isCorner = true
    }

    let totalEdgeColor = edgeColorCount[colorSelected]
    let totalCornerColor = cornerColorCount[colorSelected]

  const setColorHandler = (e) => {
    if (cursor === "not-allowed") {
      return;
    }
    

    const payload = {
      position: props.position,
      color: colorSelected,
    };

    // If the color selected is the same as the segments color remove the color
    if (colorSelected === segmentColor) {
      dispatch(
        facesActions.setSegmentColor({ position: props.position, color: null })
      );
      if(isCorner){
        dispatch(facesActions.removeFromCornerColorCounter(colorSelected));
      } else {
        dispatch(facesActions.removeFromEdgeColorCounter(colorSelected));
      }
      return;
    }

    // If the segment has a color, remove that color and replace with the color selcted
      if(isCorner && segmentColor && (totalCornerColor < 4)){
        dispatch(facesActions.setSegmentColor(payload));
        dispatch(facesActions.removeFromCornerColorCounter(segmentColor))
        dispatch(facesActions.addToCornerColorCounter(colorSelected))
        return
      }
  
      if(!isCorner && segmentColor && (totalEdgeColor < 4)){
        dispatch(facesActions.setSegmentColor(payload));
        dispatch(facesActions.removeFromEdgeColorCounter(segmentColor));
        dispatch(facesActions.addToEdgeColorCounter(colorSelected));
        return
      }

    // If the segment has no color, add the color selected
    if(isCorner && (totalCornerColor < 4)){
      dispatch(facesActions.setSegmentColor(payload));
      dispatch(facesActions.addToCornerColorCounter(colorSelected));
      return
    }
    if(!isCorner && (totalEdgeColor < 4)){
      dispatch(facesActions.setSegmentColor(payload));
      dispatch(facesActions.addToEdgeColorCounter(colorSelected));
      return
    }

    // If clear is selected color, remove the color
    if (colorSelected === "clear") {
      dispatch(
        facesActions.setSegmentColor({ position: props.position, color: null })
      );
      if(isCorner){
        dispatch(facesActions.removeFromCornerColorCounter(segmentColor));
      } else {
        dispatch(facesActions.removeFromEdgeColorCounter(segmentColor));
      }
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
      (isCorner && (totalCornerColor === 4)) || 
      (!isCorner && (totalEdgeColor === 4)) ||
      (colorSelected === 'blue' && pairsColor === 'green') ||
      (colorSelected === 'green' && pairsColor === 'blue') ||
      (colorSelected === 'red' && pairsColor === 'orange') ||
      (colorSelected === 'orange' && pairsColor === 'red') ||
      (colorSelected === 'white' && pairsColor === 'yellow') ||
      (colorSelected === 'yellow' && pairsColor === 'white') ||
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
