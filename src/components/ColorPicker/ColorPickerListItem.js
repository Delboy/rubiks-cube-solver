import { useDispatch } from "react-redux";
import { facesActions } from "../../orientation";

import classes from "./ColorPickerListItem.module.css";

const ColorPickerListItem = (props) => {
  const dispatch = useDispatch()

  
  const colorPickerHandler = () => {
    dispatch(facesActions.setColorSelected(props.color))
  };

  return (
    <div className={classes.listItem}>
      <div
        className={classes.circle}
        style={{
          backgroundColor: `var(--color-${props.color})`,
        }}
        onClick={colorPickerHandler}
      />
      <li>{props.color}</li>
    </div>
  );
};

export default ColorPickerListItem;
