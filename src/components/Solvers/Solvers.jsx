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
  const [error, setError] = useState(false);
  const [errorAlgo, setErrorAlgo] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  // const [wedgeCommand, setWedgeCommand] = useState();
  const [dynamicMessage, setDynamicMessage] = useState(false);
  const [moveNeeded, setMoveNeeded] = useState();

  // faces
  const frontWedge = useSelector((state) => state.faces.frontWedge);
  const backWedge = useSelector((state) => state.faces.backWedge);
  const leftWedge = useSelector((state) => state.faces.leftWedge);
  const rightWedge = useSelector((state) => state.faces.rightWedge);
  const topWedge = useSelector((state) => state.faces.topWedge);
  const bottomWedge = useSelector((state) => state.faces.bottomWedge);

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


  // Takes an input of what wedge is needed to move and returns the command needed
  const findSideToMove = useCallback((moveNeeded) => {
    const initialOfMoveNeeded = moveNeeded.charAt(0);
    let wedgeCommandString;
      switch (initialOfMoveNeeded) {
        case frontWedge:
          wedgeCommandString = "F";
          break;
        case backWedge:
          wedgeCommandString = "B";
          break;
        case leftWedge:
          wedgeCommandString = "L";
          break;
        case rightWedge:
          wedgeCommandString = "R";
          break;
        case topWedge:
          wedgeCommandString = "U";
          break;
        case bottomWedge:
          wedgeCommandString = "D";
          break;
        default:
          break;
      }

      if (moveNeeded.length === 2) {
        wedgeCommandString = wedgeCommandString + "'";
      }

      return wedgeCommandString
  },[frontWedge, backWedge, leftWedge, rightWedge, topWedge, bottomWedge])

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

  // Sets the command for mulit-staged commands
  const multiStageCommandSetter = useCallback(() => {
    if (moveCounter === savedMoveCount + (multiStageCounter + 1)) {
      setDynamicMessage(false)
      // If the move made is the move expected
      if (lastMove === algo[multiStageCounter]) {
        if (moveCounter === savedMoveCount + messagesArray.length) {
          setMultiStageCounter(0);
          setMultiStageCommand(false);
        } else {
          dispatch(guideActions.setCommand(messagesArray[multiStageCounter + 1]));
          setMultiStageCounter((prevState) => (prevState += 1));
        }
      }
      // If the move made is not what was expected
      if (lastMove !== algo[multiStageCounter]) {
        let reverseOfWrongMove;
        if (lastMove.includes("p")) {
          reverseOfWrongMove = lastMove.charAt(0);
        } else {
          reverseOfWrongMove = lastMove + "p";
        }

        const currentArray = algo;
        const newAlgo = currentArray.slice(multiStageCounter);
        newAlgo.unshift(reverseOfWrongMove);

        setDynamicMessage(true);
        setMoveNeeded(reverseOfWrongMove);

        let wedgeCommand = findSideToMove(reverseOfWrongMove)
        const firstMessage = `Oh no, it looks like you performed the wrong move! Reverse this move by performing ${wedgeCommand}`;
        const currentMessages = messagesArray;
        let newMessages;

        newMessages = currentMessages.slice(multiStageCounter);

        newMessages.unshift(firstMessage);

        setErrorMessages(newMessages);
        setErrorAlgo(newAlgo);
        setError(true);
      }
    }
  }, [
    algo,
    moveCounter,
    lastMove,
    dispatch,
    messagesArray,
    multiStageCounter,
    savedMoveCount,
    findSideToMove
  ]);

  // Sets the commands if the user made a error
  useEffect(() => {
    if (error) {
      setAlgo(errorAlgo);
      setMessagesArray(errorMessages);
      setSavedMoveCount(moveCounter);
      dispatch(guideActions.setCommand(errorMessages[0]));
      setError(false);
      setMultiStageCounter(0);
      multiStageCommandSetter();
    }
  }, [
    error,
    errorAlgo,
    errorMessages,
    moveCounter,
    dispatch,
    multiStageCommandSetter,
  ]);

  // Updates the move needed inside the command in reference to the cube orientation
  useEffect(() => {
    if (dynamicMessage) {
      const newSideToMove = findSideToMove(moveNeeded)

      const command = `Oh no, it looks like you performed the wrong move! Reverse this move by performing ${newSideToMove}`;

      dispatch(guideActions.setCommand(command))
    }
  }, [
    frontWedge,
    backWedge,
    leftWedge,
    rightWedge,
    topWedge,
    bottomWedge,
    moveNeeded,
    error,
    dynamicMessage,
    findSideToMove,
    dispatch
  ]);

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
