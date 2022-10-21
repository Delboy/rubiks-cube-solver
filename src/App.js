import Header from "./components/Layout/Header";
import Cube from "./components/Cube/Cube";

import classes from './App.module.css'

function App() {
  return (
    <>
      <div className={classes.main}>
      <Header />
        <Cube />
      </div>
    </>
  );
}

export default App;
