import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const DaisySolver = () => {
  const [daisySolved, setDaisySolved] = useState(false);
  const [petalOneSolved, setPetalOneSolved] = useState(false);
  const [petalTwoSolved, setPetalTwoSolved] = useState(false);
  const [petalThreeSolved, setPetalThreeSolved] = useState(false);
  const [petalFourSolved, setPetalFourSolved] = useState(false);

  const [stringToPrint, setStringToPrint] = useState("");

  const petal1 = useSelector((state) => state.faces.segmentState.ytm);
  const petal2 = useSelector((state) => state.faces.segmentState.ycl);
  const petal3 = useSelector((state) => state.faces.segmentState.ycr);
  const petal4 = useSelector((state) => state.faces.segmentState.ybm);

  // Checks if 'petals' on yellow face are solved
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
      setStringToPrint("Daisy Solved!");
    }
  }, [petalOneSolved, petalTwoSolved, petalThreeSolved, petalFourSolved]);

  // Checks each face to see if top or bottom middle segments are white and if so rotates them into middle layer
  const blueTopEdge = useSelector((state) => state.faces.segmentState.btm);
  const redTopEdge = useSelector((state) => state.faces.segmentState.rtm);
  const greenTopEdge = useSelector((state) => state.faces.segmentState.gtm);
  const orangeTopEdge = useSelector((state) => state.faces.segmentState.otm);
  const blueBottomEdge = useSelector((state) => state.faces.segmentState.bbm);
  const redBottomEdge = useSelector((state) => state.faces.segmentState.rbm);
  const greenBottomEdge = useSelector((state) => state.faces.segmentState.gbm);
  const orangeBottomEdge = useSelector((state) => state.faces.segmentState.obm);

  useEffect(() => {
    const topAndBottomArray = {
      blueTopEdge,
      blueBottomEdge,
      redTopEdge,
      redBottomEdge,
      greenTopEdge,
      greenBottomEdge,
      orangeTopEdge,
      orangeBottomEdge,
    };

    Object.keys(topAndBottomArray).forEach((key) => {
      if (topAndBottomArray[key] === "white") {
        let faceToRotate;
        let strippedEdge = key.replace("Edge", "");
        if (strippedEdge.includes("Top")) {
          faceToRotate = strippedEdge.replace("Top", "");
        }
        if (strippedEdge.includes("Bottom")) {
          faceToRotate = strippedEdge.replace("Bottom", "");
        }
        setStringToPrint(`Rotate ${faceToRotate} face either direction`);
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
  ]);

  // Checks for white segments in center layer and if so rotates them to the top
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
        setStringToPrint("Rotate top Once");
      } else if (seg.edge === "white") {
        setStringToPrint(
          `Rotate ${seg.pos} side of ${seg.face} face away from you once`
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
  const greenWedgeTopEdge = useSelector((state) => state.faces.segmentState.ytm);
  const orangeWedgeTopEdge = useSelector((state) => state.faces.segmentState.ycl);

  useEffect(() => {
    const topAndBottomArray = [
        {
          top: blueWedgeTopEdge,
          bottom: blueWedgeBottomEdge,
          face: 'blue'
        },
        {
          top: redWedgeTopEdge,
          bottom: redWedgeBottomEdge,
          face: 'red'
        },
        {
          top: greenWedgeTopEdge,
          bottom:greenWedgeBottomEdge,
          face: 'green'
        },
        {
          top: orangeWedgeTopEdge,
          bottom: orangeWedgeBottomEdge,
          face: 'orange'
        },
      ];

      topAndBottomArray.forEach((pair) => {
        if (pair.bottom === "white" && pair.top === "white") {
          setStringToPrint("Rotate top Once");
        } else if (pair.bottom === "white") {
          setStringToPrint(
            `Rotate ${pair.face} face twice`
          );
        }
      });
  });

  return <p>command: {stringToPrint}</p>;
};

export default DaisySolver;
