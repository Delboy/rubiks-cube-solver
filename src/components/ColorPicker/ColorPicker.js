import ColorPickerListItem from "./ColorPickerListItem";
import { useSelector } from "react-redux";

import classes from "./ColorPicker.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

const ColorPicker = () => {
  const colorSelected = useSelector((state) => state.faces.colorSelected);

  const reset = (
    <FontAwesomeIcon icon={faArrowRotateRight} className="noPointerEvents" />
  );

  const shuffle = (
    <FontAwesomeIcon icon={faShuffle} className="noPointerEvents" />
  );

  let boxShadow
  if(colorSelected === 'white'){
    boxShadow = {boxShadow: `0 3px 15px var(--color-darkgrey)`}
  } else {
    boxShadow = {boxShadow: `0 3px 15px var(--color-${colorSelected})`}
  }

  return (
    <div
      className={classes.colorPicker}
      style={boxShadow}
    >
      <h3>Select Color</h3>
      <ul>
        <ColorPickerListItem color={"blue"} />
        <ColorPickerListItem color={"orange"} />
        <ColorPickerListItem color={"green"} />
        <ColorPickerListItem color={"red"} />
        <ColorPickerListItem color={"yellow"} />
        <ColorPickerListItem color={"white"} />
        <ColorPickerListItem color={"clear"} />
      </ul>
      <div>
        <button>{reset}</button>
        <button>{shuffle}</button>
      </div>
    </div>
  );
};

export default ColorPicker;
