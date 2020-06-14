import React, {useEffect, useRef, useState} from "react";
import Textarea from "./Textarea";
import PropTypes from "prop-types";
import "./textareagroup.css"


const TextareaGroup = ({ value, titleButton, placeholder, onClick }) => {
    const textareaGroup = useRef()
    const [valueTextarea, setValueTextarea] = useState(value)

    useEffect(() => {
        document.addEventListener('click', handleOnClickContains, false)
        return () => {
            document.removeEventListener('click', handleOnClickContains, false)
        }
    })

    const handleOnClickContains = (e) => {
        if (textareaGroup.current && !textareaGroup.current.contains(e.target)) {
            setValueTextarea('')
            onClick(valueTextarea)
        }
    }

    const handleOnKeyPress = (e) => {
        if (!e.shiftKey && e.which === 13) {
            setValueTextarea('')
            onClick(valueTextarea)
        }
    }

    const handleOnClick = (e) => {
        setValueTextarea('')
        onClick(valueTextarea)
    }

    return (
        <div ref={textareaGroup} className={'textarea-group'}>
            <Textarea
                value={valueTextarea}
                placeholder={placeholder}
                onKeyPress={handleOnKeyPress}
                onChangeValue={(value) => setValueTextarea(value)}
                autoFocus={false}
            />
            <div className={'textarea-group__container-button'}>
                <button className={'btn btn-success'}
                    onClick={handleOnClick}
                >
                    {titleButton}
                </button>
            </div>
        </div>
    );
};


TextareaGroup.propTypes = {
    value: PropTypes.string,
    titleButton: PropTypes.string,
    placeholder: PropTypes.string,
    onClick: PropTypes.func,
}

TextareaGroup.defaultProps = {
    value: '',
    titleButton: "Принять",
    placeholder: "",
    onClick: () => {}
}

export default TextareaGroup;