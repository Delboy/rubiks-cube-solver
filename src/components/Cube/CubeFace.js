import classes from './CubeFace.module.css'

const CubeFace = (props) => {
    const cubeFaceClassName = (classes[props.face])

  return (
    <div className={`${classes.cubeFace} ${cubeFaceClassName}`}>{props.face}</div>
  );
};

export default CubeFace;
