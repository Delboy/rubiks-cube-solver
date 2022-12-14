import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { guideActions } from "../../orientation";

import DaisySolver from "./DaisySolver";
import WhiteCrossSolver from "./WhiteCross.Solver";

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
    </>
  );
};

export default Solvers;
