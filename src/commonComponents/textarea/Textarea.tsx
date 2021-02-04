import React, {
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import "./textarea.css";

type Props = {
  value: string;
  placeholder?: string;
  autoFocus?: boolean;
  isEdit?: boolean;
  onChangeValue?: (value: string) => void;
  onChangeIsEdit?: (value: boolean) => void;
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
  const textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textarea.current && height !== textarea.current.scrollHeight) {
      setHeight(textarea.current.scrollHeight);
    }
    if (textarea.current && isEdit && autoFocus) {
      textarea.current.focus();
    }
  });

  const handleOnBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    onChangeValue?.(valueTextarea);
    onChangeIsEdit?.(false);
  };

  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setValueTextarea?.(e.target.value);

  const handleOnClick = (e: MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    onChangeIsEdit?.(true);
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      onChangeValue?.(valueTextarea);
      onChangeIsEdit?.(false);
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

const defaultProps = {
  isEdit: true,
  autoFocus: true,
  placeholder: "",
};

Textarea.defaultProps = defaultProps;

export default Textarea;
