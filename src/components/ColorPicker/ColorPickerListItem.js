import classes from "./ColorPickerListItem.module.css";

const ColorPickerListItem = (props) => {
  return (
    <div className={classes.listItem}>
      <div
        className={classes.circle}
        style={{
          backgroundColor: `var(--color-${props.color})`,
        }}
      />
      <li>{props.color}</li>
    </div>
  );
};

export default ColorPickerListItem;
