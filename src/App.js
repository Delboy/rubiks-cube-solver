import Header from "./components/Layout/Header";
import Cube from "./components/Cube/Cube";
import Buttons from "./components/Controls/Buttons";
import ColorPicker from "./components/ColorPicker/ColorPicker";

import classes from "./App.module.css";

function App() {

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
    </>
  );
}

export default App;
