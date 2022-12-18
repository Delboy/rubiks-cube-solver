import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { guideActions } from "../../orientation";

const FirstLayerSolver = (props) => {
  const daisySolved = useSelector((state) => state.guide.daisySolved);
  const whiteCrossSolved = useSelector((state) => state.guide.whiteCrossSolved);
  const firstLayerSolved = useSelector((state) => state.guide.firstLayerSolved);

  const dispatch = useDispatch();

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

  const topLayerFacingOut = useCallback(() => {
    console.log('top face layer running')
    const topCorners = [
      {
        face: 'blue',
        edgeOne: blueLeftCorner,
        edgeTwo: blueRightCorner,
        edgeOnePair: orangeRightCorner,
        edgeTwoPair: redLeftCorner,
      },
      {
        face: 'orange',
        edgeOne: orangeLeftCorner,
        edgeTwo: orangeRightCorner,
        edgeOnePair: greenRightCorner,
        edgeTwoPair: blueLeftCorner,
      },
      {
        face: 'green',
        edgeOne: greenLeftCorner,
        edgeTwo: greenRightCorner,
        edgeOnePair: redRightCorner,
        edgeTwoPair: orangeLeftCorner,
      },
      {
        face: 'red',
        edgeOne: redLeftCorner,
        edgeTwo: redRightCorner,
        edgeOnePair: blueRightCorner,
        edgeTwoPair: greenLeftCorner,
      },
      
    ];

    let faceOrder = ['blue', 'orange', 'green', 'red']
    topCorners.forEach((corner) => {
        let faceWithWhiteIndex = faceOrder.indexOf(corner.face)
      if (corner.edgeOne === "white") {
        let faceItsOn = faceWithWhiteIndex + 1
        if(faceItsOn === 4){
            faceItsOn = 0
        }
        
        let indexOfWhereItNeedsToBe = faceOrder.indexOf(corner.edgeOnePair)

        let ammoutOfMoves = faceItsOn - indexOfWhereItNeedsToBe
        if(ammoutOfMoves === -3){
            ammoutOfMoves = 1
        }
        let move = "anticlockwise"
        if(ammoutOfMoves < 0){
            move = "clockwise"
            ammoutOfMoves = ammoutOfMoves * -1
        }
        
        console.log('left',corner.face, move, ammoutOfMoves) 
        dispatch(guideActions.setCommand(
            `The ${corner.face} face has a white edge in the top left corner, so match up it's adjacent color ${corner.edgeOnePair} to the same color center by turning the top ${move} ${ammoutOfMoves} times!`
        ))  
        
        // send commands off to multi stage solver function
        
      }
      if (corner.edgeTwo === "white") {
        let faceItsOn = faceWithWhiteIndex - 1
        if(faceItsOn === -1){
            faceItsOn = 3
        } 
        
        let indexOfWhereItNeedsToBe = faceOrder.indexOf(corner.edgeTwoPair) 
        let ammoutOfMoves = faceItsOn - indexOfWhereItNeedsToBe
        
        if(ammoutOfMoves === -3){
            ammoutOfMoves = 1
        }
        let move = "anticlockwise"
        if(ammoutOfMoves < 0){
            move = "clockwise"
            ammoutOfMoves = ammoutOfMoves * -1
        }
        
        console.log('right',corner.face, move, ammoutOfMoves)   
        dispatch(guideActions.setCommand(
            `The ${corner.face} face has a white edge in the top right corner, so match up it's adjacent color ${corner.edgeTwoPair} to the same color center by turning the top ${move} ${ammoutOfMoves} times!`
        ))   

        // send commands off to multi stage solver function
        
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
    dispatch
   
  ]);

  const firstLayerSolver = useCallback(() => {
    
    if (!props.twoStageCommand) {
      console.log('no two stage')
      // checks if white corners facing out in top layer
      topLayerFacingOut();
    }
    if (props.twoStageCommand) {
        console.log('two stage')
      // checks if any commands had two parts
      props.checkTwoStageCommand();
    }
  }, [topLayerFacingOut, props]);

  // Runs the solver if white cross not solved
  useEffect(() => {
    if (daisySolved && whiteCrossSolved && !firstLayerSolved) {
      console.log("useEffect for FLS");
      firstLayerSolver();
    }
  }, [daisySolved, whiteCrossSolved, firstLayerSolved, firstLayerSolver]);
};

export default FirstLayerSolver;
