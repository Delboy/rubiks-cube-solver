import ColorPickerListItem from "./ColorPickerListItem";
import { useSelector, useDispatch } from "react-redux";
import { facesActions } from "../../orientation";

import classes from "./ColorPicker.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

const ColorPicker = () => {
  const dispatch = useDispatch()

  const colorSelected = useSelector((state) => state.faces.colorSelected);
  
  const reset = (
    <FontAwesomeIcon icon={faArrowRotateRight} className="noPointerEvents" />
  );

  const shuffle = (
    <FontAwesomeIcon icon={faShuffle} className="noPointerEvents" />
  );

  let boxShadow
  if(colorSelected === 'white'){
    boxShadow = {boxShadow: `0 3px 50px var(--color-darkgrey)`}
  } else {
    boxShadow = {boxShadow: `0 3px 50px var(--color-${colorSelected})`}
  }

  const resetHandler = () => {
    dispatch(facesActions.clearAllSegmentColors()) 
  }

  const shuffleHandler = () => {
    // Solves Cube then performs 20 random moves
     dispatch(facesActions.solveCube())
     dispatch(facesActions.setAllColorCounterToMax())
     let colorList = ["blue", "orange", "green", "red", "yellow", "white"];
     let prime = [true, false]
     let turns = 0
     while(turns < 20){
       let randomColor = Math.floor(Math.random() * colorList.length);
       let randomPrime = Math.floor(Math.random() * prime.length)
       dispatch(facesActions.rotateWedge({ face: colorList[randomColor], prime: prime[randomPrime] }));
       turns += 1      
      }
      dispatch(facesActions.resetMoveCounter())
  }

  return (
    <div
      className={classes.colorPicker}
      style={boxShadow}
    >
      <h3>Select Color</h3>
      <ul>
        <ColorPickerListItem color={"blue"}/>
        <ColorPickerListItem color={"orange"} />
        <ColorPickerListItem color={"green"} />
        <ColorPickerListItem color={"red"} />
        <ColorPickerListItem color={"yellow"} />
        <ColorPickerListItem color={"white"} />
        <ColorPickerListItem color={"clear"} />
      </ul>
      <div>
        <button onClick={resetHandler}>{reset}</button>
        <button onClick={shuffleHandler}>{shuffle}</button>
      </div>
    </div>
  );
};

export default ColorPicker;
