import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { guideActions } from '../../orientation';

import classes from './DaisyGuide.module.css'

const DaisyGuide = (props) => {

  const dispatch = useDispatch()

  const msgNo = useSelector(state => state.guide.msgNo)
  const command = useSelector(state => state.guide.command)

  const messages = [
    [
      <div key='1' className={classes.daisyBox}>
        <p>So lets start with step one.</p>
        <p>
          <span className={classes.bold}>Creating the daisy</span>
        </p>
        <p>
          We will begin by trying to create a daisy on the top layer. This will
          look like this.
        </p>
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
        <p>
          It does not matter what colour the corner pieces are at this stage.
        </p>
        <p>
          Try closing the guide and achieving this alone or press next to
          continue the guide of what to do
        </p>
      </div>,
    ],
    [<p key='2' value='command'>{command}</p>],
    [
      <div key='3'>
        <p>Well done!</p>
        <p>You've completed the daisy!</p>
        <p>Lets move on to step 2</p>
      </div>
    ]
  ];

  // Once daisy is solved move to the next message
  const daisySolved = useSelector((state) => state.guide.daisySolved);
  useEffect(() => {
    if (daisySolved) {
      dispatch(guideActions.setMsgNumber(2))
    }
  }, [daisySolved, dispatch]);

  useEffect(() => {
    if(msgNo === messages.length){
        props.setCurrentGuideMsgLength(messages.length)
        props.updateGuide('next')
    }
    if(msgNo === -1 ){
        props.updateGuide('prev')
    }
    if(msgNo === 1){
      props.onCommandVisible(true)
    } else {
      props.onCommandVisible(false)
    }
  },[msgNo, props, messages.length])
  return (
    <div className={classes.guideArea}>{messages[msgNo]}</div>
  )
};

export default DaisyGuide;
