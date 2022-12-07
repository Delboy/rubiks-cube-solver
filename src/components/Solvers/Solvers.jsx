import DaisySolver from "./DaisySolver";
import WhiteCrossSolver from "./WhiteCross.Solver";

const Solvers = (props) => {

  return (
    <>
      <DaisySolver onCommandSet={props.onCommandSet} />
      <WhiteCrossSolver onCommandSet={props.onCommandSet} />
    </>
  );
};

export default Solvers;
