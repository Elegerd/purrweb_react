import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./popup.css";


const Popup = ({ title, className, onClose, children }) => {

    useEffect(() => {
        onClose && document.addEventListener("keydown", handleEscPress, false);
        return () => {
            document.removeEventListener("keydown", handleEscPress, false);
        }
    }, [])

    const handleEscPress = e => {
        if (e.keyCode === 27) {
            onClose()
        }
    };

    return (
        <div className={'popup__overlay'}>
            <div className={`popup ${className || ''}`}>
                <div className={'popup__header'}>
                    <div className={'popup__title'}>
                        {title}
                    </div>
                    {onClose &&
                        <div className={'popup__close'} onClick={onClose}>
                            &#10006;
                        </div>
                    }
                </div>
                <div className={'popup__content'}>
                    {children}
                </div>
            </div>
        </div>
    );
};

Popup.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    onClose: PropTypes.func
}

export default Popup;