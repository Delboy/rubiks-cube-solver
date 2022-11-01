import { useState } from "react";
import Header from "./components/Layout/Header";
import Cube from "./components/Cube/Cube";

import classes from "./App.module.css";

function App() {
  const [currentFace, setCurrentFace] = useState("blue");

  return (
    <>
      <div className={classes.main}>
        <Header />
        <Cube currentFace={currentFace} />
      </div>
    </>
  );
}

export default App;
