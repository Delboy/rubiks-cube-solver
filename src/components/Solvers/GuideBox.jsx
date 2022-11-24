import { useState } from "react";
import ButtonLayout from "./ButtonLayout";
import classes from "./GuideBox.module.css";

const GuideBox = (props) => {
  const [guideVisible, setGuideVisible] = useState(false);
  const [messageNo, setMessageNo] = useState(0);
  const [showButtonLayout, setShowButtonLayout] = useState(false)

  // const messages = Messages;

  const toggleGuideHandler = () => {
    setGuideVisible((prevState) => !prevState);
  };

  const buttonHandler = () => {
    setMessageNo((prevState) => (prevState += 1));
  };

  const showButtonLayoutHandler = () => {
    setShowButtonLayout(prevState => !prevState) 
  }

  const messages = [
    [
      <div>
        <p>Hello! And welcome to the Rubiks Cube Solver beginners guide!</p>
      </div>,
    ],
    [
      <div>
        <p>
          To begin there's a couple things you need to know before we get
          started.
        </p>
        <div className={classes.list}>
          <ul>
            <li>Cube Notation</li>
            <li onClick={showButtonLayoutHandler}>Button Layout</li>
            {showButtonLayout && <ButtonLayout onCloseBtnClick={showButtonLayoutHandler} />}
          </ul>
        </div>
      </div>,
    ],
  ];

  return (
    <>
      {!guideVisible && (
        <button className={classes.startBtn} onClick={toggleGuideHandler}>
          Start Guide
        </button>
      )}
      {guideVisible && (
        <div className={classes.box}>
          <button className={classes.exitButton} onClick={toggleGuideHandler}>
            X
          </button>

          <div className={classes.guideArea}>
            {messages[messageNo]}
          </div>
          <div className={classes.buttons}>
            <button onClick={buttonHandler} className={classes.nextBtn}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GuideBox;
