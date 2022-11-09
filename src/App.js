import Header from "./components/Layout/Header";
import Cube from "./components/Cube/Cube";
import Buttons from "./components/Controls/Buttons";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import { useSelector } from "react-redux";

import classes from "./App.module.css";

function App() {

  const blueCount = useSelector(state => state.faces.colorCount.blue)
  const redCount = useSelector(state => state.faces.colorCount.red)
  const orangeCount = useSelector(state => state.faces.colorCount.orange)
  const greenCount = useSelector(state => state.faces.colorCount.green)
  const whiteCount = useSelector(state => state.faces.colorCount.white)
  const yellowCount = useSelector(state => state.faces.colorCount.yellow)

  return (
    <>
      <div className={classes.main}>
        <Header />
        <div className={classes.center}>
          <div>
            <Cube />
            <Buttons />
          </div>
          <div>
            <ColorPicker />
          </div>
        </div>
      </div>
      <div>
        <p>blue: {blueCount}</p>
        <p>orange: {orangeCount}</p>
        <p>green: {greenCount}</p>
        <p>red: {redCount}</p>
        <p>white: {whiteCount}</p>
        <p>yellow: {yellowCount}</p>
      </div>
    </>
  );
}

export default App;
