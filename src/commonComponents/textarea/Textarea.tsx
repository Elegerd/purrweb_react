import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./textarea.css";

const Textarea = ({
  value,
  placeholder,
  autoFocus,
  isEdit,
  onChangeValue,
  onChangeIsEdit,
}) => {
  const [height, setHeight] = useState(0);
  const [valueTextarea, setValueTextarea] = useState(value);
  const textarea = useRef(null);

  useEffect(() => {
    if (textarea.current && height !== textarea.current.scrollHeight) {
      setHeight(textarea.current.scrollHeight);
    }
    if (textarea.current && isEdit && autoFocus) {
      textarea.current.focus();
    }
  });

  const handleOnBlur = (e) => {
    e.preventDefault();
    onChangeValue(valueTextarea);
    onChangeIsEdit(false);
  };

  const handleOnChange = (e) => setValueTextarea(e.target.value);

  const handleOnClick = (e) => {
    e.preventDefault();
    onChangeIsEdit(true);
  };

  const handleOnKeyPress = (e) => {
    if (!e.shiftKey && e.which === 13) {
      e.preventDefault();
      onChangeValue(valueTextarea);
      onChangeIsEdit(false);
    }
  };

  return (
    <label className={"textarea-container"} onClick={handleOnClick}>
      <textarea
        ref={textarea}
        disabled={!isEdit}
        spellCheck={false}
        onKeyPress={handleOnKeyPress}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        style={{ height: `${height}px` }}
        value={valueTextarea}
        placeholder={placeholder}
      />
    </label>
  );
};

Textarea.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  isEdit: PropTypes.bool,
  onChangeValue: PropTypes.func,
  onChangeIsEdit: PropTypes.func,
};

Textarea.defaultProps = {
  isEdit: true,
  autoFocus: true,
  placeholder: "",
  onChangeValue: () => {},
  onChangeIsEdit: () => {},
};

export default Textarea;
