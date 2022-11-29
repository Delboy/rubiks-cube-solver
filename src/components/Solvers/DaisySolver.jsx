import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const DaisySolver = (props) => {
  // Checks if 'petals' on yellow face are solved
  const [daisySolved, setDaisySolved] = useState(false);
  const [petalOneSolved, setPetalOneSolved] = useState(false);
  const [petalTwoSolved, setPetalTwoSolved] = useState(false);
  const [petalThreeSolved, setPetalThreeSolved] = useState(false);
  const [petalFourSolved, setPetalFourSolved] = useState(false);

  const petal1 = useSelector((state) => state.faces.segmentState.ytm);
  const petal2 = useSelector((state) => state.faces.segmentState.ycl);
  const petal3 = useSelector((state) => state.faces.segmentState.ycr);
  const petal4 = useSelector((state) => state.faces.segmentState.ybm);

  useEffect(() => {
    if (petal1 === "white") {
      setPetalOneSolved(true);
    } else setPetalOneSolved(false);
    if (petal2 === "white") {
      setPetalTwoSolved(true);
    } else setPetalTwoSolved(false);
    if (petal3 === "white") {
      setPetalThreeSolved(true);
    } else setPetalThreeSolved(false);
    if (petal4 === "white") {
      setPetalFourSolved(true);
    } else setPetalFourSolved(false);
  }, [petal1, petal2, petal3, petal4]);

  // Checks if whole daisy is solved
  useEffect(() => {
    if (
      petalOneSolved &&
      petalTwoSolved &&
      petalThreeSolved &&
      petalFourSolved
    ) {
      setDaisySolved(true);
      props.onCommandSet("Daisy Solved!");
    }
  }, [
    props,
    petalOneSolved,
    petalTwoSolved,
    petalThreeSolved,
    petalFourSolved,
  ]);

  // Checks each face to see if top middle or bottom middle segments are white and if so rotates them into middle layer
  const blueTopEdge = useSelector((state) => state.faces.segmentState.btm);
  const redTopEdge = useSelector((state) => state.faces.segmentState.rtm);
  const greenTopEdge = useSelector((state) => state.faces.segmentState.gtm);
  const orangeTopEdge = useSelector((state) => state.faces.segmentState.otm);
  const blueBottomEdge = useSelector((state) => state.faces.segmentState.bbm);
  const redBottomEdge = useSelector((state) => state.faces.segmentState.rbm);
  const greenBottomEdge = useSelector((state) => state.faces.segmentState.gbm);
  const orangeBottomEdge = useSelector((state) => state.faces.segmentState.obm);
  const blueTopPair = useSelector((state) => state.faces.segmentState.wtm);
  const redTopPair = useSelector((state) => state.faces.segmentState.wcr);
  const greenTopPair = useSelector((state) => state.faces.segmentState.wbm);
  const orangeTopPair = useSelector((state) => state.faces.segmentState.wcl);
  const blueBottomPair = useSelector((state) => state.faces.segmentState.ybm);
  const redBottomPair = useSelector((state) => state.faces.segmentState.ycr);
  const greenBottomPair = useSelector((state) => state.faces.segmentState.ytm);
  const orangeBottomPair = useSelector((state) => state.faces.segmentState.ycl);

  useEffect(() => {
    const topAndBottomArray = [
      {
        edge: blueTopEdge,
        face: "blue",
        pair: blueTopPair,
      },
      {
        edge: redTopEdge,
        face: "red",
        pair: redTopPair,
      },
      {
        edge: greenTopEdge,
        face: "green",
        pair: greenTopPair,
      },
      {
        edge: orangeTopEdge,
        face: "orange",
        pair: orangeTopPair,
      },
      {
        edge: blueBottomEdge,
        face: "blue",
        pair: blueBottomPair,
      },
      {
        edge: redBottomEdge,
        face: "red",
        pair: redBottomPair,
      },
      {
        edge: greenBottomEdge,
        face: "green",
        pair: greenBottomPair,
      },
      {
        edge: orangeBottomEdge,
        face: "orange",
        pair: orangeBottomPair,
      },
    ];

    topAndBottomArray.forEach((seg) => {
      if (seg.edge === "white" && seg.pair === "white") {
          props.onCommandSet(`Rotate the top (U) so that the ${seg.face} face can rotate freely without moving an already solved piece`);
      }
      if (seg.edge === "white" && seg.pair !== "white") {
        props.onCommandSet(`Rotate the ${seg.face} face once (F) so that the white edge piece is in the center row`);
      }
    });
  }, [
    blueTopEdge,
    blueBottomEdge,
    redTopEdge,
    redBottomEdge,
    greenTopEdge,
    greenBottomEdge,
    orangeTopEdge,
    orangeBottomEdge,
    blueTopPair,
    redTopPair,
    greenTopPair,
    orangeTopPair,
    blueBottomPair,
    redBottomPair,
    greenBottomPair,
    orangeBottomPair,
    props,
  ]);

  // Checks for white segments in center layer and if so rotates them to the top face
  // Middle Edges
  const blueMiddleLeftEdge = useSelector(
    (state) => state.faces.segmentState.bcl
  );
  const blueMiddleRightEdge = useSelector(
    (state) => state.faces.segmentState.bcr
  );
  const redMiddleLeftEdge = useSelector(
    (state) => state.faces.segmentState.rcl
  );
  const redMiddleRightEdge = useSelector(
    (state) => state.faces.segmentState.rcr
  );
  const greenMiddleLeftEdge = useSelector(
    (state) => state.faces.segmentState.gcl
  );
  const greenMiddleRightEdge = useSelector(
    (state) => state.faces.segmentState.gcr
  );
  const orangeMiddleLeftEdge = useSelector(
    (state) => state.faces.segmentState.ocl
  );
  const orangeMiddleRightEdge = useSelector(
    (state) => state.faces.segmentState.ocr
  );

  // Top edges that are paired to middle edges
  const bmlTopPair = useSelector((state) => state.faces.segmentState.ycl);
  const bmrTopPair = useSelector((state) => state.faces.segmentState.ycr);
  const rmlTopPair = useSelector((state) => state.faces.segmentState.ybm);
  const rmrTopPair = useSelector((state) => state.faces.segmentState.ytm);
  const gmlTopPair = useSelector((state) => state.faces.segmentState.ycr);
  const gmrTopPair = useSelector((state) => state.faces.segmentState.ycl);
  const omlTopPair = useSelector((state) => state.faces.segmentState.ytm);
  const omrTopPair = useSelector((state) => state.faces.segmentState.ybm);

  useEffect(() => {
    const leftAndRightArray = [
      {
        edge: blueMiddleRightEdge,
        top: bmrTopPair,
        face: "blue",
        pos: "right",
      },
      {
        edge: blueMiddleLeftEdge,
        top: bmlTopPair,
        face: "blue",
        pos: "left",
      },
      {
        edge: redMiddleRightEdge,
        top: rmrTopPair,
        face: "red",
        pos: "right",
      },
      {
        edge: redMiddleLeftEdge,
        top: rmlTopPair,
        face: "red",
        pos: "left",
      },
      {
        edge: greenMiddleRightEdge,
        top: gmrTopPair,
        face: "green",
        pos: "right",
      },
      {
        edge: greenMiddleLeftEdge,
        top: gmlTopPair,
        face: "green",
        pos: "left",
      },
      {
        edge: orangeMiddleRightEdge,
        top: omrTopPair,
        face: "orange",
        pos: "right",
      },
      {
        edge: orangeMiddleLeftEdge,
        top: omlTopPair,
        face: "orange",
        pos: "left",
      },
    ];

    leftAndRightArray.forEach((seg) => {
      if (seg.edge === "white" && seg.top === "white") {
        props.onCommandSet(`Rotate the top (U) so that the white edge on the ${seg.face} face can rotate up into place`);
      } else if (seg.edge === "white" && seg.top !== "white") {
        props.onCommandSet(
          `Rotate the ${seg.pos}  side (${seg.pos.toUpperCase().charAt(0)} ${seg.pos === 'left' ? "' " : ''}) of the ${seg.face} face away from you once, putting the white edge piece in place!`
        );
      }
    });
  }, [
    blueMiddleLeftEdge,
    blueMiddleRightEdge,
    redMiddleLeftEdge,
    redMiddleRightEdge,
    greenMiddleLeftEdge,
    greenMiddleRightEdge,
    orangeMiddleLeftEdge,
    orangeMiddleRightEdge,
    bmlTopPair,
    bmrTopPair,
    rmrTopPair,
    rmlTopPair,
    gmrTopPair,
    gmlTopPair,
    omrTopPair,
    omlTopPair,
    props,
  ]);

  // Checks if any white edges on bottom face and if so rotates them to top

  // Bottom Edges
  const blueWedgeBottomEdge = useSelector(
    (state) => state.faces.segmentState.wtm
  );
  const redWedgeBottomEdge = useSelector(
    (state) => state.faces.segmentState.wcr
  );
  const greenWedgeBottomEdge = useSelector(
    (state) => state.faces.segmentState.wbm
  );
  const orangeWedgeBottomEdge = useSelector(
    (state) => state.faces.segmentState.wcl
  );

  // Top Edges
  const blueWedgeTopEdge = useSelector((state) => state.faces.segmentState.ybm);
  const redWedgeTopEdge = useSelector((state) => state.faces.segmentState.ycr);
  const greenWedgeTopEdge = useSelector(
    (state) => state.faces.segmentState.ytm
  );
  const orangeWedgeTopEdge = useSelector(
    (state) => state.faces.segmentState.ycl
  );

  useEffect(() => {
    const topAndBottomArray = [
      {
        top: blueWedgeTopEdge,
        bottom: blueWedgeBottomEdge,
        face: "blue",
      },
      {
        top: redWedgeTopEdge,
        bottom: redWedgeBottomEdge,
        face: "red",
      },
      {
        top: greenWedgeTopEdge,
        bottom: greenWedgeBottomEdge,
        face: "green",
      },
      {
        top: orangeWedgeTopEdge,
        bottom: orangeWedgeBottomEdge,
        face: "orange",
      },
    ];

    topAndBottomArray.forEach((pair) => {
      if (pair.bottom === "white" && pair.top === "white") {
        props.onCommandSet(`Rotate the top (U) so that the white edge on the ${pair.bottom} face can rotate up into place`);
      } else if (pair.bottom === "white") {
        props.onCommandSet(`Rotate the ${pair.face} face (F) twice so that the white edge on the bottom face rotates up to the top!`);
      }
    });
  });
};

export default DaisySolver;
