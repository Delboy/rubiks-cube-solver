import { useSelector } from "react-redux";
import { useState } from "react";

const CubeSegment = (props) => {
  const colorSelected = useSelector((state) => state.faces.colorSelected);
  const [backgroundColor, setBackgroundColor] = useState({});

  const setColorHandler = (e) => {
    e.preventDefault();
    setBackgroundColor({ backgroundColor: `var(--color-${colorSelected})` });
  };

  return (
    <div
      onClick={setColorHandler}
      style={backgroundColor}
    >
    </div>
  );
};

export default CubeSegment;
