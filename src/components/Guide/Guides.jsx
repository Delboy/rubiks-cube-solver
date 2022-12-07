import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { guideActions } from "../../orientation";

import Introduction from "./Introduction";
import DaisyGuide from "./DaisyGuide";
import WhiteCrossGuide from "./WhiteCrossGuide";

const Guides = (props) => {
  const [currentGuideMsgLength, setCurrentGuideMsgLength] = useState(0);

  const cubeFilled = useSelector(state => state.faces.allSegmentsFilled)

  const msgNo = useSelector(state => state.guide.msgNo)
  const guideNo = useSelector(state => state.guide.guideNo)

  const dispatch = useDispatch()

  const msgLengthHandler = (messageNo) => {
    setCurrentGuideMsgLength(messageNo);
  };

  const updateGuideHandler = (direction) => {
    switch (direction) {
      case "next":
        dispatch(guideActions.setGuideNumber(guideNo + 1))
        props.clearMessageNo();
        return;
      case "prev":
        dispatch(guideActions.setGuideNumber(guideNo - 1))
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
      dispatch(guideActions.setGuideNumber(0))
      props.clearMessageNo()
      props.onNextDisable(true)
      props.onBackDisable(true)
    } else {
      if (guideNo === 0 && msgNo === 0) {
        props.onBackDisable(true);
      } else {
        props.onBackDisable(false)
      }
  
      if (guideNo === 1 && msgNo === 1) {
        props.onNextDisable(true);
      } else {
        props.onNextDisable(false);
      }

      if(guideNo === 1 && msgNo === 2){
        props.onBackDisable(true)
      } else {
        props.onBackDisable(false)
      }

      if(guideNo === 2 && msgNo === 0){
        props.onBackDisable(true)
      } else {
        props.onBackDisable(false)
      }
    }
  }, [guideNo, cubeFilled, msgNo, props, dispatch]);

  return (
    <>
      {guideNo === 0 ? (
        <Introduction
          updateGuide={updateGuideHandler}
          setCurrentGuideMsgLength={msgLengthHandler}
          onNextDisable={props.onNextDisable}
          onCommandVisible={setCommandHandler}
        />
      ) : null}
      {guideNo === 1 ? (
        <DaisyGuide
          updateGuide={updateGuideHandler}
          setCurrentGuideMsgLength={msgLengthHandler}
          onCommandVisible={setCommandHandler}
                 />
      ) : null}
      {guideNo === 2 ? (
        <WhiteCrossGuide  onCommandVisible={setCommandHandler} updateGuide={updateGuideHandler} />
      ) : null}
    </>
  );
};

export default Guides;
