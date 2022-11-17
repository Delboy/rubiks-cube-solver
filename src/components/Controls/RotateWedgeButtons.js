import classes from './RotateWedgeButtons.module.css'

const RotateWedgeButtons = (props) => {
  return (
    <div className={classes.buttons}>
      <div className={classes.topBtns}>
        <button onClick={props.onButtonPress} value={"u"}>
          U
        </button>
        <button onClick={props.onButtonPress} value={"u-p"}>
          U'
        </button>
      </div>
      <div className={classes.middleBtns}>
        <button onClick={props.onButtonPress} value={"l"}>
          L
        </button>
        <button onClick={props.onButtonPress} value={"l-p"}>
          L'
        </button>
        <div className={classes.frontAndBackBtns}>
          <button onClick={props.onButtonPress} value={"f"}>
            F
          </button>
          <button onClick={props.onButtonPress} value={"f-p"}>
            F'
          </button>
          <button onClick={props.onButtonPress} value={"b"}>
            B
          </button>
          <button onClick={props.onButtonPress} value={"b-p"}>
            B'
          </button>
        </div>
        <button onClick={props.onButtonPress} value={"r"}>
          R
        </button>
        <button onClick={props.onButtonPress} value={"r-p"}>
          R'
        </button>
      </div>
      <div className={classes.bottomBtns}>
        <button onClick={props.onButtonPress} value={"d"}>
          D
        </button>
        <button onClick={props.onButtonPress} value={"d-p"}>
          D'
        </button>
      </div>
    </div>
  );
};

export default RotateWedgeButtons;
