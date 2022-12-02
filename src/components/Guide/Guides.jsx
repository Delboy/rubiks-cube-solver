import { useEffect, useState } from "react";

import Introduction from "./Introduction";
import DaisyGuide from "./DaisyGuide";
import { useSelector } from "react-redux";

const Guides = (props) => {
  const [currentGuide, setCurrentGuide] = useState(0);
  const [currentGuideMsgLength, setCurrentGuideMsgLength] = useState(0);

  const cubeFilled = useSelector(state => state.faces.allSegmentsFilled)
  
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
        />
      ) : null}
      {currentGuide === 1 ? (
        <DaisyGuide
          messageNo={props.messageNo}
          updateGuide={updateGuideHandler}
          command={props.command}
          setMessagesLength={props.setMessagesLength}
        />
      ) : null}
    </>
  );
};

export default Guides;
