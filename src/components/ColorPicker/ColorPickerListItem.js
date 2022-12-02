import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { facesActions } from "../../orientation";

import classes from "./ColorPickerListItem.module.css";

const ColorPickerListItem = (props) => {
  const dispatch = useDispatch();

  const colorEdgeCount = useSelector((state) => state.faces.edgeColorCount);
  const colorCornerCount = useSelector((state) => state.faces.cornerColorCount);

  const cubeFilled = useSelector(state => state.faces.allSegmentsFilled)

  useEffect(() => {
    if(cubeFilled === true){
      dispatch(facesActions.setColorSelected('clear'))
    }
  })

  const colorPickerHandler = () => {
    dispatch(facesActions.setColorSelected(props.color));
  };

  let maxed
  if ((colorEdgeCount[props.color] + colorCornerCount[props.color]) === 8) {
    maxed = `${classes.maxed}`;
  }
  
  return (
    <div className={classes.listItem}>
      <div className={maxed}>
        <div
          className={classes.circle}
          style={{
            backgroundColor: `var(--color-${props.color})`,
          }}
          onClick={colorPickerHandler}
        />
        <li onClick={colorPickerHandler}>{props.color}</li>
      </div>
    </div>
  );
};

export default ColorPickerListItem;
