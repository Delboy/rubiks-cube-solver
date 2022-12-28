import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const FirstLayerSolver = (props) => {
  const daisySolved = useSelector((state) => state.guide.daisySolved);
  const whiteCrossSolved = useSelector((state) => state.guide.whiteCrossSolved);
  const firstLayerSolved = useSelector((state) => state.guide.firstLayerSolved);

  // Top Layer Corners
  const blueTopLeftCorner = useSelector(
    (state) => state.faces.segmentState.btl
  );
  const blueTopRightCorner = useSelector(
    (state) => state.faces.segmentState.btr
  );
  const orangeTopLeftCorner = useSelector(
    (state) => state.faces.segmentState.otl
  );
  const orangeTopRightCorner = useSelector(
    (state) => state.faces.segmentState.otr
  );
  const greenTopLeftCorner = useSelector(
    (state) => state.faces.segmentState.gtl
  );
  const greenTopRightCorner = useSelector(
    (state) => state.faces.segmentState.gtr
  );
  const redTopLeftCorner = useSelector((state) => state.faces.segmentState.rtl);
  const redTopRightCorner = useSelector(
    (state) => state.faces.segmentState.rtr
  );

  // Bottom Layer Corners
  const blueBottomLeftCorner = useSelector(
    (state) => state.faces.segmentState.bbl
  );
  const blueBottomRightCorner = useSelector(
    (state) => state.faces.segmentState.bbr
  );
  const orangeBottomLeftCorner = useSelector(
    (state) => state.faces.segmentState.obl
  );
  const orangeBottomRightCorner = useSelector(
    (state) => state.faces.segmentState.obr
  );
  const greenBottomLeftCorner = useSelector(
    (state) => state.faces.segmentState.gbl
  );
  const greenBottomRightCorner = useSelector(
    (state) => state.faces.segmentState.gbr
  );
  const redBottomLeftCorner = useSelector(
    (state) => state.faces.segmentState.rbl
  );
  const redBottomRightCorner = useSelector(
    (state) => state.faces.segmentState.rbr
  );

  // Move counter
  const moveCounter = useSelector((state) => state.faces.moveCounter);

  // Finds corners with white edges in top row and returns algorithm to solve
  const topLayerFacingOut = useCallback(() => {
    const topCorners = [
      {
        face: "blue",
        edgeOne: blueTopLeftCorner,
        edgeTwo: blueTopRightCorner,
        edgeOnePair: orangeTopRightCorner,
        edgeTwoPair: redTopLeftCorner,
      },
      {
        face: "orange",
        edgeOne: orangeTopLeftCorner,
        edgeTwo: orangeTopRightCorner,
        edgeOnePair: greenTopRightCorner,
        edgeTwoPair: blueTopLeftCorner,
      },
      {
        face: "green",
        edgeOne: greenTopLeftCorner,
        edgeTwo: greenTopRightCorner,
        edgeOnePair: redTopRightCorner,
        edgeTwoPair: orangeTopLeftCorner,
      },
      {
        face: "red",
        edgeOne: redTopLeftCorner,
        edgeTwo: redTopRightCorner,
        edgeOnePair: blueTopRightCorner,
        edgeTwoPair: greenTopLeftCorner,
      },
    ];

    const faceOrder = ["blue", "red", "green", "orange"];

    topCorners.forEach((corner) => {
      // Index of what face has a white edge piece
      let faceWithWhiteIndex = faceOrder.indexOf(corner.face);

      // Works out what color face is to the right of the paired color,
      // as this is the face that needs to rotate when doing the alogrithm
      let edgeOnePairIndex = faceOrder.indexOf(corner.edgeOnePair);
      let rightOfEdgePairOneIndex = edgeOnePairIndex + 1;
      if (rightOfEdgePairOneIndex === 4) {
        rightOfEdgePairOneIndex = 0;
      }
      let rightOfEdgePairOne = faceOrder[rightOfEdgePairOneIndex];

      // Works out what color face is to the left of the paired color,
      // as this is the face that needs to rotate when doing the alogrithm
      let edgeTwoPairIndex = faceOrder.indexOf(corner.edgeTwoPair);
      let leftOfEdgePairTwoIndex = edgeTwoPairIndex - 1;
      if (leftOfEdgePairTwoIndex === -1) {
        leftOfEdgePairTwoIndex = 3;
      }
      let leftOfEdgePairTwo = faceOrder[leftOfEdgePairTwoIndex];

      // Variables
      let faceItsOn;
      let indexOfWhereItNeedsToBe;
      let move = "clockwise";
      let algoDirection = "y";

      let colorCornerPos;
      let whiteCornerPos;
      let cornerEdgePair;
      let algoString;
      let case0Algo;
      let case1Algo;
      let case2Algo;

      // Works out what face the colored side of the corner with a white edge is on
      if (corner.edgeOne === "white") {
        faceItsOn = faceWithWhiteIndex - 1;
        if (faceItsOn === -1) {
          faceItsOn = 3;
        }
        indexOfWhereItNeedsToBe = faceOrder.indexOf(corner.edgeOnePair);
      }
      if (corner.edgeTwo === "white") {
        faceItsOn = faceWithWhiteIndex + 1;
        if (faceItsOn === 4) {
          faceItsOn = 0;
        }
        indexOfWhereItNeedsToBe = faceOrder.indexOf(corner.edgeTwoPair);
      }

      // Works out how many moves are needed to get the colored side of the corner to align with the same colored face
      let ammoutOfMoves = faceItsOn - indexOfWhereItNeedsToBe;
      if (ammoutOfMoves === -3) {
        ammoutOfMoves = -1;
      }
      if (ammoutOfMoves < 0) {
        move = "anticlockwise";
        algoDirection = "yp";
        ammoutOfMoves = ammoutOfMoves * -1;
      }

      // Updates variables depending on what corner has the white edge
      if (corner.edgeOne === "white") {
        colorCornerPos = "right";
        whiteCornerPos = "left";
        cornerEdgePair = corner.edgeOnePair.toUpperCase();
        algoString = ["R", "U", "R'"];
        case0Algo = [
          `${corner.face.charAt(0)}`,
          "y",
          `${corner.face.charAt(0)}p`,
        ];
        case1Algo = [
          `${algoDirection}`,
          `${rightOfEdgePairOne.charAt(0)}`,
          "y",
          `${rightOfEdgePairOne.charAt(0)}p`,
        ];
        case2Algo = [
          `y`,
          `y`,
          `${rightOfEdgePairOne.charAt(0)}`,
          "y",
          `${rightOfEdgePairOne.charAt(0)}p`,
        ];
      }
      if (corner.edgeTwo === "white") {
        colorCornerPos = "left";
        whiteCornerPos = "right";
        cornerEdgePair = corner.edgeTwoPair.toUpperCase();
        algoString = ["L'", "U'", "L"];
        case0Algo = [
          `${corner.face.charAt(0)}p`,
          "yp",
          `${corner.face.charAt(0)}`,
        ];
        case1Algo = [
          `${algoDirection}`,
          `${leftOfEdgePairTwo.charAt(0)}p`,
          "yp",
          `${leftOfEdgePairTwo.charAt(0)}`,
        ];
        case2Algo = [
          `y`,
          `y`,
          `${leftOfEdgePairTwo.charAt(0)}p`,
          "yp",
          `${leftOfEdgePairTwo.charAt(0)}`,
        ];
      }

      // Runs commands depending on how many moves needed
      switch (ammoutOfMoves) {
        case 0:
          props.setValuesForMultiStageCommand(
            true,
            moveCounter,
            [
              `The top ${colorCornerPos} corner piece on the ${cornerEdgePair} face matches the face's center piece and has a white side, so facing the ${cornerEdgePair} face peform the algorithm ${algoString[0]}, ${algoString[1]}, ${algoString[2]}`,
              `Now, facing the ${cornerEdgePair} face, perform ${algoString[1]}`,
              `Now, facing the ${cornerEdgePair} face, perform ${algoString[2]}`,
            ],
            case0Algo
          );
          break;
        case 1:
          props.setValuesForMultiStageCommand(
            true,
            moveCounter,
            [
              `The ${corner.face.toUpperCase()} face has a white edge in the top ${whiteCornerPos} corner, so match up it's adjacent color ${cornerEdgePair} to the same color center by turning the top ${move} one time!`,
              `Now, facing the ${cornerEdgePair} face, perform ${algoString[0]}`,
              `Now, facing the ${cornerEdgePair} face, perform ${algoString[1]}`,
              `Now, facing the ${cornerEdgePair} face, perform ${algoString[2]}`,
            ],
            case1Algo
          );
          break;
        case 2:
          props.setValuesForMultiStageCommand(
            true,
            moveCounter,
            [
              `The ${corner.face.toUpperCase()} face has a white edge in the top ${whiteCornerPos} corner, so match up it's adjacent color ${cornerEdgePair} to the same color center by turning the top either direction twice!`,
              "Keep turning",
              `Now, facing the ${cornerEdgePair} face, perform ${algoString[0]}`,
              `Now, facing the ${cornerEdgePair} face, perform ${algoString[1]}`,
              `Now, facing the ${cornerEdgePair} face, perform ${algoString[2]}`,
            ],
            case2Algo
          );
          break;
        default:
          break;
      }
    });
  }, [
    blueTopLeftCorner,
    blueTopRightCorner,
    greenTopLeftCorner,
    greenTopRightCorner,
    orangeTopLeftCorner,
    orangeTopRightCorner,
    redTopLeftCorner,
    redTopRightCorner,
    moveCounter,
    props,
  ]);

  const bottomLayer = useCallback(() => {
    const bottomCorners = [
      {
        face: "blue",
        edgeOne: blueBottomLeftCorner,
        edgeTwo: blueBottomRightCorner,
        leftOfFace: "orange",
        rightOfFace: "red",
      },
      {
        face: "orange",
        edgeOne: orangeBottomLeftCorner,
        edgeTwo: orangeBottomRightCorner,
        leftOfFace: "green",
        rightOfFace: "blue",
      },
      {
        face: "green",
        edgeOne: greenBottomLeftCorner,
        edgeTwo: greenBottomRightCorner,
        leftOfFace: "red",
        rightOfFace: "orange",
      },
      {
        face: "red",
        edgeOne: redBottomLeftCorner,
        edgeTwo: redBottomRightCorner,
        leftOfFace: "blue",
        rightOfFace: "green",
      },
    ];

    bottomCorners.forEach((corner) => {
      let adjacentFace;
      let whitePos;
      let algo;
      let algoString2;
      let hasWhiteEdge = false;
      if (corner.edgeOne === "white") {
        hasWhiteEdge = true;
        adjacentFace = corner.leftOfFace;
        whitePos = "left";
        algoString2 = ["R", "U", "R'"];
        algo = [`${corner.face.charAt(0)}`, "y", `${corner.face.charAt(0)}p`];
      }
      if (corner.edgeTwo === "white") {
        hasWhiteEdge = true;
        adjacentFace = corner.rightOfFace;
        whitePos = "right";
        algoString2 = ["L'", "U'", "L"];
        algo = [`${corner.face.charAt(0)}p`, "yp", `${corner.face.charAt(0)}`];
      }
      if (hasWhiteEdge) {
        props.setValuesForMultiStageCommand(
          true,
          moveCounter,
          [
            `The ${corner.face} face has a white edge in the bottom ${whitePos} corner, so facing the ${adjacentFace} face, perform ${algoString2[0]}, ${algoString2[1]}, ${algoString2[2]} in order to put the corner into the top row`,
            `Now, facing the ${adjacentFace} face, perform ${algoString2[1]}`,
            `Now, facing the ${adjacentFace} face, perform ${algoString2[2]}`,
          ],
          algo
        );
      }
      hasWhiteEdge = false;
    });
  }, [
    blueBottomLeftCorner,
    blueBottomRightCorner,
    greenBottomLeftCorner,
    greenBottomRightCorner,
    moveCounter,
    orangeBottomLeftCorner,
    orangeBottomRightCorner,
    props,
    redBottomLeftCorner,
    redBottomRightCorner,
  ]);

  const firstLayerSolver = useCallback(() => {
    if (!props.multiStageCommand) {
      // checks if white corners are in the bottom layer
      bottomLayer();
      // checks if white corners facing out in top layer
      topLayerFacingOut();
    }
    if (props.multiStageCommand) {
      props.multiStageCommandSetter();
    }
  }, [topLayerFacingOut, bottomLayer, props]);

  // Runs the solver if white cross not solved
  useEffect(() => {
    if (daisySolved && whiteCrossSolved && !firstLayerSolved) {
      firstLayerSolver();
    }
  }, [daisySolved, whiteCrossSolved, firstLayerSolved, firstLayerSolver]);
};

export default FirstLayerSolver;
