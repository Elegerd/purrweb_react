import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./popup.css";

const Popup = ({ className, children, onClose }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleEscPress, false);
    return () => {
      document.removeEventListener("keydown", handleEscPress, false);
    };
  }, []);

  const handleEscPress = (e) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  return (
    <div className={"popup__overlay"}>
      <div className={`popup ${className}`}>
        <div className={"popup__content"}>{children}</div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

Popup.defaultProps = {
  className: "",
  onClose: () => {},
};

export default Popup;
