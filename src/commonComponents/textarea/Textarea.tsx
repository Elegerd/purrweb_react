import React, { useEffect, useRef, useState, FocusEvent } from "react";
import "./textarea.css";

type Props = {
  value: string;
  placeholder: string;
  autoFocus: boolean;
  isEdit: boolean;
  onChangeValue: (value: string) => void;
  onChangeIsEdit: (value: boolean) => void;
};

const Textarea: React.FunctionComponent<Props> = ({
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

  const handleOnBlur = (e: FocusEvent) => {
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

Textarea.defaultProps = {
  isEdit: true,
  autoFocus: true,
  placeholder: "",
  onChangeValue: () => {},
  onChangeIsEdit: () => {},
};

export default Textarea;
