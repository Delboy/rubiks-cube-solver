import { useSelector, useDispatch } from "react-redux"
import { facesActions } from "../../orientation"
import { useEffect } from "react"

import classes from './ErrorMsg.module.css'

const ErrorMSg = () => {

    const errorMsg = useSelector(state => state.faces.errorMsg)

    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(facesActions.setErrorMsg(''))
        }, 3000)
    }, [errorMsg, dispatch])

    return (
        <div className={classes.box}>
            <p className={classes.msg}>{errorMsg}</p>
        </div>
    ) 
}

export default ErrorMSg