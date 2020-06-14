import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import "./textarea.css";


const Textarea = ({ value, placeholder, autoFocus, isEdit, onChangeValue, onChangeIsEdit, onBlur, onKeyPress }) => {
    const [height, setHeight] = useState(0)
    const textarea = useRef(null)

    useEffect(() => {
        if (textarea.current && height !== textarea.current.scrollHeight) {
            setHeight(textarea.current.scrollHeight)
        }
        if (textarea.current && isEdit && autoFocus) {
            textarea.current.focus()
        }
    })

    const handleOnBlur = (e) => onBlur(false);

    const handleOnChange = (e) => onChangeValue(e.target.value);

    const handleOnClick = e => {
        e.preventDefault()
        onChangeIsEdit(true)
    }

    const handleOnKeyPress = (e) => onKeyPress(e)

    return (
        <div className={'textarea-container'} onClick={handleOnClick}>
            <textarea
                ref={textarea}
                disabled={!isEdit}
                spellCheck={false}
                onKeyPress={handleOnKeyPress}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                style={{height: `${height}px`}}
                value={value}
                placeholder={placeholder}
            />
        </div>
    );
};

Textarea.propTypes = {
    value: PropTypes.string,
    isEdit: PropTypes.bool,
    onChangeValue: PropTypes.func,
    onChangeIsEdit: PropTypes.func,
    onBlur: PropTypes.func
}

Textarea.defaultProps = {
    isEdit: true,
    autoFocus: true,
    placeholder: '',
    onChangeValue: () => {},
    onChangeIsEdit: () => {},
    onBlur: () => {},
    onKeyPress: () => {}
}

export default Textarea;