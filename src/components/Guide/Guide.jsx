import { useState } from "react";

import Solvers from "../Solvers/Solvers";

import GuideBox from "./GuideBox";
import Instructions from "../Instructions/Instructions";

import classes from "./Guide.module.css";

const Guide = () => {
  const [command, setCommand] = useState('')
  
  const setCommandHandler = (command) => {
     setCommand(command)
  }

  return (
    <div className={classes.solvers}>
      <GuideBox command={command} />
      <Instructions />
      <Solvers onCommandSet={setCommandHandler}/>
    </div>
  );
};

export default Guide;
