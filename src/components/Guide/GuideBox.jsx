import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Guides from "./Guides";

import classes from "./GuideBox.module.css";
import { guideActions } from "../../orientation";

const GuideBox = () => {
  const [guideVisible, setGuideVisible] = useState(false);
  const [disableNextBtn, setDisableNextBtn] = useState(false);
  const [disableBackBtn, setDisableBackBtn] = useState(false);

  const msgNo = useSelector(state => state.guide.msgNo)

  const dispatch = useDispatch()

  const disableBackBtnHandler = (bool) => {
    setDisableBackBtn(bool);
  };

  const disableNextBtnHandler = (bool) => {
    setDisableNextBtn(bool);
  };

  const toggleGuideHandler = () => {
    setGuideVisible((prevState) => !prevState);
  };

  const buttonHandler = (e) => {
    if (e.target.value === "next") {
      dispatch(guideActions.setMsgNumber(msgNo + 1))
    }
    if (e.target.value === "back") {
      dispatch(guideActions.setMsgNumber(msgNo - 1))
    }
  };

  // If guide increases, clear message number to zero
  // If guide decreases, take the message length of previous guide, and set to one from the end
  const clearMessageNo = (prev) => {
    if (prev) {
      dispatch(guideActions.setMsgNumber(prev - 1))
    } else {
      dispatch(guideActions.setMsgNumber(0))
    }
  };

  // If the guide is showing commands, change the poisitoning of the box
  const commandVisible = useSelector((state) => state.guide.commandVisible);
  let style;
  if (commandVisible) {
    style = { top: "25vh" };
  }

  return (
    <>
      <div className={classes.guideBtnContainer}>
        {!guideVisible && (
          <button className={classes.startBtn} onClick={toggleGuideHandler}>
            Open Guide
          </button>
        )}
      </div>
      {guideVisible && (
        <div className={classes.box} style={style}>
          <button className={classes.exitButton} onClick={toggleGuideHandler}>
            X
          </button>
          <Guides
            clearMessageNo={clearMessageNo}
            onBackDisable={disableBackBtnHandler}
            onNextDisable={disableNextBtnHandler}
          />
          <div className={classes.buttons}>
            <button
              onClick={buttonHandler}
              className={classes.guideBtn}
              value="back"
              disabled={disableBackBtn}
            >
              Back
            </button>
            <button
              onClick={buttonHandler}
              className={classes.guideBtn}
              value="next"
              disabled={disableNextBtn}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GuideBox;
