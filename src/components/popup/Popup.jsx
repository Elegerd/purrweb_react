import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./popup.css";

const Popup = ({ title, className, onClose, isDefaultHeader, children }) => {
  useEffect(() => {
    onClose && document.addEventListener("keydown", handleEscPress, false);
    return () => {
      document.removeEventListener("keydown", handleEscPress, false);
    };
  }, []);

  const handleEscPress = (e) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  const handleOnClickClose = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className={"popup__overlay"}>
      <div className={`popup ${className}`}>
        {isDefaultHeader && (
          <div className={"popup__popup-header"}>
            <div className={"popup-header__title"}>{title}</div>
            {onClose && (
              <div
                className={"popup-header__close"}
                onClick={handleOnClickClose}
              >
                &#10006;
              </div>
            )}
          </div>
        )}
        <div className={"popup__content"}>{children}</div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  onClose: PropTypes.func,
};

Popup.defaultProps = {
  title: "",
  className: "",
  onClose: null,
  isDefaultHeader: true,
};

export default Popup;
