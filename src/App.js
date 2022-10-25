import { useState } from "react";
import Header from "./components/Layout/Header";
import Cube from "./components/Cube/Cube";
import RadioInputs from "./components/Controls/RadioInputs";

import classes from "./App.module.css";

function App() {
  const [currentFace, setCurrentFace] = useState("blue");

  const radioSelectHandler = (e) => {
    setCurrentFace(e.target.value);
  };


  return (
    <>
      <div className={classes.main}>
        <Header />
        <Cube currentFace={currentFace} />
        <RadioInputs onChangeCurrentFace={radioSelectHandler} />
      </div>
    </>
  );
}

export default App;
