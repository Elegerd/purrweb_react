import React, { useEffect } from "react";
import "./popup.css";

type Props = {
  onClose?: () => void;
};

const Popup: React.FunctionComponent<Props> = ({ children, onClose }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleEscPress, false);
    return () => {
      document.removeEventListener("keydown", handleEscPress, false);
    };
  }, []);

  const handleEscPress: EventListener | EventListenerObject = (evt): void => {
    const event = evt as KeyboardEvent;
    if (event.key === "Escape") {
      onClose?.();
    }
  };

  return (
    <div className={"popup__overlay"}>
      <div className={`popup`}>
        <div className={"popup__content"}>{children}</div>
      </div>
    </div>
  );
};

Popup.defaultProps = {
  onClose: () => {},
};

export default Popup;
