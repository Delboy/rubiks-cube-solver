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

  const allCompletedEdges = useSelector((state) => state.faces.completedEdges);
  const allCompletedCorners = useSelector(
    (state) => state.faces.completedCorners
  );

  const [cursor, setCursor] = useState("");

  const cubeFilled = useSelector(state => state.faces.allSegmentsFilled)

  const dispatch = useDispatch();

  let isCorner = false;
  if (
    props.position.slice(1) === "tl" ||
    props.position.slice(1) === "tr" ||
    props.position.slice(1) === "bl" ||
    props.position.slice(1) === "br"
  ) {
    isCorner = true;
  }

  let selectedColorsTotalEdges = edgeColorCount[colorSelected];
  let selectedColorsTotalCorners = cornerColorCount[colorSelected];

  const removeFromSolvedCorners = () => {
    let corner1 = [segmentColor, cornerSecondColor, cornerThirdColor];
    let corner2 = [segmentColor, cornerThirdColor, cornerSecondColor];
    let corner3 = [cornerSecondColor, segmentColor, cornerThirdColor];
    let corner4 = [cornerSecondColor, cornerThirdColor, segmentColor];
    let corner5 = [cornerThirdColor, segmentColor, cornerSecondColor];
    let corner6 = [cornerThirdColor, cornerSecondColor, segmentColor];

    let index = -1;
    allCompletedCorners.forEach((corner) => {
      index += 1;
      if (
        (corner[0] === corner1[0] &&
          corner[1] === corner1[1] &&
          corner[2] === corner1[2]) ||
        (corner[0] === corner2[0] &&
          corner[1] === corner2[1] &&
          corner[2] === corner2[2]) ||
        (corner[0] === corner3[0] &&
          corner[1] === corner3[1] &&
          corner[2] === corner3[2]) ||
        (corner[0] === corner4[0] &&
          corner[1] === corner4[1] &&
          corner[2] === corner4[2]) ||
        (corner[0] === corner5[0] &&
          corner[1] === corner5[1] &&
          corner[2] === corner5[2]) ||
        (corner[0] === corner6[0] &&
          corner[1] === corner6[1] &&
          corner[2] === corner6[2])
      ) {
        dispatch(facesActions.removeFromCompletedCorners(index));
      }
    });
  };

  const removeFromSolvedEdges = () => {
    if (pairsColor) {
      let edge1 = [segmentColor, pairsColor];
      let edge2 = [pairsColor, segmentColor];

      let index = -1;
      allCompletedEdges.forEach((edge) => {
        index += 1;
        if (
          (edge[0] === edge1[0] && edge[1] === edge1[1]) ||
          (edge[0] === edge2[0] && edge[1] === edge2[1])
        ) {
          dispatch(facesActions.removeFromCompletedEdges(index));
        }
      });
    } 
  }

  const setColorHandler = (e) => {
    if (cursor === "not-allowed" || cursor === "wait") {
      return;
    }

    const payload = {
      position: props.position,
      color: colorSelected,
    };

    // If coloring segment completes edge piece, add to completed edges array
    if (!isCorner) {
      if (colorSelected !== "clear" && colorSelected !== segmentColor && pairsColor) {
        let pair = [colorSelected, pairsColor];
        dispatch(facesActions.addToCompletedEdges(pair));
      }
    }

    // If coloring segment completes corner, add to completed corners array
    if (isCorner) {
      if (colorSelected !== "clear" && colorSelected !== segmentColor && cornerSecondColor && cornerThirdColor) {
        let corner = [colorSelected, cornerSecondColor, cornerThirdColor];
        dispatch(facesActions.addToCompletedCorners(corner));
      }
    }

    // If color selected is 'clear' or is the same color as segment clicked, remove the color
    if (colorSelected === "clear" || colorSelected === segmentColor) {
      dispatch(
        facesActions.setSegmentColor({ position: props.position, color: null })
      );
      if (isCorner) {
        dispatch(facesActions.removeFromCornerColorCounter(segmentColor));
        if(cornerSecondColor && cornerThirdColor){
          removeFromSolvedCorners()
        }
      } else {
        dispatch(facesActions.removeFromEdgeColorCounter(segmentColor));
        if(pairsColor){
          removeFromSolvedEdges()
        }
      }
      return;
    }

    // If the segment is colored and is different from color selected, remove that color and replace with the color selected
    if (isCorner && segmentColor && selectedColorsTotalCorners < 4) {
      dispatch(facesActions.setSegmentColor(payload));
      dispatch(facesActions.removeFromCornerColorCounter(segmentColor));
      dispatch(facesActions.addToCornerColorCounter(colorSelected));
      if(cornerSecondColor && cornerThirdColor){
        removeFromSolvedCorners()
      }
      return;
    }
    if (!isCorner && segmentColor && selectedColorsTotalEdges < 4) {
      dispatch(facesActions.setSegmentColor(payload));
      dispatch(facesActions.removeFromEdgeColorCounter(segmentColor));
      dispatch(facesActions.addToEdgeColorCounter(colorSelected));
      if(pairsColor){
        removeFromSolvedEdges()
      }
      return;
    }

    // If the segment has no color, add the color selected
    if (isCorner && selectedColorsTotalCorners < 4) {
      dispatch(facesActions.setSegmentColor(payload));
      dispatch(facesActions.addToCornerColorCounter(colorSelected));
      return;
    }
    if (!isCorner && selectedColorsTotalEdges < 4) {
      dispatch(facesActions.setSegmentColor(payload));
      dispatch(facesActions.addToEdgeColorCounter(colorSelected));
      return;
    }
    
  };

  const hoverHandler = () => {
    setCursor('')
    
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

    // Checks if edge pair to be created already exists
    let edgeAlreadyExists = false;

    if (!isCorner && pairsColor) {
      let pair = [pairsColor, colorSelected];
      let reversePair = [colorSelected, pairsColor];

      let stringfyEdges = JSON.stringify(allCompletedEdges);
      pair = JSON.stringify(pair);
      reversePair = JSON.stringify(reversePair);

      let pairIndex = stringfyEdges.indexOf(pair);
      let reversePairIndex = stringfyEdges.indexOf(reversePair);

      if (pairIndex !== -1 || reversePairIndex !== -1) {
        edgeAlreadyExists = true;
      }
    }

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

    // Check if corner already exists
    let cornerAlreadyExists = false;

    if (
      isCorner &&
      cornerSecondColor &&
      cornerThirdColor 
    ) {
      let corner1 = [colorSelected, cornerSecondColor, cornerThirdColor];
      let corner2 = [colorSelected, cornerThirdColor, cornerSecondColor];
      let corner3 = [cornerSecondColor, colorSelected, cornerThirdColor];
      let corner4 = [cornerSecondColor, cornerThirdColor, colorSelected];
      let corner5 = [cornerThirdColor, colorSelected, cornerSecondColor];
      let corner6 = [cornerThirdColor, cornerSecondColor, colorSelected];

      let stringfyCorners = JSON.stringify(allCompletedCorners);

      corner1 = JSON.stringify(corner1);
      corner2 = JSON.stringify(corner2);
      corner3 = JSON.stringify(corner3);
      corner4 = JSON.stringify(corner4);
      corner5 = JSON.stringify(corner5);
      corner6 = JSON.stringify(corner6);

      let corner1Index = stringfyCorners.indexOf(corner1);
      let corner2Index = stringfyCorners.indexOf(corner2);
      let corner3Index = stringfyCorners.indexOf(corner3);
      let corner4Index = stringfyCorners.indexOf(corner4);
      let corner5Index = stringfyCorners.indexOf(corner5);
      let corner6Index = stringfyCorners.indexOf(corner6);

      if (
        corner1Index !== -1 ||
        corner2Index !== -1 ||
        corner3Index !== -1 ||
        corner4Index !== -1 ||
        corner5Index !== -1 ||
        corner6Index !== -1
      ) {
        cornerAlreadyExists = true;
      }
    }

    let illegalSegment

    if(edgeAlreadyExists || cornerAlreadyExists){
      illegalSegment = true
      dispatch(facesActions.setErrorMsg('Sorry, this piece already exists'))
    }

    if(pairsColor === colorSelected ||
      cornerSecondColor === colorSelected ||
      cornerThirdColor === colorSelected){
      illegalSegment = true
      dispatch(facesActions.setErrorMsg("Sorry, you can't have two of the same color on one piece"))
      }

    if(isCorner && selectedColorsTotalCorners === 4){
      illegalSegment = true
      dispatch(facesActions.setErrorMsg("Sorry, there is already the maximum number corners with this color"))
    }

    if(!isCorner && selectedColorsTotalEdges === 4){
      illegalSegment = true
      dispatch(facesActions.setErrorMsg("Sorry, there is already the maximum number edge pieces with this color"))
    }

    if((colorSelected === "blue" && pairsColor === "green") ||
    (colorSelected === "green" && pairsColor === "blue") ||
    (colorSelected === "red" && pairsColor === "orange") ||
    (colorSelected === "orange" && pairsColor === "red") ||
    (colorSelected === "white" && pairsColor === "yellow") ||
    (colorSelected === "yellow" && pairsColor === "white") ||
    (colorSelected === "green" &&
      (cornerSecondColor === "blue" || cornerThirdColor === "blue")) ||
    (colorSelected === "blue" &&
      (cornerSecondColor === "green" || cornerThirdColor === "green")) ||
    (colorSelected === "red" &&
      (cornerSecondColor === "orange" || cornerThirdColor === "orange")) ||
    (colorSelected === "orange" &&
      (cornerSecondColor === "red" || cornerThirdColor === "red")) ||
    (colorSelected === "white" &&
      (cornerSecondColor === "yellow" || cornerThirdColor === "yellow")) ||
    (colorSelected === "yellow" &&
      (cornerSecondColor === "white" || cornerThirdColor === "white"))){
        illegalSegment = true
        dispatch(facesActions.setErrorMsg("Sorry, you can't have a piece that contains two colors from opposite side faces"))
      }
    if(!cubeFilled){
      setCursor("wait");
    if (
      illegalSegment
    ) {
      setCursor("not-allowed");
    } else {
      // Timeout to give a small buffer
      setTimeout(() => {
        setCursor("");
      }, 100);
    }
  }
  };

  const leaveHandler = () => {
    dispatch(facesActions.setErrorMsg('')) 
  }

  const bgColor = {
    backgroundColor: `var(--color-${segmentColor})`,
    cursor: `${cursor}`,
  };

  return (
    <div
      onClick={setColorHandler}
      onMouseOver={hoverHandler}
      onMouseLeave={leaveHandler}
      style={bgColor}
    ></div>
  );
};

export default CubeSegment;
