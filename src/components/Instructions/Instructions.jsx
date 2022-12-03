import { useSelector } from "react-redux"

import CubeNotation from "./CubeNotation"
import ButtonLayout from "./ButtonLayout"


const Instructions = () => {

    const notationVisible = useSelector(state => state.guide.notationVisible)
    const buttonLayoutVisible = useSelector(state => state.guide.buttonLayoutVisible)

     return (
        <>
            {notationVisible && <CubeNotation />}
            {buttonLayoutVisible && <ButtonLayout />}
        </>
     )
}

export default Instructions