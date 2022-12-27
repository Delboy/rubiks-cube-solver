import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

const FirstLayerSolver = (props) => {
  const daisySolved = useSelector((state) => state.guide.daisySolved);
  const whiteCrossSolved = useSelector((state) => state.guide.whiteCrossSolved);
  const firstLayerSolved = useSelector((state) => state.guide.firstLayerSolved);

  const blueLeftCorner = useSelector((state) => state.faces.segmentState.btl);
  const blueRightCorner = useSelector((state) => state.faces.segmentState.btr);
  const orangeLeftCorner = useSelector((state) => state.faces.segmentState.otl);
  const orangeRightCorner = useSelector(
    (state) => state.faces.segmentState.otr
  );
  const greenLeftCorner = useSelector((state) => state.faces.segmentState.gtl);
  const greenRightCorner = useSelector((state) => state.faces.segmentState.gtr);
  const redLeftCorner = useSelector((state) => state.faces.segmentState.rtl);
  const redRightCorner = useSelector((state) => state.faces.segmentState.rtr);

  const moveCounter = useSelector((state) => state.faces.moveCounter);

  const topLayerFacingOut = useCallback(() => {
    const topCorners = [
      {
        face: "blue",
        edgeOne: blueLeftCorner,
        edgeTwo: blueRightCorner,
        edgeOnePair: orangeRightCorner,
        edgeTwoPair: redLeftCorner,
      },
      {
        face: "orange",
        edgeOne: orangeLeftCorner,
        edgeTwo: orangeRightCorner,
        edgeOnePair: greenRightCorner,
        edgeTwoPair: blueLeftCorner,
      },
      {
        face: "green",
        edgeOne: greenLeftCorner,
        edgeTwo: greenRightCorner,
        edgeOnePair: redRightCorner,
        edgeTwoPair: orangeLeftCorner,
      },
      {
        face: "red",
        edgeOne: redLeftCorner,
        edgeTwo: redRightCorner,
        edgeOnePair: blueRightCorner,
        edgeTwoPair: greenLeftCorner,
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
        cornerEdgePair = corner.edgeOnePair;
        algoString = ["R", "U", "R'"];
        case0Algo =
          [`${corner.face.charAt(0)}`, "y", `${corner.face.charAt(0)}p`];
        case1Algo =
          [`${algoDirection}`,
          `${rightOfEdgePairOne.charAt(0)}`,
          "y",
          `${rightOfEdgePairOne.charAt(0)}p`];
        case2Algo =
          [`y`,
          `y`,
          `${rightOfEdgePairOne.charAt(0)}`,
          "y",
          `${rightOfEdgePairOne.charAt(0)}p`];
      }
      if (corner.edgeTwo === "white") {
        colorCornerPos = "left";
        whiteCornerPos = "right";
        cornerEdgePair = corner.edgeTwoPair;
        algoString = ["L'", "U'", "L"];
        case0Algo = [`${corner.face.charAt(0)}p`, "yp", `${corner.face.charAt(0)}`]
        case1Algo =
          [`${algoDirection}`,
          `${leftOfEdgePairTwo.charAt(0)}p`,
          "yp",
          `${leftOfEdgePairTwo.charAt(0)}`]
        case2Algo =
          [`y`,
          `y`,
          `${leftOfEdgePairTwo.charAt(0)}p`,
          "yp",
          `${leftOfEdgePairTwo.charAt(0)}`];
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
              `The ${corner.face} face has a white edge in the top ${whiteCornerPos} corner, so match up it's adjacent color ${cornerEdgePair} to the same color center by turning the top ${move} one time!`,
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
              `The ${corner.face} face has a white edge in the top ${whiteCornerPos} corner, so match up it's adjacent color ${cornerEdgePair} to the same color center by turning the top either direction twice!`,
              "Keep turning",
              `Now, facing the ${cornerEdgePair} face, perform ${algoString[0]}`,
              `Now. facing the ${cornerEdgePair} face, perform ${algoString[1]}`,
              `Now facing the ${cornerEdgePair} face, perform ${algoString[2]}`,
            ],
            case2Algo
          );
          break;
        default:
          break;
      }
    });
  }, [
    blueLeftCorner,
    blueRightCorner,
    greenLeftCorner,
    greenRightCorner,
    orangeLeftCorner,
    orangeRightCorner,
    redLeftCorner,
    redRightCorner,
    moveCounter,
    props,
  ]);

  const firstLayerSolver = useCallback(() => {
    if (!props.multiStageCommand) {
      // checks if white corners facing out in top layer
      topLayerFacingOut();
    }
    if (props.multiStageCommand) {
      props.multiStageCommandSetter();
    }
  }, [topLayerFacingOut, props]);

  // Runs the solver if white cross not solved
  useEffect(() => {
    if (daisySolved && whiteCrossSolved && !firstLayerSolved) {
      firstLayerSolver();
    }
  }, [daisySolved, whiteCrossSolved, firstLayerSolved, firstLayerSolver]);
};

export default FirstLayerSolver;
