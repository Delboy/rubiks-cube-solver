import { useState } from "react";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

import classes from "./GuideBox.module.css";

const GuideBox = (props) => {
  const [guideVisible, setGuideVisible] = useState(false);

  const toggleGuideHandler = () => {
    setGuideVisible((prevState) => !prevState);
  };

  return (
    <>
      {!guideVisible && (
        <button className={classes.button} onClick={toggleGuideHandler}>
          Start Guide
        </button>
      )}
      {guideVisible && (
        <div className={classes.box}>
          <button className={classes.exitButton} onClick={toggleGuideHandler}>
            x
          </button>
          <p>{props.command}</p>
          <div className={classes.guideArea}></div>
        </div>
      )}
    </>
  );
};

export default GuideBox;
