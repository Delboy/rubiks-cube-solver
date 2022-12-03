import { useDispatch } from "react-redux";
import { guideActions } from "../../orientation";

import classes from "./CubeNotation.module.css";

const CubeNotation = (props) => {
  const dispatch = useDispatch();

  const onCloseHandler = () => {
    dispatch(guideActions.toggleInstruction("notationLayout"));
  };

  return (
    <>
      <div className={classes.overlay} onClick={onCloseHandler}></div>
      <div className={classes.cubeNotation} onClick={onCloseHandler}>
        <p className={classes.exitBtn}>X</p>
        <p className={classes.bold}>CUBE NOTATION</p>
        <div className={classes.imageBox}>
          <img
            src={require("../../assets/images/cube-notation.webp")}
            alt="A list depicting notation for all rubik cube moves"
            className={classes.img}
          />
        </div>
        <p>
          We use letters to describe the rotation of a particular face on the
          cube.
        </p>
        <br></br>
        <p>
          <span className={classes.bold}>U</span> is short for{" "}
          <span className={classes.bold}>UP</span> which corresponds to the{" "}
          <span className={classes.bold}>TOP</span> face
        </p>
        <p>
          <span className={classes.bold}>D</span> is short for{" "}
          <span className={classes.bold}>DOWN</span> which corresponds to the{" "}
          <span className={classes.bold}>BOTTOM</span> face
        </p>
        <p>
          <span className={classes.bold}>L</span> is short for{" "}
          <span className={classes.bold}>LEFT</span> which corresponds to the{" "}
          <span className={classes.bold}>LEFT</span> face
        </p>
        <p>
          <span className={classes.bold}>R</span> is short for{" "}
          <span className={classes.bold}>RIGHT</span> which corresponds to the{" "}
          <span className={classes.bold}>RIGHT</span> face
        </p>
        <p>
          <span className={classes.bold}>F</span> is short for{" "}
          <span className={classes.bold}>FRONT</span> which corresponds to the{" "}
          <span className={classes.bold}>FRONT</span> face
        </p>
        <p>
          <span className={classes.bold}>B</span> is short for{" "}
          <span className={classes.bold}>BACK</span> which corresponds to the{" "}
          <span className={classes.bold}>BACK</span> face
        </p>
        <br></br>
        <p>A letter by itself refers to a clockwise rotation</p>
        <p>
          Whereas a letter followed by a <span className={classes.bold}>'</span>{" "}
          is known as a <span className={classes.bold}>PRIME</span> and refers
          to a anticlockwise rotation.
        </p>
      </div>
    </>
  );
};

export default CubeNotation;
