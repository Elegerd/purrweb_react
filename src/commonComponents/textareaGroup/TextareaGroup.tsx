import React, { useEffect, useRef, useState } from "react";
import Textarea from "commonComponents/textarea/Textarea";
import "./textareagroup.css";

type Props = {
  value?: string;
  titleButton: string;
  placeholder: string;
  onClick: (value: string) => void;
};

const TextareaGroup: React.FunctionComponent<Props> = ({
  value,
  titleButton,
  placeholder,
  onClick,
}) => {
  const textareaGroup = useRef<HTMLDivElement>(null);
  const [valueTextarea, setValueTextarea] = useState(value || "");

  useEffect(() => {
    document.addEventListener("click", handleOnClickContains, false);
    return () => {
      document.removeEventListener("click", handleOnClickContains, false);
    };
  });

  const handleOnClickContains = (e: any) => {
    const target = e.target as HTMLElement;
    if (textareaGroup.current && !textareaGroup.current?.contains(target)) {
      setValueTextarea("");
      onClick(valueTextarea);
    }
  };

  const handleOnClick = () => {
    setValueTextarea("");
    onClick(valueTextarea);
  };

  const handleOnChangeValue = (value: string) => setValueTextarea(value);

  return (
    <div ref={textareaGroup} className={"textarea-group"}>
      <Textarea
        value={valueTextarea}
        placeholder={placeholder}
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

TextareaGroup.defaultProps = {
  value: "",
  titleButton: "Принять",
  placeholder: "",
  onClick: () => {},
};

export default TextareaGroup;
