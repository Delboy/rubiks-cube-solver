import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Guides from "./Guides";

import classes from "./GuideBox.module.css";

const GuideBox = (props) => {
  const [guideVisible, setGuideVisible] = useState(false);
  const [messageNo, setMessageNo] = useState(0);
  const [disableNextBtn, setDisableNextBtn] = useState(false);
  const [disableBackBtn, setDisableBackBtn] = useState(false);

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
      setMessageNo((prevState) => (prevState += 1));
    }
    if (e.target.value === "back") {
      setMessageNo((prevState) => (prevState -= 1));
    }
  };

  const clearMessageNo = (messageNo) => {
    if (messageNo) {
      setMessageNo(messageNo - 1);
    } else {
      setMessageNo(0);
    }
  };

  // Once daisy is solved move to the next message
  const daisySolved = useSelector((state) => state.guide.daisySolved);
  useEffect(() => {
    if (daisySolved) {
      setMessageNo((prevState) => (prevState += 1))
    }
  }, [daisySolved]);

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
            command={props.command}
            messageNo={messageNo}
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
