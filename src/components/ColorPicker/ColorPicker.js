import ColorPickerListItem from "./ColorPickerListItem";

import classes from "./ColorPicker.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faShuffle } from "@fortawesome/free-solid-svg-icons";

const ColorPicker = () => {

  const reset = (
    <FontAwesomeIcon
      icon={faArrowRotateRight}
      className='noPointerEvents'
    />
  );

  const shuffle = (
    <FontAwesomeIcon
      icon={faShuffle}
      className='noPointerEvents'
    />
  );

  

  return (
    <div className={classes.colorPicker}>
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
