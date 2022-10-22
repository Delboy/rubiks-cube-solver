import classes from './RadioInputs.module.css'

const RadioInputs = (props) => {
    return (
        <div className={classes.inputs} onChange={props.onChangeCurrentFace}>
        <label>
          <input type="radio" name="cube-facing" value="blue" defaultChecked /> Blue
        </label>
        <label>
          <input type="radio" name="cube-facing" value="green" /> Green
        </label>
        <label>
          <input type="radio" name="cube-facing" value="orange" /> Orange
        </label>
        <label>
          <input type="radio" name="cube-facing" value="red" /> Red
        </label>
        <label>
          <input type="radio" name="cube-facing" value="yellow" /> Yellow
        </label>
        <label>
          <input type="radio" name="cube-facing" value="white" /> White
        </label>
      </div>
    )
}

export default RadioInputs