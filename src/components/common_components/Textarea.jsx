import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import "./textarea.css";


const Textarea = ({ value, isEdit, onChangeValue, onChangeIsEdit, onBlur }) => {
    const [height, setHeight] = useState(0)
    const textarea = useRef(null)

    useEffect(() => {
        if (textarea.current && height !== textarea.current.scrollHeight) {
            setHeight(textarea.current.scrollHeight)
        }
        if (textarea.current && isEdit) {
            textarea.current.focus()
        }
    })

    const handleOnChange = (e) => onChangeValue(e.target.value);

    const handleOnDoubleClick = e => {
        onChangeIsEdit(true)
        e.preventDefault()
    }

    const handleOnKeyPressTextarea = (e) => {
        if (!e.shiftKey && e.which === 13 || !e.shiftKey && e.which === 27) {
            onChangeIsEdit(false)
            e.preventDefault();
        }
    }

    const handleOnBlur = (e) => onBlur(false);

    return (
        <div className={'textarea-container'} onClick={handleOnDoubleClick}>
            <textarea
                ref={textarea}
                disabled={!isEdit}
                spellCheck={false}
                onKeyPress={handleOnKeyPressTextarea}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                style={{height: `${height}px`} }
                value={value}
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
    onChangeValue: () => {},
    onChangeIsEdit: () => {},
    onBlur: () => {}
}

export default Textarea;