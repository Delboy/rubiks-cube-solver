import { useState } from "react";
import ButtonLayout from "../Instructions/ButtonLayout";
import CubeNotation from "../Instructions/CubeNotation";

import classes from "./GuideBox.module.css";

const GuideBox = (props) => {
  const [guideVisible, setGuideVisible] = useState(false);
  const [messageNo, setMessageNo] = useState(0);
  const [showButtonLayout, setShowButtonLayout] = useState(false);
  const [showCubeNotation, setShowCubeNotation] = useState(false);

  // const messages = Messages;

  const toggleGuideHandler = () => {
    setGuideVisible((prevState) => !prevState);
  };

  const buttonHandler = (e) => {
    if(e.target.value === 'next'){
      setMessageNo((prevState) => (prevState += 1));
    }
    if(e.target.value === 'back'){
      setMessageNo((prevState) => (prevState -= 1));
    }
  };

  const showButtonLayoutHandler = () => {
    setShowButtonLayout((prevState) => !prevState);
  };

  const showCubeNotationHandler = () => {
    setShowCubeNotation((prevState) => !prevState);
  };

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
        <p>Make sure you're familiar with the following:</p>
        <div className={classes.list}>
          <ul className={classes.guideList}>
            <li
              className={classes.guideListItem}
              onClick={showCubeNotationHandler}
            >
              Cube Notation
            </li>
            {showCubeNotation && (
              <CubeNotation onCloseBtnClick={showCubeNotationHandler} />
            )}

            <li
              className={classes.guideListItem}
              onClick={showButtonLayoutHandler}
            >
              Button Layout
            </li>
            {showButtonLayout && (
              <ButtonLayout onCloseBtnClick={showButtonLayoutHandler} />
            )}
          </ul>
        </div>
      </div>,
    ],
    [
      <p>
        Now that you understand cube notation and how to rotate the cube lets
        talk about the cube itself.
      </p>,
    ],
    [
      <>
        <p>
          First off we should notice that the center pieces never move! This
          dictates what face will end up what color.
        </p>
        <p>We'll also use this as reference.</p>
        <p>
          The <span className={classes.bold}>blue face</span> for example will
          be in reference to the side with a blue center piece.
        </p>
      </>,
    ],
    [
      <>
      <p>Apart from the center pieces there are two other types.</p>
      <p><span className={classes.bold}>Edge Pieces</span> and <span className={classes.bold}>Corner Pieces</span>.</p>
      <p><span className={classes.bold}>Edge Pieces</span> have two faces and sit between the <span className={classes.bold}>Corner Pieces</span> which have three.</p>
      </>
    ],
    [
      <p>We will always hold the cube with the white face on the bottom which in turn dictates that the yellow face will be on top.</p>
    ],
    [
      <div className={classes.steps}>
        <p>The cube will be solved in 7 steps.</p>
        <p>These will be:</p>
        <ol>
          <li>Creating the daisy</li>
          <li>Creating the white cross</li>
          <li>Solving the first layer</li>
          <li>Solving the middle layer</li>
          <li>Creating the yellow cross</li>
          <li>Solving the yellow face</li>
          <li>Solving the final layer</li>
        </ol>
      </div>
    ],
    [
      <div className={classes.daisyBox}>
        <p>So lets start with step one.</p>
        <p><span className={classes.bold}>Creating the daisy</span></p>
        <p>We will begin by trying to create a daisy on the top layer. This will look like this.</p>
        <div className={classes.scene}>
        <div className={classes.daisyFace}>
          <div></div>
          <div className={classes.white}></div>
          <div></div>
          <div className={classes.white}></div>
          <div className={classes.yellow}></div>
          <div className={classes.white}></div>
          <div></div>
          <div className={classes.white}></div>
          <div></div>
        </div>

        </div>
        <p>A yellow center piece surrounded by all white edge pieces.</p>
        <p>It does not matter what colour the corner pieces are at this state.</p>
        <p>Try closing the guide and achieving this alone or press next to continue the guide of what to do</p>
      </div>
    ],
    [
      <p>{props.command}</p>
    ]
  ];

  return (
    <>
      {!guideVisible && (
        <button className={classes.startBtn} onClick={toggleGuideHandler}>
          Open Guide
        </button>
      )}
      {guideVisible && (
        <div className={classes.box}>
          <button className={classes.exitButton} onClick={toggleGuideHandler}>
            X
          </button>

          <div className={classes.guideArea}>{messages[messageNo]}</div>
          <div className={classes.buttons}>
            <button onClick={buttonHandler} className={classes.guideBtn} value='back'>
              Back
            </button>
            <button onClick={buttonHandler} className={classes.guideBtn} value='next'>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GuideBox;
