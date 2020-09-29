import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Textarea from "@commonComponents/textarea/Textarea";
import "./textareagroup.css";

const TextareaGroup = ({ value, titleButton, placeholder, onClick }) => {
  const textareaGroup = useRef();
  const [valueTextarea, setValueTextarea] = useState(value);

  useEffect(() => {
    document.addEventListener("click", handleOnClickContains, false);
    return () => {
      document.removeEventListener("click", handleOnClickContains, false);
    };
  });

  const handleOnClickContains = (e) => {
    if (textareaGroup.current && !textareaGroup.current.contains(e.target)) {
      setValueTextarea("");
      onClick(valueTextarea);
    }
  };

  const handleOnKeyPress = () => {
    setValueTextarea("");
    onClick(valueTextarea);
  };

  const handleOnClick = (e) => {
    setValueTextarea("");
    onClick(valueTextarea);
  };

  const handleOnChangeValue = (value) => setValueTextarea(value);

  return (
    <div ref={textareaGroup} className={"textarea-group"}>
      <Textarea
        value={valueTextarea}
        placeholder={placeholder}
        onKeyPress={handleOnKeyPress}
        onChangeValue={handleOnChangeValue}
        autoFocus={false}
      />
      <div className={"textarea-group__container-button"}>
        <button className={"btn btn-success"} onClick={handleOnClick}>
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
};

TextareaGroup.defaultProps = {
  value: "",
  titleButton: "Принять",
  placeholder: "",
  onClick: () => {},
};

export default TextareaGroup;
