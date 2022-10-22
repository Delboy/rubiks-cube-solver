import classes from './CubeFace.module.css'

const CubeFace = (props) => {
    const cubeFaceClassName = (classes[props.face])

  return (
    <div className={`${classes.cubeFace} ${cubeFaceClassName}`}>
        <div>TL</div>
        <div>TM</div>
        <div>TR</div>
        <div>CL</div>
        <div>C</div>
        <div>CR</div>
        <div>BL</div>
        <div>BM</div>
        <div>BR</div>
    </div>
  );
};

export default CubeFace;
