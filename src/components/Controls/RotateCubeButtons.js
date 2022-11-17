import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

import classes from './RotateCubeButtons.module.css'
import { useSelector } from "react-redux";

const RotateCubeButtons = (props) => {
  const currentFace = useSelector(state => state.faces.currentFace)

  const [onYellowOrWhite, setOnYellowOrWhite] = useState(false);

  // Checks if user is facing the yellow or white face. This is used to render either a normal arrow or rotate arrow button.
  useEffect(() => {
    if (currentFace === 'yellow' || currentFace === 'white') {
      setOnYellowOrWhite(true);
    } else {
      setOnYellowOrWhite(false);
    }
  }, [currentFace]);

  // Font awesome icons
  const rotateRightArrow = (
    <FontAwesomeIcon icon={faArrowRotateRight} className="noPointerEvents" />
  );
  const rotateLeftArrow = (
    <FontAwesomeIcon icon={faArrowRotateLeft} className="noPointerEvents" />
  );
  const upArrow = (
    <FontAwesomeIcon icon={faCircleArrowUp} className="noPointerEvents" />
  );
  const downArrow = (
    <FontAwesomeIcon icon={faCircleArrowDown} className="noPointerEvents" />
  );
  const leftArrow = (
    <FontAwesomeIcon icon={faCircleArrowLeft} className="noPointerEvents" />
  );
  const rightArrow = (
    <FontAwesomeIcon icon={faCircleArrowRight} className="noPointerEvents" />
  );

    return (
        <div className={classes.arrowButtons}>
        <button
          className={classes.topBtn}
          onClick={props.onButtonPress}
          value="up"
          disabled={currentFace === "white"}
        >
          {upArrow}
        </button>
        <div className={classes.middleBtns}>
          <button onClick={props.onButtonPress} value="left">
            {onYellowOrWhite
              ? currentFace === "yellow"
                ? rotateRightArrow
                : rotateLeftArrow
              : leftArrow}
          </button>

          <i className="fas fa-solid fa-circle"></i>

          <button onClick={props.onButtonPress} value="right">
            {onYellowOrWhite
              ? currentFace === "yellow"
                ? rotateLeftArrow
                : rotateRightArrow
              : rightArrow}
          </button>
        </div>
        <button
          onClick={props.onButtonPress}
          value="down"
          disabled={currentFace === "yellow"}
        >
          {downArrow}
        </button>
      </div>
    ) 
}

export default RotateCubeButtons;