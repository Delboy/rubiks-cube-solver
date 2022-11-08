import Header from "./components/Layout/Header";
import Cube from "./components/Cube/Cube";
import Buttons from './components/Controls/Buttons'

import classes from "./App.module.css";

function App() {
  
  return (
    <>
      <div className={classes.main}>
        <Header />
        <Cube />
        <Buttons />
      </div>
    </>
  );
}

export default App;
