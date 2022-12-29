import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guideActions } from "../../orientation";

const FirstLayerSolver = (props) => {
  const daisySolved = useSelector((state) => state.guide.daisySolved);
  const whiteCrossSolved = useSelector((state) => state.guide.whiteCrossSolved);
  const firstLayerSolved = useSelector((state) => state.guide.firstLayerSolved);

  const dispatch = useDispatch();

  // Top Layer Corners - white facing out
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

  // Top Layer corners - White facing up
  const topLeftYellowCorner = useSelector(
    (state) => state.faces.segmentState.ytl
  );
  const topLeftYellowLeftPair = useSelector(
    (state) => state.faces.segmentState.gtr
  );
  const topLeftYellowRightPair = useSelector(
    (state) => state.faces.segmentState.otl
  );

  const topRightYellowCorner = useSelector(
    (state) => state.faces.segmentState.ytr
  );
  const topRightYellowLeftPair = useSelector(
    (state) => state.faces.segmentState.rtr
  );
  const topRightYellowRightPair = useSelector(
    (state) => state.faces.segmentState.gtl
  );

  const bottomLeftYellowCorner = useSelector(
    (state) => state.faces.segmentState.ybl
  );
  const bottomLeftYellowLeftPair = useSelector(
    (state) => state.faces.segmentState.otr
  );
  const bottomLeftYellowRightPair = useSelector(
    (state) => state.faces.segmentState.btl
  );

  const bottomRightYellowCorner = useSelector(
    (state) => state.faces.segmentState.ybr
  );
  const bottomRightYellowLeftPair = useSelector(
    (state) => state.faces.segmentState.btr
  );
  const bottomRightYellowRightPair = useSelector(
    (state) => state.faces.segmentState.rtl
  );

  // White corners
  const topLeftWhiteCorner = useSelector(
    (state) => state.faces.segmentState.wtl
  );
  const topRighttWhiteCorner = useSelector(
    (state) => state.faces.segmentState.wtr
  );
  const bottomLeftWhiteCorner = useSelector(
    (state) => state.faces.segmentState.wbl
  );
  const bottomRightWhiteCorner = useSelector(
    (state) => state.faces.segmentState.wbr
  );

  // Checks if first layer is solved
  useEffect(() => {
    if (
      blueBottomLeftCorner === "blue" &&
      blueBottomRightCorner === "blue" &&
      orangeBottomLeftCorner === "orange" &&
      orangeBottomRightCorner === "orange" &&
      greenBottomLeftCorner === "green" &&
      greenBottomRightCorner === "green" &&
      redBottomLeftCorner === "red" &&
      redBottomRightCorner === "red" &&
      topLeftWhiteCorner === "white" &&
      topRighttWhiteCorner === "white" &&
      bottomLeftWhiteCorner === "white" &&
      bottomRightWhiteCorner === "white" &&
      whiteCrossSolved
    ) {
      dispatch(guideActions.setFirstLayerSolved(true));
    }
  }, [
    blueBottomLeftCorner,
    blueBottomRightCorner,
    bottomLeftWhiteCorner,
    bottomRightWhiteCorner,
    dispatch,
    greenBottomLeftCorner,
    greenBottomRightCorner,
    orangeBottomLeftCorner,
    orangeBottomRightCorner,
    redBottomLeftCorner,
    redBottomRightCorner,
    topLeftWhiteCorner,
    topRighttWhiteCorner,
    whiteCrossSolved,
  ]);

  // Move counter
  const moveCounter = useSelector((state) => state.faces.moveCounter);

  // Finds corners with white edges in top row and returns algorithm to solve
  const topLayerFacingOut = useCallback(() => {
    // Top Corners to Check
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
      if (corner.edgeOne === "white" || corner.edgeTwo === "white") {
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
        let direction = "clockwise";
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
          ammoutOfMoves = 1;
        }
        if (ammoutOfMoves === -2) {
          ammoutOfMoves = 2;
        }
        if (ammoutOfMoves === -1) {
          ammoutOfMoves = 1;
          direction = "anticlockwise";
          algoDirection = "yp";
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

        // Sets commands depending on how many moves needed
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
                `The ${corner.face.toUpperCase()} face has a white edge in the top ${whiteCornerPos} corner, so match up it's adjacent color ${cornerEdgePair} to the same color center by turning the top ${direction} one time!`,
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
                `The ${corner.face.toUpperCase()} face has a white edge in the top ${whiteCornerPos} corner, so match up it's adjacent color ${cornerEdgePair} to the same color center by turning the top clockwise twice! (U2)`,
                "Keep turning the top (U)",
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
    // Bottom Corners to check
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
      if (corner.edgeOne === "white" || corner.edgeTwo === "white") {
        // Variables
        let adjacentFace;
        let whitePos;
        let algo;
        let algoString2;

        // Updates variables depending on which side is white
        if (corner.edgeOne === "white") {
          adjacentFace = corner.leftOfFace.toUpperCase();
          whitePos = "left";
          algoString2 = ["R", "U", "R'"];
          algo = [`${corner.face.charAt(0)}`, "y", `${corner.face.charAt(0)}p`];
        }
        if (corner.edgeTwo === "white") {
          adjacentFace = corner.rightOfFace.toUpperCase();
          whitePos = "right";
          algoString2 = ["L'", "U'", "L"];
          algo = [
            `${corner.face.charAt(0)}p`,
            "yp",
            `${corner.face.charAt(0)}`,
          ];
        }

        // Sets command
        props.setValuesForMultiStageCommand(
          true,
          moveCounter,
          [
            `The ${corner.face.toUpperCase()} face has a white edge in the bottom ${whitePos} corner, so facing the ${adjacentFace} face, perform ${algoString2[0]}, ${algoString2[1]}, ${algoString2[2]} in order to put the corner into the top row`,
            `Now, facing the ${adjacentFace} face, perform ${algoString2[1]}`,
            `Now, facing the ${adjacentFace} face, perform ${algoString2[2]}`,
          ],
          algo
        );
      }
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

  const topLayerFacingUp = useCallback(() => {
    // Top Four corners to check
    const topCorners = [
      {
        topFace: topLeftYellowCorner,
        leftEdge: topLeftYellowLeftPair,
        rightEdge: topLeftYellowRightPair,
        leftSide: "green",
        rightSide: "orange",
      },
      {
        topFace: topRightYellowCorner,
        leftEdge: topRightYellowLeftPair,
        rightEdge: topRightYellowRightPair,
        leftSide: "red",
        rightSide: "green",
      },
      {
        topFace: bottomLeftYellowCorner,
        leftEdge: bottomLeftYellowLeftPair,
        rightEdge: bottomLeftYellowRightPair,
        leftSide: "orange",
        rightSide: "blue",
      },
      {
        topFace: bottomRightYellowCorner,
        leftEdge: bottomRightYellowLeftPair,
        rightEdge: bottomRightYellowRightPair,
        leftSide: "blue",
        rightSide: "red",
      },
    ];

    topCorners.forEach((corner) => {
      if (corner.topFace === "white") {
        const faceOrder = ["blue", "red", "green", "orange"];

        // Get left edge pos
        const indexOfLeftEdge = faceOrder.indexOf(corner.leftEdge);

        // Get matching side pos
        const indexOfRightSide = faceOrder.indexOf(corner.rightSide);

        // Work out the amount of moves need to get the top corner in place
        let amountOfMoves = indexOfRightSide - indexOfLeftEdge;

        let direction = "clockwise";
        let algoDirection = "y";
        if (amountOfMoves === -3) {
          amountOfMoves = 1;
        }
        if (amountOfMoves === -2) {
          amountOfMoves = 2;
        }
        if (amountOfMoves === -1) {
          amountOfMoves = 1;
          direction = "anticlockwise";
          algoDirection = "yp";
        }

        // Capitalises Face for string
        const leftSide = corner.leftSide.toUpperCase()
        const rightEdge = corner.rightEdge.toUpperCase()

        // Sets command depending on amount of moves needed
        switch (amountOfMoves) {
          case 0:
            props.setValuesForMultiStageCommand(
              true,
              moveCounter,
              [
                `The ${leftSide} face has a white edge facing up in top right corner. We need to get this white edge facing outwards. As this is directly above the bottom corner where it needs to be we can begin the alogrithm. So facing the ${rightEdge} face, perform the alorithm R, U, U, R'.`,
                `Now, facing the ${rightEdge} face, perform U`,
                `Now, facing the ${rightEdge} face, perform U`,
                `Now, facing the ${rightEdge} face, perform R'`,
              ],
              [
                `${corner.leftEdge.charAt(0)}`,
                "y",
                "y",
                `${corner.leftEdge.charAt(0)}p`,
              ]
            );
            break;
          case 1:
            props.setValuesForMultiStageCommand(
              true,
              moveCounter,
              [
                `The ${leftSide} face has a white edge facing up in top right corner. To begin we need to place it above the bottom corner where it will eventually end up. To do this turn the top ${direction} one time.`,
                `Now that we have the corner in the right position we need to get the white edge facing outwards. To do so, facing the ${rightEdge} face perform the alorithm R, U, U, R'.`,
                `Now, facing the ${rightEdge} face, perform U`,
                `Now, facing the ${rightEdge} face, perform U`,
                `Now, facing the ${rightEdge} face, perform R'`,
              ],
              [
                `${algoDirection}`,
                `${corner.leftEdge.charAt(0)}`,
                "y",
                "y",
                `${corner.leftEdge.charAt(0)}p`,
              ]
            );
            break;
          case 2:
            props.setValuesForMultiStageCommand(
              true,
              moveCounter,
              [
                `The ${leftSide} face has a white edge facing up in top right corner. To begin we need to place it above the bottom corner where it will eventually end up. To do this turn the top clockwise twice (U2).`,
                `Keep turning the top (U)`,
                `Now that we have the corner in the right position we need to get the white edge facing outwards. To do so, facing the ${rightEdge} face perform the alorithm R, U, U, R'.`,
                `Now, facing the ${rightEdge} face, perform U`,
                `Now, facing the ${rightEdge} face, perform U`,
                `Now, facing the ${rightEdge} face, perform R'`,
              ],
              [
                "y",
                "y",
                `${corner.leftEdge.charAt(0)}`,
                "y",
                "y",
                `${corner.leftEdge.charAt(0)}p`,
              ]
            );
            break;
          default:
            break;
        }
      }
    });
  }, [
    bottomLeftYellowCorner,
    bottomLeftYellowLeftPair,
    bottomLeftYellowRightPair,
    bottomRightYellowCorner,
    bottomRightYellowLeftPair,
    bottomRightYellowRightPair,
    topLeftYellowCorner,
    topLeftYellowLeftPair,
    topLeftYellowRightPair,
    topRightYellowCorner,
    topRightYellowLeftPair,
    topRightYellowRightPair,
    moveCounter,
    props,
  ]);

  const firstLayerSolver = useCallback(() => {
    if (!props.multiStageCommand) {
      // checks if white corners facing up in top layer
      topLayerFacingUp();
      // checks if white corners are in the bottom layer
      bottomLayer();
      // checks if white corners facing out in top layer
      topLayerFacingOut();
    }
    if (props.multiStageCommand) {
      props.multiStageCommandSetter();
    }
  }, [topLayerFacingOut, bottomLayer, topLayerFacingUp, props]);

  // Runs the solver if white cross not solved
  useEffect(() => {
    if (daisySolved && whiteCrossSolved && !firstLayerSolved) {
      firstLayerSolver();
    }
  }, [daisySolved, whiteCrossSolved, firstLayerSolved, firstLayerSolver]);
};

export default FirstLayerSolver;
