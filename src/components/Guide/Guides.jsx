import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { guideActions } from "../../orientation";

import Introduction from "./Introduction";
import DaisyGuide from "./DaisyGuide";
import WhiteCrossGuide from "./WhiteCrossGuide";

const Guides = (props) => {
  const [currentGuide, setCurrentGuide] = useState(0);
  const [currentGuideMsgLength, setCurrentGuideMsgLength] = useState(0);

  const cubeFilled = useSelector(state => state.faces.allSegmentsFilled)

  const dispatch = useDispatch()

  const msgLengthHandler = (messageNo) => {
    setCurrentGuideMsgLength(messageNo);
  };

  const updateGuideHandler = (direction) => {
    switch (direction) {
      case "next":
        setCurrentGuide((prevState) => (prevState += 1));
        props.clearMessageNo();
        return;
      case "prev":
        setCurrentGuide((prevState) => (prevState -= 1));
        props.clearMessageNo(currentGuideMsgLength);
        return;
      default:
        return;
    }
  };

  const setCommandHandler = (bool) => {
    dispatch(guideActions.setCommandVisible(bool))
  }

  useEffect(() => {
    if(!cubeFilled){
      setCurrentGuide(0)
      props.clearMessageNo()
      props.onNextDisable(true)
      props.onBackDisable(true)
    } else {
      if (currentGuide === 0 && props.messageNo === 0) {
        props.onBackDisable(true);
      } else {
        props.onBackDisable(false)
      }
  
      if (currentGuide === 1 && props.messageNo === 1) {
        props.onNextDisable(true);
      } else {
        props.onNextDisable(false);
      }

      if(currentGuide === 1 && props.messageNo === 2){
        props.onBackDisable(true)
      } else {
        props.onBackDisable(false)
      }

      if(currentGuide === 2 && props.messageNo === 0){
        props.onBackDisable(true)
      } else {
        props.onBackDisable(false)
      }
    }
  }, [currentGuide, cubeFilled, props.messageNo, props]);

  return (
    <>
      {currentGuide === 0 ? (
        <Introduction
          messageNo={props.messageNo}
          updateGuide={updateGuideHandler}
          setCurrentGuideMsgLength={msgLengthHandler}
          onNextDisable={props.onNextDisable}
          onCommandVisible={setCommandHandler}
        />
      ) : null}
      {currentGuide === 1 ? (
        <DaisyGuide
          messageNo={props.messageNo}
          updateGuide={updateGuideHandler}
          setCurrentGuideMsgLength={msgLengthHandler}
          onCommandVisible={setCommandHandler}
          command={props.command}
        />
      ) : null}
      {currentGuide === 2 ? (
        <WhiteCrossGuide messageNo={props.messageNo} onCommandVisible={setCommandHandler}/>
      ) : null}
    </>
  );
};

export default Guides;
