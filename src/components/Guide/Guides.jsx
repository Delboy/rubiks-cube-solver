import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { guideActions } from "../../orientation";

import Introduction from "./Introduction";

import Guide from "./Guide";

import { daisySteps } from "./Steps/DaisySteps";
import { whiteCrossSteps } from "./Steps/WhiteCrossSteps";
import { firstLayerSteps } from "./Steps/FirstLayerSteps";

const Guides = (props) => {
  const [currentGuideMsgLength, setCurrentGuideMsgLength] = useState(0);

  const cubeFilled = useSelector((state) => state.faces.allSegmentsFilled);

  const msgNo = useSelector((state) => state.guide.msgNo);
  const guideNo = useSelector((state) => state.guide.guideNo);

  // Solved Staues
  const daisySolved = useSelector((state) => state.guide.daisySolved);
  const whiteCrossSolved = useSelector((state) => state.guide.whiteCrossSolved);
  const firstLayerSolved = useSelector((state) => state.guide.firstLayerSolved);

  const dispatch = useDispatch();

  const msgLengthHandler = (messageNo) => {
    setCurrentGuideMsgLength(messageNo);
  };

  const updateGuideHandler = (direction) => {
    switch (direction) {
      case "next":
        dispatch(guideActions.setGuideNumber(guideNo + 1));
        props.clearMessageNo();
        return;
      case "prev":
        dispatch(guideActions.setGuideNumber(guideNo - 1));
        props.clearMessageNo(currentGuideMsgLength);
        return;
      default:
        return;
    }
  };

  const setCommandHandler = (bool) => {
    dispatch(guideActions.setCommandVisible(bool));
  };

  const skipGuideHandler = (messagesLength) => {
    updateGuideHandler("next");
    setCurrentGuideMsgLength(messagesLength);
  };

  useEffect(() => {
    if (!cubeFilled) {
      dispatch(guideActions.setGuideNumber(0));
      props.clearMessageNo();
      props.onNextDisable(true);
      props.onBackDisable(true);
    } else {
      if (
        (guideNo === 0 && msgNo === 0) ||
        (guideNo === 1 && msgNo === 2) ||
        (guideNo === 2 && msgNo === 0) ||
        (guideNo === 2 && msgNo === 3) ||
        (guideNo === 3 && msgNo === 7)
      ) {
        props.onBackDisable(true);
      } else {
        props.onBackDisable(false);
      }

      if (
        (guideNo === 1 && msgNo === 1) ||
        (guideNo === 2 && msgNo === 2) ||
        (guideNo === 3 && msgNo === 6)
      ) {
        props.onNextDisable(true);
      } else {
        props.onNextDisable(false);
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
        <Guide
          steps={daisySteps}
          solvedBool={daisySolved}
          guideName={"Daisy"}
          stepNo={guideNo + 1}
          updateGuide={updateGuideHandler}
          setCurrentGuideMsgLength={msgLengthHandler}
          onCommandVisible={setCommandHandler}
          skipGuideHandler={skipGuideHandler}
        />
      ) : null}
      {guideNo === 2 ? (
        <Guide
          steps={whiteCrossSteps}
          solvedBool={whiteCrossSolved}
          guideName={"White Cross"}
          stepNo={guideNo + 1}
          updateGuide={updateGuideHandler}
          setCurrentGuideMsgLength={msgLengthHandler}
          onCommandVisible={setCommandHandler}
          skipGuideHandler={skipGuideHandler}
        />
      )  : null}
      {guideNo === 3 ? (
        <Guide
          steps={firstLayerSteps}
          solvedBool={firstLayerSolved}
          guideName={"First Layer"}
          stepNo={guideNo + 1}
          updateGuide={updateGuideHandler}
          setCurrentGuideMsgLength={msgLengthHandler}
          onCommandVisible={setCommandHandler}
          skipGuideHandler={skipGuideHandler}
        />
      ) : null}
    </>
  );
};

export default Guides;
