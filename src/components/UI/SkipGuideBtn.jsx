import { useDispatch, useSelector } from "react-redux";
import { guideActions } from "../../orientation";
import classes from "./SkipGuideBtn.module.css";

const SkipGuideBtn = (props) => {
  const dispatch = useDispatch();

  const msgNo = useSelector(state => state.guide.msgNo)
  
  const skipGuideHandler = () => {
    dispatch(guideActions.setMsgNumber(props.commandMsgIndex));
  };

  return (
    <>
    
      {props.commandMsgNo > msgNo ? (
        <button className={classes.skipBtn} onClick={skipGuideHandler}>
          skip Guide
        </button>
      ) : null}
    </>
  );
};

export default SkipGuideBtn;
