import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import classes from './DaisyGuide.module.css'

const DaisyGuide = (props) => {

  const dispatch = useDispatch()
  
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
          It does not matter what colour the corner pieces are at this state.
        </p>
        <p>
          Try closing the guide and achieving this alone or press next to
          continue the guide of what to do
        </p>
      </div>,
    ],
    [<p key='2' value='command'>{props.command}</p>],
  ];

  useEffect(() => {
    if(props.messageNo === messages.length){
        props.setCurrentGuideMsgLength(messages.length)
        props.updateGuide('next')
    }
    if(props.messageNo === -1 ){
        props.updateGuide('prev')
    }
    if(props.messageNo === 1){
      props.onCommandVisible(true)
    } else {
      props.onCommandVisible(false)
    }
  },[props, messages.length, dispatch])
  return (
    <div className={classes.guideArea}>{messages[props.messageNo]}</div>
  )
};

export default DaisyGuide;
