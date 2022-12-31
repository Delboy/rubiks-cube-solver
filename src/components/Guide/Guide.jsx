import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guideActions } from "../../orientation";

import SkipGuideBtn from "../UI/SkipGuideBtn";

import classes from "./Guide.module.css";

const Guide = (props) => {
  
  const command = useSelector((state) => state.guide.command);
  const stepNo = useSelector(state => state.guide.msgNo)

  const dispatch = useDispatch()

  const commandKey = props.steps.length + 1
  const lastKey = commandKey + 1

  const commandMsg = [<p key={commandKey} value='command'>{command}</p>]

  const completeMsg = [
    <div key={lastKey}>
      <p>Well done!</p>
      <p>You've completed the {props.guideName}!</p>
      <p>Lets move on to step {props.stepNumber + 1}</p>
    </div>,
  ]
  
  const allSteps = props.steps.concat(commandMsg).concat(completeMsg)
  
  // Once guide is solved move to the next message
  useEffect(() => {
    if (props.solvedBool) {
      dispatch(guideActions.setMsgNumber(lastKey))
    }
  }, [props.solvedBool, lastKey, dispatch]);

  useEffect(() => {
    if (stepNo === allSteps.length) {
      props.setCurrentGuideMsgLength(allSteps.length);
      props.updateGuide("next");
    }
    if (stepNo === -1) {
      props.updateGuide("prev");
    }
    if (stepNo === commandKey - 1) {
      props.onCommandVisible(true);
    } else {
      props.onCommandVisible(false);
    }
  }, [stepNo, props, allSteps.length, commandKey]);
  return (
  <>
  <div className={classes.guideArea}>{allSteps[stepNo]}</div>
    <SkipGuideBtn commandMsgIndex={commandKey - 1} />
   </>
  )
};

export default Guide;
