import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { guideActions } from "../../orientation";

import classes from "./FirstLayerGuide.module.css";

const FirstLayerGuide = (props) => {
  
  const command = useSelector((state) => state.guide.command);
  const msgNo = useSelector(state => state.guide.msgNo)

  const dispatch = useDispatch()
  
  const messages = [
    [
      <div key="1" className={classes.container}>
        <p>Step three</p>
        <p>
          <span className={classes.bold}>Solving the First Layer</span>
        </p>
        <p>
          We now have to solve the corners on the bottom layer!
        </p>
        <p>
          There are three case scenarios to look for when solving the first
          layers corners.
        </p>
        <p> Once its done your cube will look like this</p>
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
              <div className={classes.red}></div>
              <div className={classes.red}></div>
              <div className={classes.red}></div>
            </div>
            <div
              className={classes.cubeFace}
              style={{ transform: "rotateX(-90deg) translateZ(75px)" }}
            >
              <div className={classes.white}></div>
              <div className={classes.white}></div>
              <div className={classes.white}></div>
              <div className={classes.white}></div>
              <div className={classes.white}></div>
              <div className={classes.white}></div>
              <div className={classes.white}></div>
              <div className={classes.white}></div>
              <div className={classes.white}></div>
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
              <div className={classes.blue}></div>
              <div className={classes.blue}></div>
              <div className={classes.blue}></div>
            </div>
          </div>
        </div>
      </div>,
    ],[
      (
        <div className={classes.container} key={'2'}>
          <p>
            The first case scenario is when a corner piece in the
            top row has an outward facing white edge
          </p>
          <p>
            Once you have located a corner like this, line up its opposite edge (not the one not facing
            upwards) to the center piece of the same color
          </p>
          <p>like so...</p>
          <div className={classes.inline}>
            <div
              className={classes.perspectiveScene}
              style={{ margin: "2rem 0" }}
            >
              <div className={`${classes.cube} ${classes.topAndSideView}`}>
                <div
                  className={classes.cubeFace}
                  style={{ transform: "rotateY(0deg) translateZ(75px)" }}
                >
                  <div className={classes.red}></div>
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
                  style={{ transform: "rotateX(90deg) translateZ(75px)" }}
                >
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div
                  className={classes.cubeFace}
                  style={{ transform: "rotateY(-90deg) translateZ(75px)" }}
                >
                  <div></div>
                  <div></div>
                  <div className={classes.white}></div>
                  <div></div>
                  <div className={classes.blue}></div>
                  <div></div>
                  <div></div>
                  <div className={classes.blue}></div>
                  <div></div>
                </div>
              </div>
            </div>
            <p className={classes.leftAndRightPadding}>or</p>
            <div
              className={classes.perspectiveScene}
              style={{ margin: "2rem 0" }}
            >
              <div className={`${classes.cube} ${classes.topAndSideView}`}>
                <div
                  className={classes.cubeFace}
                  style={{ transform: "rotateY(0deg) translateZ(75px)" }}
                >
                  <div className={classes.white}></div>
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
                  style={{ transform: "rotateX(90deg) translateZ(75px)" }}
                >
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div
                  className={classes.cubeFace}
                  style={{ transform: "rotateY(-90deg) translateZ(75px)" }}
                >
                  <div></div>
                  <div></div>
                  <div className={classes.blue}></div>
                  <div></div>
                  <div className={classes.blue}></div>
                  <div></div>
                  <div></div>
                  <div className={classes.blue}></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    ],
    [
      <div className={classes.container} key="3">
        <p>
          You now have to perform an algorithm to solve the piece
        </p>
        <p>
          Look at the face that has the same color as the corner piece. If the
          corner piece is right of the center you perform...
        </p>
        <p>R U R'</p>
        <p>And if the corner piece is left of the center you perform...</p>
        <p>L' U' L</p>
        <p>
          Once the algorithm has been completed the corner will have moved from the top row to the
          bottom, solving that part of the layer!
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
              <div className={classes.red}></div>
              <div className={classes.red}></div>
              <div></div>
            </div>
            <div
              className={classes.cubeFace}
              style={{ transform: "rotateX(-90deg) translateZ(75px)" }}
            >
              <div className={classes.white}></div>
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
              <div className={classes.blue}></div>
            </div>
          </div>
        </div>
      </div>,
    ],
    [
      <div className={classes.container} key="4">
        <p>
          The second scenario is if a corner piece is in the bottom row
        </p>
        <p>like this...</p>
        <div className={classes.perspectiveScene} style={{ margin: "2rem 0" }}>
          <div className={`${classes.cube} ${classes.topAndSideView}`}>
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
              <div className={classes.white}></div>
              <div className={classes.red}></div>
              <div></div>
            </div>
            <div
              className={classes.cubeFace}
              style={{ transform: "rotateX(90deg) translateZ(75px)" }}
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
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
              <div className={classes.blue}></div>
            </div>
          </div>
        </div>
        <p>
          To solve this we have to move the piece from the bottom to the top row.
        </p>
        <p>Face the same side as the corners colored edge and perform the same
          algorithm as before
        </p>
        <p>If the corner piece is on the right side</p>
        <p>R U R'</p>
        <p>If the corner piece is on the left side</p>
        <p>L' U' L</p>
        <p>
          This will move the corner piece to the top row where you can solve it
          with the previous step!
        </p>
      </div>,
    ],
    [
      <div className={classes.container} key="5">
        <p>
          The last case scenario is when a corner piece is in the top row with
          the white face facing upwards!
        </p>
        <p>Like this...</p>
        <div className={classes.perspectiveScene} style={{ margin: "2rem 0" }}>
          <div className={`${classes.cube} ${classes.topAndSideView}`}>
            <div
              className={classes.cubeFace}
              style={{ transform: "rotateY(0deg) translateZ(75px)" }}
            >
              <div className={classes.blue}></div>
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
              style={{ transform: "rotateX(90deg) translateZ(75px)" }}
            >
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div className={classes.white}></div>
              <div></div>
              <div></div>
            </div>
            <div
              className={classes.cubeFace}
              style={{ transform: "rotateY(-90deg) translateZ(75px)" }}
            >
              <div></div>
              <div></div>
              <div className={classes.red}></div>
              <div></div>
              <div className={classes.blue}></div>
              <div></div>
              <div></div>
              <div className={classes.blue}></div>
              <div></div>
            </div>
          </div>
        </div>
        <p>
          To solve this piece, rotate the top so that the corner piece is above the bottom
          corner where you want it to go, like in the example above
        </p>
        <p>
          From here look at either face, and if the corner piece is on the right
          hand side perform the algorithm
        </p>
        <p>R U U R'</p>
        <p>
          If the corner piece is on the left side however, perform the algorithm
        </p>
        <p>L' U' U' L</p>
        <p>
          This will keep the corner in the top row, but flip the white edge to
          face outwards. From here you can solve the corner using the steps for the first scenario!
        </p>
      </div>,
    ],
    [
      <div className={classes.container} key='6'>
        <p>Once you have done this for all four corner pieces you have solved the first layer!</p>
        <p>
          Try closing the guide and achieving this alone or press next to
          continue the guide of what to do
        </p>
      </div>
    ],
    [
      [<p key='7' value='command'>{command}</p>],
    ],
    [
      <div key="8">
        <p>Well done!</p>
        <p>You've completed the First Layer!</p>
        <p>Lets move on to step 4</p>
      </div>,
    ],
  ];

  // Once First Layer is solved move to the next message
  const firstLayerSolved = useSelector((state) => state.guide.firstLayerSolved);
  useEffect(() => {
    if (firstLayerSolved) {
      dispatch(guideActions.setMsgNumber(7))
    }
  }, [firstLayerSolved, dispatch]);

  useEffect(() => {
    if (msgNo === messages.length) {
      props.setCurrentGuideMsgLength(messages.length);
      props.updateGuide("next");
    }
    if (msgNo === -1) {
      props.updateGuide("prev");
    }
    if (msgNo === 6) {
      props.onCommandVisible(true);
    } else {
      props.onCommandVisible(false);
    }
  }, [msgNo, props, messages.length]);
  return <div className={classes.guideArea}>{messages[msgNo]}</div>;
};

export default FirstLayerGuide;
