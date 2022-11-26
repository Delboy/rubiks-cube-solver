import { useState } from "react";
import ButtonLayout from "../Instructions/ButtonLayout";
import CubeNotation from "../Instructions/CubeNotation";
import classes from "./GuideBox.module.css";

const GuideBox = (props) => {
  const [guideVisible, setGuideVisible] = useState(false);
  const [messageNo, setMessageNo] = useState(0);
  const [showButtonLayout, setShowButtonLayout] = useState(false)
  const [showCubeNotation, setShowCubeNotation] = useState(false)

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

  const showCubeNotationHandler = () => {
    setShowCubeNotation(prevState => !prevState) 
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
        <p>
        Make sure you're familiar with the following:
        </p>
        <div className={classes.list}>
          <ul className={classes.guideList}>
            
            <li className={classes.guideListItem} onClick={showCubeNotationHandler}>Cube Notation</li>
            {showCubeNotation && <CubeNotation onCloseBtnClick={showCubeNotationHandler} />}

            <li className={classes.guideListItem} onClick={showButtonLayoutHandler}>Button Layout</li>
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
