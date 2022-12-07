import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { guideActions } from "../../orientation";


import classes from "./WhiteCrossGuide.module.css";

const WhiteCrossGuide = (props) => {

  const command = useSelector((state) => state.guide.command);
  const msgNo = useSelector(state => state.guide.msgNo)
  const errorMsg = useSelector(state => state.guide.errorMsg)

  const dispatch = useDispatch()

    const resetGuideHandler = () => {
        dispatch(guideActions.setErrorMsg(''))
        dispatch(guideActions.setGuideNumber(1))
        dispatch(guideActions.setMsgNumber(0))
    }

  const messages = [
    [
      <div key="1" className={classes.container}>
        <p>Step two</p>
        <p>
          <span className={classes.bold}>Creating the White Cross</span>
        </p>
        <p>
          We now have to create a white cross on the bottom white face which
          will look like this.
        </p>
        <div className={classes.scene}>
          <div className={classes.whiteCrossFace}>
            <div></div>
            <div className={classes.white}></div>
            <div></div>
            <div className={classes.white}></div>
            <div className={classes.white}></div>
            <div className={classes.white}></div>
            <div></div>
            <div className={classes.white}></div>
            <div></div>
          </div>
        </div>
        <p>
          It does not matter what colour the corner pieces are at this stage.
        </p>
        <p>
          We create the cross by looking at each white edge piece on the daisy
          and lining up the other color on the same piece to the face with the
          same color center piece.
        </p>
        <p>So it looks something like this...</p>
        <div className={classes.perspectiveScene}>
          <div className={`${classes.cube} ${classes.sideView}`}>
            <div
              className={classes.cubeFace}
              style={{ transform: "rotateY(0deg) translateZ(75px)" }}
            >
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
            <div
              className={classes.cubeFace}
              style={{ transform: "rotateX(-90deg) translateZ(75px)" }}
            >
              <div></div>
              <div className={classes.blue}></div>
              <div></div>
              <div></div>
              <div className={classes.blue}></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <p>
          Once this is done we can rotate the face 180{"\u00b0"} so that the
          white piece on the daisy moves from the top yellow face to the bottom
          white face.
        </p>
      </div>,
    ],
    [
      <div className={classes.container} key="2">
        <p>Once you have done this for each white edge piece on the daisy</p>
        <p>
          the white cross on the bottom will be complete and each center piece
          should match the color bellow like this!
        </p>
        <div className={classes.perspectiveScene} style={{ margin: "2rem 0" }}>
          <div className={`${classes.cube} ${classes.bottomAndSideView}`}>
            <div
              className={classes.cubeFace}
              style={{ transform: "rotateY(0deg) translateZ(75px)" }}
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div className={classes.red}></div>
              <div></div>
              <div></div>
              <div className={classes.red}></div>
              <div></div>
            </div>
            <div
              className={classes.cubeFace}
              style={{ transform: "rotateX(-90deg) translateZ(75px)" }}
            >
              <div></div>
              <div className={classes.white}></div>
              <div></div>
              <div className={classes.white}></div>
              <div className={classes.white}></div>
              <div className={classes.white}></div>
              <div></div>
              <div className={classes.white}></div>
              <div></div>
            </div>
            <div
              className={classes.cubeFace}
              style={{ transform: "rotateY(-90deg) translateZ(75px)" }}
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div className={classes.blue}></div>
              <div></div>
              <div></div>
              <div className={classes.blue}></div>
              <div></div>
            </div>
          </div>
        </div>
        <p>Click next to try this now!</p>
      </div>,
    ],
    [
      <div key="3">
        {!errorMsg && <p value="command">
            {command}
            
        </p>}
        {errorMsg && <><p value="command">
            {errorMsg}
            
        </p>
        <button className={classes.button} onClick={resetGuideHandler}>Reset</button></>}
        
      </div>,
    ],
  ];

  useEffect(() => {
    if (msgNo === 2) {
      props.onCommandVisible(true);
    } else {
      props.onCommandVisible(false);
    }
    
  }, [msgNo, props, messages.length]);

  return <div className={classes.guideArea}>{messages[msgNo]}</div>;
};

export default WhiteCrossGuide;
