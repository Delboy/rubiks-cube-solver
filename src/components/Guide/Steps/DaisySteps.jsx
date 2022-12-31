import classes from '../Guide.module.css'

export const daisySteps = [
    [
      <div key='1' className={classes.container}>
        <p>So lets start with step one.</p>
        <p>
          <span className={classes.bold}>Creating the daisy</span>
        </p>
        <p>
          We will begin by trying to create a daisy on the top layer. This will
          look like this.
        </p>
        <div className={classes.scene}>
          <div className={classes.cubeFace}>
            <div></div>
            <div className={classes.white}></div>
            <div></div>
            <div className={classes.white}></div>
            <div className={classes.yellow}></div>
            <div className={classes.white}></div>
            <div></div>
            <div className={classes.white}></div>
            <div></div>
          </div>
        </div>
        <p>A yellow center piece surrounded by all white edge pieces.</p>
        <p>
          It does not matter what colour the corner pieces are at this stage.
        </p>
        <p>
          Try closing the guide and achieving this alone or press next to
          continue the guide of what to do
        </p>
      </div>,
    ]
]