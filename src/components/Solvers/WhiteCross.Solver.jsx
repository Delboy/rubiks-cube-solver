import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { guideActions } from "../../orientation";

const WhiteCrossSolver = (props) => {
  const daisySolved = useSelector((state) => state.guide.daisySolved);
  const whiteCrossSolved = useSelector((state) => state.guide.whiteCrossSolved);
  const petalCount = useSelector((state) => state.guide.petalCounter);
  const [whiteSolvedPiecesCount, setWhiteSolvedPiecesCount] = useState(0);

  const [whiteCrossBluePiece, setWhiteCrossBluePiece] = useState(false);
  const [whiteCrossRedPiece, setWhiteCrossRedPiece] = useState(false);
  const [whiteCrossGreenPiece, setWhiteCrossGreenPiece] = useState(false);
  const [whiteCrossOrangePiece, setWhiteCrossOrangePiece] = useState(false);

  const moveCounter = useSelector((state) => state.faces.moveCounter);

  const dispatch = useDispatch();

  // White Cross main face
  const whiteCrossTop = useSelector((state) => state.faces.segmentState.wtm);
  const whiteCrossBottom = useSelector((state) => state.faces.segmentState.wbm);
  const whiteCrossLeft = useSelector((state) => state.faces.segmentState.wcl);
  const whiteCrossRight = useSelector((state) => state.faces.segmentState.wcr);

  // White Cross opposite face
  const whiteCrossBlueEdge = useSelector(
    (state) => state.faces.segmentState.bbm
  );
  const whiteCrossOrangeEdge = useSelector(
    (state) => state.faces.segmentState.obm
  );

  const whiteCrossGreenEdge = useSelector(
    (state) => state.faces.segmentState.gbm
  );

  const whiteCrossRedEdge = useSelector(
    (state) => state.faces.segmentState.rbm
  );

  // Checks if white cross face and opposite face are correct
  useEffect(() => {
    if (whiteCrossTop === "white" && whiteCrossBlueEdge === "blue") {
      setWhiteCrossBluePiece(true);
    } else {
      setWhiteCrossBluePiece(false);
    }
    if (whiteCrossBottom === "white" && whiteCrossGreenEdge === "green") {
      setWhiteCrossGreenPiece(true);
    } else {
      setWhiteCrossGreenPiece(false);
    }
    if (whiteCrossLeft === "white" && whiteCrossOrangeEdge === "orange") {
      setWhiteCrossOrangePiece(true);
    } else {
      setWhiteCrossOrangePiece(false);
    }
    if (whiteCrossRight === "white" && whiteCrossRedEdge === "red") {
      setWhiteCrossRedPiece(true);
    } else {
      setWhiteCrossRedPiece(false);
    }
  }, [
    whiteCrossTop,
    whiteCrossBottom,
    whiteCrossLeft,
    whiteCrossRight,
    whiteCrossBlueEdge,
    whiteCrossGreenEdge,
    whiteCrossOrangeEdge,
    whiteCrossRedEdge,
  ]);

  // Sets white cross solved when completed
  useEffect(() => {
    let allWhiteCrossPieces = [
      whiteCrossBluePiece,
      whiteCrossGreenPiece,
      whiteCrossOrangePiece,
      whiteCrossRedPiece,
    ];

    let counter = 0;
    allWhiteCrossPieces.forEach((piece) => {
      if (piece === true) {
        counter += 1;
      }
    });
    setWhiteSolvedPiecesCount(counter);
    if (counter === 4) {
      dispatch(guideActions.setWhiteCrossSolved(true));
    }
  }, [
    whiteCrossBluePiece,
    whiteCrossGreenPiece,
    whiteCrossOrangePiece,
    whiteCrossRedPiece,
    dispatch,
  ]);

  // Resets guide if move breaks the daisy outside of fixing cross
  useEffect(() => {
    if (daisySolved && ((whiteSolvedPiecesCount + petalCount) < 3)) {
      dispatch(guideActions.setDaisySolved(false));
      dispatch(guideActions.setErrorMsg(
        "Oh no, it looks like you've gone astray from the guide! Please close the guide or click the reset button to return to the previous lesson"
      ))
    }
  },[daisySolved, whiteSolvedPiecesCount, petalCount, dispatch]);

  // Array of edge pieces needing to move
  const whiteEdgePair1 = [
    useSelector((state) => state.faces.segmentState.btm),
    useSelector((state) => state.faces.segmentState.ybm),
    "blue",
  ];
  const whiteEdgePair2 = [
    useSelector((state) => state.faces.segmentState.otm),
    useSelector((state) => state.faces.segmentState.ycl),
    "orange",
  ];
  const whiteEdgePair3 = [
    useSelector((state) => state.faces.segmentState.gtm),
    useSelector((state) => state.faces.segmentState.ytm),
    "green",
  ];
  const whiteEdgePair4 = [
    useSelector((state) => state.faces.segmentState.rtm),
    useSelector((state) => state.faces.segmentState.ycr),
    "red",
  ];

  const allWhiteEdges = [
    whiteEdgePair1,
    whiteEdgePair2,
    whiteEdgePair3,
    whiteEdgePair4,
  ];

  // Moves pieces from daisy position to make white cross 
  const checkEdgeMatchesCenter = () => {
    if(whiteCrossSolved){
      return
    }
    let matched;
    allWhiteEdges.forEach((edge) => {
      if (edge[0] === edge[2] && edge[1] === "white") {
        const faceInitial = edge[2].charAt(0)
        props.setValuesForMultiStageCommand(
          true,
          moveCounter,
          [
            `The ${edge[2]} face's center piece matches the daisys piece adjacent color, so turn this face 180\u00b0`,
            `Turn the ${edge[2]} face another 90\u00b0`
          ],
          [
            `${faceInitial}`,
            `${faceInitial}`
          ]
          );
          matched = true;
      }
      if (!matched) {
        dispatch(
          guideActions.setCommand(
            "None of the daisy's adjacent pieces match the center piece below it, so turn the top (U) untill one matches!"
          )
        );
      }
    });
  };

  const whiteCrossSolver = () => {
    if (!props.multiStageCommand) {
      // checks if white piece other face matches center piece
      checkEdgeMatchesCenter()
    }
    if (props.multiStageCommand) {
      // checks if any commands had two parts
      props.multiStageCommandSetter();
    }
  }

  // Runs the solver if white cross not solved
  useEffect(() => {
    if (daisySolved && !whiteCrossSolved) {
        whiteCrossSolver();
    }
  });

};

export default WhiteCrossSolver;
