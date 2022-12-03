import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { guideActions } from "../../orientation";

import classes from './Introduction.module.css'

const Introduction = (props) => {

  const dispatch = useDispatch()

  const cubeFilled = useSelector(state => state.faces.allSegmentsFilled)
  
  const showInstructionHandler = (e) => {
    const instruction = e.target.attributes.value.value
    dispatch(guideActions.toggleInstruction(instruction))
  };

  const messages = [
    [
      <div key='1'>
        <p>Hello! And welcome to the Rubiks Cube Solver beginners guide!</p>
        {!cubeFilled && 
        <div>
          <p className={classes.bold}>It looks like you havn't filled in the cube yet!</p>
          <p children={classes.bold}>Please fill it by using the color picker or hit the shuffle button to randomise!</p>
        </div>
        }
      </div>,
    ],
    [
      <div key='2'>
        <p>
          To begin there's a couple things you need to know before we get
          started.
        </p>
        <p>Make sure you're familiar with the following:</p>
        <div className={classes.list}>
          <ul className={classes.guideList}>
            <li
              className={classes.guideListItem}
              onClick={showInstructionHandler}
              value='notationLayout'
            >
              Cube Notation
            </li>
            <li
              className={classes.guideListItem}
              onClick={showInstructionHandler}
              value='buttonLayout'
            >
              Button Layout
            </li>
          </ul>
        </div>
      </div>,
    ],
    [
      <p key='3'>
        Now that you understand cube notation and how to rotate the cube lets
        talk about the cube itself.
      </p>,
    ],
    [
      <div key='4'>
        <p>
          First off we should notice that the center pieces never move! This
          dictates what face will end up what color.
        </p>
        <p>We'll also use this as reference.</p>
        <p>
          The <span className={classes.bold}>blue face</span> for example will
          be in reference to the side with a blue center piece.
        </p>
      </div>,
    ],
    [
      <div key='5'>
        <p>Apart from the center pieces there are two other types.</p>
        <p>
          <span className={classes.bold}>Edge Pieces</span> and{" "}
          <span className={classes.bold}>Corner Pieces</span>.
        </p>
        <p>
          <span className={classes.bold}>Edge Pieces</span> have two faces and
          sit between the <span className={classes.bold}>Corner Pieces</span>{" "}
          which have three.
        </p>
      </div>,
    ],
    [
      <p key='6'>
        We will always hold the cube with the white face on the bottom which in
        turn dictates that the yellow face will be on top.
      </p>,
    ],
    [
      <div key='7' className={classes.steps}>
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
      </div>,
    ]
  ];

  useEffect(() => {
    if(props.messageNo === messages.length){
        props.updateGuide('next')
        props.setCurrentGuideMsgLength(messages.length)
    }
    if(props.messageNo === -1 ){
        props.updateGuide('prev')
    }
    if(props.messageNo){
      props.onCommandVisible(false)
    }
  },[props, messages.length])

  const skipTutorialHandler = () => {
    props.updateGuide('next')
    props.setCurrentGuideMsgLength(messages.length)
  }

  return (
    <>
    <div className={classes.guideArea}>{messages[props.messageNo]}</div>
    {cubeFilled && <button className={classes.skipBtn} onClick={skipTutorialHandler}>skip introduction</button>}

    </>

  )

    

};

export default Introduction;
