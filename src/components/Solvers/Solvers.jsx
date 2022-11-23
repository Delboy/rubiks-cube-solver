import { useState } from "react";

import DaisySolver from "./DaisySolver";
import WhiteCrossSolver from "./WhiteCross.Solver";
import GuideBox from "./GuideBox";

import classes from "./Solvers.module.css";

const Solvers = () => {
  const [command, setCommand] = useState('')
  
  const setCommandHandler = (command) => {
     setCommand(command)
  }

  return (
    <div className={classes.solvers}>
      <GuideBox command={command}/>
      <DaisySolver onCommandSet={setCommandHandler}/>
      <WhiteCrossSolver />
    </div>
  );
};

export default Solvers;
