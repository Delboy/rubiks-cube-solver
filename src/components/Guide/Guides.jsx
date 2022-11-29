import { useEffect, useState } from "react";

import Introduction from "./Introduction";
import DaisyGuide from "./DaisyGuide";

const Guides = (props) => {
  const [currentGuide, setCurrentGuide] = useState(0);
  const [currentGuideMsgLength, setCurrentGuideMsgLength] = useState(0);

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
    if (currentGuide === 0 && props.messageNo === 1) {
      props.onBackEnable(true);
    }

    if (currentGuide === 1 && props.messageNo === 1) {
      props.onNextDisable(true);
    } else {
      props.onNextDisable(false);
    }
  }, [currentGuide, props.messageNo, props]);

  return (
    <>
      {currentGuide === 0 ? (
        <Introduction
          messageNo={props.messageNo}
          updateGuide={updateGuideHandler}
          setCurrentGuideMsgLength={msgLengthHandler}
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
