// start

import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import { guideActions } from "../../orientation";

import DaisySolver from "./DaisySolver";
import WhiteCrossSolver from "./WhiteCross.Solver";
import FirstLayerSolver from "./FirstLayerSolver";

const Solvers = (props) => {
  const dispatch = useDispatch();

  // Move Counter
  const moveCounter = useSelector((state) => state.faces.moveCounter);
  // Set Move number
  const [savedMoveCount, setSavedMoveCount] = useState(null);
  // Two stage command bool
  const [twoStageCommand, setTwoStageCommand] = useState(false);
  // Second Command string
  const [secondCommand, setSecondCommand] = useState(null);

  // multistage command
  const [multiStageCommand, setMultiStageCommand] = useState(false);
  // multstage counter
  const [multiStageCounter, setMultiStageCounter] = useState(0);
  // messages array
  const [messagesArray, setMessagesArray] = useState([]);

  // algo array
  const [algo, setAlgo] = useState([]);
  // last move made
  const lastMove = useSelector((state) => state.faces.lastMove);

  // error
  const [error, setError] = useState(false)
  const [errorAlgo, setErrorAlgo] = useState([])
  const [errorMessages, setErrorMessages] = useState([])

  const setValuesForTwoStageCommand = (
    twoStageCommandBool,
    savedMoveCount,
    secondCommand
  ) => {
    setTwoStageCommand(twoStageCommandBool);
    setSavedMoveCount(savedMoveCount);
    setSecondCommand(secondCommand);
  };

  // Runs if a command has two parts
  const checkTwoStageCommand = useCallback(() => {
    if (moveCounter === savedMoveCount + 1) {
      dispatch(guideActions.setCommand(secondCommand));
    }
    if (moveCounter === savedMoveCount + 2) {
      setTwoStageCommand(false);
    }
  }, [moveCounter, savedMoveCount, secondCommand, dispatch]);

  // Sets values for multistage function to use
  const setValuesForMultiStageCommand = (
    multiStageCommandBool,
    currentMoveCount,
    messages,
    algorithm
  ) => {
    setSavedMoveCount(currentMoveCount);
    setMessagesArray(messages);
    setAlgo(algorithm);

    dispatch(guideActions.setCommand(messages[0]));

    setMultiStageCommand(multiStageCommandBool);

    multiStageCommandSetter();
  };

  const multiStageCommandSetter = useCallback(() => {
    if (moveCounter === savedMoveCount + (multiStageCounter + 1)) {
      // If the move made is the move expected
      if (lastMove === algo[multiStageCounter]) {
        dispatch(guideActions.setCommand(messagesArray[multiStageCounter + 1]));
        setMultiStageCounter((prevState) => (prevState += 1));
        if (moveCounter === savedMoveCount + messagesArray.length) {
          setMultiStageCounter(0);
          setMultiStageCommand(false);
        }
      }
      // If the move made is not what was expected
      if (lastMove !== algo[multiStageCounter]) {
        
        let wrongMove = lastMove;
        let reverseOfWrongMove;
        if (wrongMove.includes("p")) {
          reverseOfWrongMove = wrongMove.charAt(0);
        } else {
          reverseOfWrongMove = wrongMove + "p";
        }
        const currentArray = algo;
        const newAlgo = currentArray.slice(multiStageCounter);
        newAlgo.unshift(reverseOfWrongMove);
        const firstMessage = `Oh no, it looks like you performed the wrong move! Reverse this move by performing ${reverseOfWrongMove}`;
        const currentMessages = messagesArray;
        let newMessages;
       
        newMessages = currentMessages.slice(multiStageCounter);
        
        newMessages.unshift(firstMessage);

        setErrorMessages(newMessages)
        setErrorAlgo(newAlgo)
        setError(true)
        
      }
    } 
  },[algo, moveCounter, lastMove, dispatch, messagesArray, multiStageCounter, savedMoveCount ]);

  useEffect(() => {
    if(error){
      setAlgo(errorAlgo)
      setMessagesArray(errorMessages)
      setSavedMoveCount(moveCounter)
      dispatch(guideActions.setCommand(errorMessages[0]))
      setError(false)
      setMultiStageCounter(0)
      multiStageCommandSetter()
    }
  },[error,errorAlgo, errorMessages, moveCounter, dispatch, multiStageCommandSetter])

  return (
    <>
      <DaisySolver
        checkTwoStageCommand={checkTwoStageCommand}
        setValuesForTwoStageCommand={setValuesForTwoStageCommand}
        twoStageCommand={twoStageCommand}
      />
      <WhiteCrossSolver
        checkTwoStageCommand={checkTwoStageCommand}
        setValuesForTwoStageCommand={setValuesForTwoStageCommand}
        twoStageCommand={twoStageCommand}
      />
      <FirstLayerSolver
        checkTwoStageCommand={checkTwoStageCommand}
        setValuesForTwoStageCommand={setValuesForTwoStageCommand}
        twoStageCommand={twoStageCommand}
        multiStageCommandSetter={multiStageCommandSetter}
        setValuesForMultiStageCommand={setValuesForMultiStageCommand}
        multiStageCommand={multiStageCommand}
      />
    </>
  );
};

export default Solvers;
