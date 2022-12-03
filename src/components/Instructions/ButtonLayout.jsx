import { useDispatch } from "react-redux";
import { guideActions } from "../../orientation";

import classes from "./ButtonLayout.module.css";

const ButtonLayout = (props) => {

  const dispatch = useDispatch()

  const onCloseHandler = () => {
     dispatch(guideActions.toggleInstruction('buttonLayout'))
  }

  return (
    <>
      <div className={classes.overlay} onClick={onCloseHandler}></div>
      <div className={classes.buttonLayout} onClick={onCloseHandler}>
        <p className={classes.exitBtn}>
          X
        </p>
        <p className={classes.bold}>BUTTON LAYOUT</p>
        <div className={classes.columns}>
          <div className={classes.leftColumn}>
            <ul className={classes.layoutList}>
              <li className={classes.bold}>KEY</li>
              <hr className={classes.rule}></hr>
              <li>W</li>
              <li>A</li>
              <li>S</li>
              <li>D</li>
              <li>{"\u2191"}</li>
              <li>{"\u2190"}</li>
              <li>{"\u2193"}</li>
              <li>{"\u2192"}</li>
              <li>Q</li>
              <li>E</li>
              <li>SHIFT</li>
            </ul>
          </div>
          <div className={classes.rightColumn}>
            <ul className={classes.layoutList}>
              <li className={classes.bold}>COMMAND</li>
              <hr className={classes.rule}></hr>
              <li>Rotate Cube Up</li>
              <li>Rotate Cube Left</li>
              <li>Rotate Cube Down</li>
              <li>Rotate Cube Right</li>
              <li>U</li>
              <li>L</li>
              <li>D</li>
              <li>R</li>
              <li>B</li>
              <li>F</li>
              <li>Hold down to perform Prime</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ButtonLayout;
