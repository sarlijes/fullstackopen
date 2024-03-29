import React, { useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"
import { Button } from "./StyledComponents"

// eslint-disable-next-line react/display-name
const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(true)
    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                {props.children}
                <Button onClick={toggleVisibility}>close</Button>
            </div>
        </div>
    )
})
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable